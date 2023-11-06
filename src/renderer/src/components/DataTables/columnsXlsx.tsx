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
import CreateXmlFromTable from '@renderer/components/CreateXmlFromTable'
import DataTableColumnHeader from './DataTableColumnHeader'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'

export const columnsXlsx: ColumnDef<ExtendedIFiles>[] = [
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
    accessorKey: 'status',
    header: ({ column }): JSX.Element => (
      <DataTableColumnHeader column={column} title="Status XML" />
    ),
    cell: ({ row }) => <CreateXmlFromTable xlsxFileName={row.getValue('filename')} />
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
                    `${context?.xlsxFolderPath}/${file.filename}`.replace(/\//g, '\\')
                  )
              }}
            >
              Pokaż w folderze
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(): void => {
                context?.xmlFolderPath &&
                  window.api.showInFileExplorer(
                    `${context?.xlsxBindings?.[file.filename]}`.replace(/\//g, '\\')
                  )
              }}
            >
              Pokaż plik XML w folderze
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
