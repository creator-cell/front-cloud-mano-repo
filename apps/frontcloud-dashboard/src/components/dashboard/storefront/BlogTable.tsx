"use client"
import React, { useContext, useState } from 'react'
import CommonDataTable from '@/components/common/CommonDataTable'
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, CircleCheckBig, CirclePlus, Ellipsis, EyeOff, PencilLine, PenLineIcon, Settings2, SquareChartGantt, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { RotateCw } from 'lucide-react';
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
import { BlogData } from '@/store/api/store/marketing/types/blog-types'
import { useRouter } from 'next/navigation'
import { useDeleteBlogMutation } from '@/store/api/store/marketing/blog'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { LanguageContext, SupportedLanguages } from '@/contexts/LanguageContext'



interface BlogPros {
    data: BlogData[]
}


const BlogTable = ({ data }: BlogPros) => {

    const router = useRouter()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const { state: { lang } } = useContext(LanguageContext)


    const columns: ColumnDef<BlogData>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div className={cn('flex items-center justify-start')}>
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (

                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        // handleSelectRow(row.original.StoreBlogID, value as boolean);
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "BlogTitle",
            header: () => (
                <div className={cn('flex items-center justify-start')}>
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            ),
            cell: ({ row }) => (
                <Link
                    href={`/dashboard/storefront/blog/${row.original.StoreBlogID}`}
                    className="capitalize text-blue-500 hover:underline"
                >
                    {row.getValue("BlogTitle")}
                </Link>
            ),
        },
        {
            accessorKey: "BlogAuthor",
            header: () => (
                <div className={cn('flex items-center justify-start')}>
                    Author
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            ),
            cell: ({ row }) => <div className="capitalize">{row.getValue("BlogAuthor")}</div>,
        },
        {
            accessorKey: "IsDraft",
            header: () => (
                <div className={cn('flex items-center justify-start')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            ),
            cell: ({ row }) => (
                <div className={`capitalize ${row.getValue("IsDraft") ? 'text-red-500' : 'text-green-500'}`}>
                    {row.getValue("IsDraft") ? "Draft" : "Published"}
                </div>
            ),
        },
        {
            accessorKey: "CreatedAt",
            header: ({ column }) => (

                <Button
                    variant="ghost"
                    className='flex items-center justify-start p-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="lowercase">{new Date(row.getValue("CreatedAt")).toLocaleDateString()}</div>
            ),
        },
        {
            accessorKey: "UpdatedAt",
            header: () => (
                <div className={cn('flex items-center justify-start')}>
                    Last Updated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            ),
            cell: ({ row }) => (
                <div className="lowercase">{new Date(row.getValue("UpdatedAt")).toLocaleDateString()}</div>
            ),
        },
        {
            id: "actions",
            header: () => (
                <div className={cn('flex items-center justify-start')}>
                    Actions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            ),
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Ellipsis size={20} color="green" className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => console.log("Unpublish:", row.original.StoreBlogID)}
                            >
                                <EyeOff className="mr-2 h-4 w-4" />
                                <span>Unpublish</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => console.log("View:", row.original.StoreBlogID)}
                            >
                                <SquareChartGantt className="mr-2 h-4 w-4" />
                                <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                            >
                                <Link href={`/dashboard/storefront/blog/add?id=${row.original.StoreBlogID}`}>
                                    <PenLineIcon className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

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


    const [DeleteBlog, { isLoading }] = useDeleteBlogMutation()

    const [deleteModal, setDeleteModal] = useState(false)
    const handleDelete = async () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.StoreBlogID).join(",");
        console.log("🚀 ~ handleDelete ~ ids:", ids)
        const promise = DeleteBlog(ids).unwrap()

        toast.promise(promise, {
            loading: "Deleting Blog...",
            success: () => {
                setDeleteModal(false)
                return "Blog Deleted Successfully"
            },
            error: "Error Deleting Category"
        })
        try {
            await promise;
            table.resetRowSelection();
            router.refresh()
        } catch (err) {
            console.error(err)
            // toast.error("Error Deleting Category")
        }
    }


    return (
        <div className='bg-white p-4 pb-7 rounded-sm space-y-7'>
            <div className='flex items-center justify-between gap-x-3 w-full'>
                <div className='flex items-center gap-x-3 w-full'>
                    <Button asChild>
                        <Link href="/dashboard/storefront/blog/add">
                            <CirclePlus className="m-2 h-4 w-4" />
                            Add Blog
                        </Link>
                    </Button>
                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected Banners will be removed permanently. If the Banner appear in any Banner List options they will also be removed from those options. Are you sure?'
                        confirmLabel='Delete'
                        cancelLabel='Cancle'
                        onConfirm={handleDelete}
                        isDisabled={table.getSelectedRowModel().rows.length < 1 || isLoading}
                        triggerLabel={<Trash2 className="h-4 w-8  " />}
                        diasbledMessage='Select At least one Category'
                        open={deleteModal}
                        onClose={setDeleteModal}
                    />
                    <Input
                        placeholder="Search for products..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm focus:ring-1 focus:ring-primary focus:border-transparent"
                    />
                    <div>
                        <RotateCw
                            size={20}
                            className="transition-transform duration-300 ease-in-out active:rotate-45 cursor-pointer"
                            onClick={() => router.refresh()}
                        />
                    </div>
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
                                key={row.original.StoreBlogID}
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
        </div>
    )
}

export default BlogTable








