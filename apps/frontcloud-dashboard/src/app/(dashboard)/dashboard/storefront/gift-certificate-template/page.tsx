"use client"
import React from 'react'
import PageWrapper from '../../_components/PageWrapper'
import CommonDataTable from '@/components/common/CommonDataTable'
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, CircleCheckBig, CirclePlus, Ellipsis, PencilLine, PenLineIcon, Settings, SquareChartGantt } from 'lucide-react'
import Link from 'next/link'



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export type Template = {
    id: string
    template: string
    file_size: string
    last_updated: string
    enabled: boolean
}

const data: Template[] = [
    {
        id: "1",
        template: "Birthday",
        file_size: "3.15 KB",
        last_updated: "May 2nd 2024 @ 3:23 PM",
        enabled: true,
    },
    {
        id: "2",
        template: "Holiday",
        file_size: "5.27 KB",
        last_updated: "March 15th 2024 @ 11:47 AM",
        enabled: false,
    },
    {
        id: "3",
        template: "Newsletter",
        file_size: "2.98 KB",
        last_updated: "June 10th 2024 @ 1:02 PM",
        enabled: true,
    },
]

const columns: ColumnDef<Template>[] = [
    {
        accessorKey: "template",
        header: "Template",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("template")}</div>
        ),
    },
    {
        accessorKey: "file_size",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    File Size
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="lowercase items-center flex justify-center">
                {row.getValue("file_size")}
            </div>
        ),
    },
    {
        accessorKey: "last_updated",
        header: "Last Updated",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("last_updated")}</div>
        ),
    },
    {
        accessorKey: "enabled",
        header: "Enabled",
        cell: ({ row }) => (
            <div className="capitalize">{
                row.getValue("enabled") === true ? <CircleCheckBig size={20} color="green" /> : <CirclePlus className='rotate-45' size={20} color="red" />
            }</div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (

                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Ellipsis size={20} color="green" className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='cursor-pointer'>
                                <SquareChartGantt className="mr-2 h-4 w-4" />
                                <span>Preview</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>
                                <PenLineIcon className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Restore</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


const GiftCertificateTemplatePage = () => {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <PageWrapper >
            <div className='bg-white p-4 pb-7 rounded-sm'>

                <CommonDataTable
                    data={data}
                    columns={columns}
                    table={table}
                    topClassName='gap-x-4'
                    tableSearchKeys={['categoryName']}
                    searchPlaceholder='Search for Categories'
                />
            </div>
        </PageWrapper>
    )
}

export default GiftCertificateTemplatePage


