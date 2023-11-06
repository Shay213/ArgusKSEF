import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { pl } from 'date-fns/locale'
import DataTableColumnHeader from './DataTableColumnHeader'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import { useNavigate } from 'react-router-dom'

export const columnsXml: ColumnDef<ExtendedIFiles>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value): void => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value): void => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'filename',
    header: ({ column }): JSX.Element => (
      <DataTableColumnHeader column={column} title="Nazwa" toggleSorting />
    )
  },
  {
    accessorKey: 'creationDate',
    header: ({ column }): JSX.Element => (
      <DataTableColumnHeader column={column} title="Data Stworzenia" />
    ),
    cell: ({ getValue }) =>
      getValue() === null ? '' : format(getValue() as Date, 'dd MMMM yyyy', { locale: pl }),
    sortingFn: 'datetime'
  },
  {
    id: 'actions',
    cell: ({ row }): JSX.Element => {
      const file = row.original
      const context = useXLSXBindingsContext()
      const navigate = useNavigate()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(): Promise<void> => navigator.clipboard.writeText(file.filename)}
            >
              Kopiuj nazwe pliku
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(): void => {
                context?.xlsxFolderPath &&
                  window.api.showInFileExplorer(
                    `${context?.xmlFolderPath}/${file.filename}`.replace(/\//g, '\\')
                  )
              }}
            >
              Pokaż w folderze
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(): void => {
                // find xlsx file name assosiacted with xml file
                const xlsxFileName = Object.keys(context?.xlsxBindings || {}).find(
                  (key) =>
                    context?.xlsxBindings[key] === `${context?.xmlFolderPath}/${file.filename}`
                )
                context?.xlsxFolderPath &&
                  window.api.showInFileExplorer(
                    `${context?.xlsxFolderPath}/${xlsxFileName}`.replace(/\//g, '\\')
                  )
              }}
            >
              Pokaż plik XLSX w folderze
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(): void => {
                navigate(`/edit/${file.filename}`)
              }}
            >
              Edytuj
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
