"use client"
import React, { useState } from 'react'
import PageWrapper from '../../_components/PageWrapper'
import CommonDataTable from '@/components/common/CommonDataTable'
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, CircleCheckBig, CirclePlus, Ellipsis, EyeOff, PencilLine, PenLineIcon, Settings2, SquareChartGantt, Trash2 } from 'lucide-react'
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'

export type Blog = {
    id: string
    title: {
        title: string,
        link: string
    }
    author: string
    published_on: string
    link?: string
}


const data: Blog[] = [
    {
        id: "1",
        title: {
            title: "How to Learn React",
            link: "#"
        },
        author: "John Doe",
        published_on: "August 15th 2024 @ 10:00 AM",
        link: "#"
    },
]

const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const titleData = row.getValue("title") as Blog['title'];
            return (
                <Link href={titleData.link} className="capitalize text-blue-500 hover:underline">
                    {titleData.title}
                </Link>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Auther",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("author")}</div>
        ),
    },
    {
        accessorKey: "published_on",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Published On
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="lowercase items-center flex justify-start">
                {row.getValue("published_on")}
            </div>
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
                                <EyeOff className="mr-2 h-4 w-4" />
                                <span>UnPublished</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>
                                <SquareChartGantt className="mr-2 h-4 w-4" />
                                <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>
                                <PenLineIcon className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


const BlogPage = () => {
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

    const [activeTab, setActiveTab] = useState("all_products");
    console.log("🚀 ~ Product ~ activeTab:", activeTab)

    // Handle tab change - only update table data
    const handleTabChange = React.useCallback((value: string) => {
        setActiveTab(value);
    }, []);

    return (
        <PageWrapper title='Blog'>
            <div className='bg-white p-4 pb-7 rounded-sm space-y-7'>

                {/* <CommonDataTable
                    data={data}
                    columns={columns}
                    table={table}
                    topClassName='gap-x-4'
                    tableSearchKeys={['title']}
                    searchPlaceholder='Search for Categories'
                    showHideColumns={false}
                > */}
                <div className='flex items-center justify-between gap-x-3 w-full'>
                    <div className='flex items-center gap-x-3 w-full'>
                        <Button asChild>
                            <Link href="/dashboard/storefront/blog/add">
                                <CirclePlus className="mr-2 h-4 w-4" />
                                Add Blog
                            </Link>
                        </Button>


                        <Input
                            placeholder="Search for products..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm focus:ring-1 focus:ring-primary focus:border-transparent"
                        />
                    </div>




                    <Select onValueChange={handleTabChange} defaultValue='published' >
                        <SelectTrigger className='w-40 self-end' >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                {[{ label: "Published", value: "published" }, { label: "Draft", value: "draft" }]?.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* </CommonDataTable> */}
            </div>
        </PageWrapper>
    )
}

export default BlogPage



