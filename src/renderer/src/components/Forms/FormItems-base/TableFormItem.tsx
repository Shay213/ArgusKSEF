import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { FormField } from '@renderer/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import FormTooltip from '../Template/FormTooltip'
import BasicFormItem from './BasicFormItem'
import CalendarFormItem from './CalendarFormItem'
import { formatDateToYYYYMMDD } from '@renderer/lib/utils'
import SelectFormItem from './SelectFormItem'
import PopoverSearchFormItem from './PopoverSearchFormItem'
import TextareaFormItem from './TextareaFormItem'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

interface CellInfo {
  label: string
  tooltip?: string
  asLp?: boolean
  placeholder?: string
  inputType?: string
  cellWidth?: number
  type?: 'basic' | 'calendar' | 'textarea' | 'select' | 'select-search'
  formatValueOnSelect?: (value: string | number | Date) => string | number | Date
  items?: string[]
}

interface Props {
  initialState?: Record<string, unknown>
  fieldName: string
  cellInfo: Record<string, CellInfo>
  initialVisibleCols?: string[]
  addButtonLabel: string
}

const TableFormItem = ({
  initialState,
  fieldName,
  cellInfo,
  addButtonLabel,
  initialVisibleCols
}: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: fieldName
  })

  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [visibleCols, setVisibleCols] = useState<CellInfo[]>(
    initialVisibleCols
      ? Object.values(cellInfo).filter((val) => initialVisibleCols.includes(val.label))
      : Object.values(cellInfo)
  )

  const handleRowSelection = (index: number): void => {
    selectedRows.includes(index)
      ? setSelectedRows((prev) => prev.filter((i) => i !== index))
      : setSelectedRows((prev) => [...prev, index])
  }

  const handleRemove = (): void => {
    remove(selectedRows)
    setSelectedRows([])
  }

  const asLpField = Object.values(cellInfo).find((val) => val.asLp)

  const allIndexes = Array.from({ length: fields.length }, (_, index) => index)

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Dodatkowe kolumny
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="h-[300px] overflow-auto">
          {Object.values(cellInfo)
            .filter((column) => !column.asLp)
            .sort((a) => (visibleCols.find((col) => col.label === a.label) ? -1 : 1))
            .map((column, i) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.label + i}
                  className="capitalize"
                  checked={!!visibleCols.find((col) => col.label === column.label)}
                  onCheckedChange={(value): void => {
                    if (value) {
                      setVisibleCols((prev) => [...prev, column])
                    } else {
                      setVisibleCols((prev) => prev.filter((col) => col.label !== column.label))
                    }
                  }}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                {allIndexes.length > 0 && (
                  <Checkbox
                    checked={allIndexes.length === selectedRows.length}
                    onCheckedChange={(checked): void => {
                      checked ? setSelectedRows(allIndexes) : setSelectedRows([])
                    }}
                  />
                )}
              </TableHead>
              <TableHead className="w-[20px]">L.p.</TableHead>
              {visibleCols.map(({ label, tooltip, cellWidth }, i) => (
                <TableHead key={i}>
                  <div style={{ width: cellWidth ?? 100 }}>
                    <div className="relative w-max">
                      {label}
                      {tooltip && <FormTooltip message={tooltip} />}
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onCheckedChange={(): void => handleRowSelection(index)}
                  />
                </TableCell>
                {asLpField ? (
                  <TableCell>
                    <input
                      {...form.register(`${fieldName}.${index}.${asLpField.label}`)}
                      readOnly
                      className="border-none w-[20px] bg-inherit ml-2 -mt-1 text-base outline-none"
                      value={index + 1}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{index + 1}.</TableCell>
                )}
                {visibleCols.map(
                  ({ label, placeholder, inputType, type, formatValueOnSelect, items }, i) => {
                    return (
                      <TableCell key={index + i}>
                        <FormField
                          control={form.control}
                          name={`${fieldName}.${index}${initialState ? '.' + label : ''}`}
                          render={({ field }): JSX.Element => {
                            switch (type) {
                              case 'basic':
                                return (
                                  <BasicFormItem
                                    field={field}
                                    placeholder={placeholder}
                                    type={inputType ?? 'text'}
                                  />
                                )
                              case 'calendar':
                                return (
                                  <CalendarFormItem
                                    field={field}
                                    handleSelect={(date): void =>
                                      form.setValue(
                                        `${fieldName}.${index}${initialState ? '.' + label : ''}`,
                                        formatValueOnSelect
                                          ? formatValueOnSelect(date)
                                          : formatDateToYYYYMMDD(date)
                                      )
                                    }
                                  />
                                )
                              case 'select':
                                return (
                                  <SelectFormItem
                                    field={field}
                                    items={items ?? []}
                                    placeholder={placeholder}
                                  />
                                )
                              case 'select-search':
                                return (
                                  <PopoverSearchFormItem
                                    field={field}
                                    items={items ?? []}
                                    placeholder={placeholder}
                                    handleSelect={(value): void =>
                                      form.setValue(
                                        `${fieldName}.${index}${initialState ? '.' + label : ''}`,
                                        formatValueOnSelect ? formatValueOnSelect(value) : value
                                      )
                                    }
                                  />
                                )
                              case 'textarea':
                                return <TextareaFormItem field={field} placeholder={placeholder} />
                              default:
                                return (
                                  <BasicFormItem
                                    field={field}
                                    placeholder={placeholder}
                                    type={inputType ?? 'text'}
                                  />
                                )
                            }
                          }}
                        />
                      </TableCell>
                    )
                  }
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" onClick={(): void => append(initialState ? initialState : '')}>
          {addButtonLabel} <Plus className="w-4 h-4 ml-2" />
        </Button>
        <Button
          type="button"
          disabled={selectedRows.length === 0}
          variant="destructive"
          onClick={handleRemove}
        >
          Usuń Zaznaczone <Trash2 className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default TableFormItem
