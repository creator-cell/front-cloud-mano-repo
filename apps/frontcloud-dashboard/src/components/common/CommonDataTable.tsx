
"use client"
import React from 'react'

import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import {
    ColumnDef,
    Table as TableType,
    flexRender,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronDown } from "lucide-react"
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'



interface TableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    selectOptionField?: boolean
    children?: React.ReactNode
    topClassName?: string
    tableSearchKeys: string[]
    table: TableType<T>
    searchPlaceholder?: string
    showHideColumns?: boolean

}



const CommonDataTable = <T extends object>({
    data,
    columns,
    children,
    topClassName,
    tableSearchKeys,
    table,
    searchPlaceholder,
    showHideColumns = true
}: TableProps<T>) => {

    const [tableData, setTableData] = React.useState<T[]>(data)

    const moveRow = (dragIndex: number, hoverIndex: number) => {
        const updatedData = [...tableData]
        const [draggedRow] = updatedData.splice(dragIndex, 1)
        updatedData.splice(hoverIndex, 0, draggedRow)
        setTableData(updatedData)
    }



    const Row = React.memo(({ row, index }: { row: any, index: number }) => {
        const ref = React.useRef<HTMLTableRowElement>(null)

        const [, drop] = useDrop({
            accept: "row",
            hover: (draggedItem: { index: number }) => {
                if (!ref.current || draggedItem.index === index) return
                moveRow(draggedItem.index, index)
                draggedItem.index = index
            },
        })

        const [{ isDragging }, drag] = useDrag({
            type: "row",
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })

        drag(drop(ref))

        return (
            <TableRow
                ref={ref}
                style={{ opacity: isDragging ? 0.5 : 1 }}
                data-state={row.getIsSelected() && "selected"}
                className='cursor-move'
            >
                {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </TableRow>
        )
    })


    // Add a display name for debugging purposes
    Row.displayName = 'RowComponent'
    const [globalFilter, setGlobalFilter] = React.useState<string>('')
    // Update global filter in the table's state using the passed table instance
    const handleGlobalFilterChange = (value: string) => {
        setGlobalFilter(value)
        table.setGlobalFilter(value) // Directly update the table's global filter
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full">
                <div className={cn("flex items-center py-4", topClassName)}>
                    {children}
                    <Input
                        placeholder={searchPlaceholder ?? "Search..."}
                        value={table.getColumn(tableSearchKeys[0])?.getFilterValue() as string ?? ""} // Display search value for the first key
                        onChange={(event) => {
                            const value = event.target.value;
                            tableSearchKeys.forEach((key) => {
                                table.getColumn(key)?.setFilterValue(value); // Apply the same search value to all columns
                            });
                        }}
                        className="max-w-sm focus:ring-1 focus:ring-primary focus:border-transparent"
                    />
                    {/* <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => handleGlobalFilterChange}
                        className="p-2 font-lg shadow border border-block"
                        placeholder={searchPlaceholder ?? "Search all columns..."}
                    /> */}


                    {
                        showHideColumns &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }

                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <Row key={row.id} row={row} index={index} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DndProvider>
    )
}


export default CommonDataTable;




// A typical debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}