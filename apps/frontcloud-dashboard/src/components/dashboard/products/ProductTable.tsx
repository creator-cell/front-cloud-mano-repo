"use client";


import React, { useEffect, useState } from 'react'
import { CustomHeading } from '@/components/custom/CustomHeading'
import { tabs } from '@/enum/dashboard/products/add';

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
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image, { StaticImageData } from "next/image"

import image from "@/assets/aboutUs/location_images/image2.webp"

import { Eye, Plus } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Star } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation"

import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { Product as ProductType } from '@/store/api/products/types/products-types';
import { useDeleteProductMutation } from '@/store/api/products';
import { toast } from 'sonner';


interface ProductTableProps {
    data: ProductType[]
}


const ProductTable = ({ data }: ProductTableProps) => {
    console.log("🚀 ~ Product ~ data:", data)

    const [starClicked, setStarClicked] = React.useState(false)
    const toggleStarClicked = () => setStarClicked(!starClicked)

    const [eyeClicked, setEyeClicked] = React.useState(false)
    const toggleEyeClicked = () => setEyeClicked(!eyeClicked)

    const initialColumns: ColumnDef<ProductType>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <div className="capitalize">
                    {/* {row.getValue("image")} */}
                    <Image
                        src={row.getValue("image") ?? image}
                        alt="Product Image"
                        width={50}
                        height={50}
                    />
                </div>
            ),
        },
        {
            accessorKey: "SKU",
            header: "Product SKU",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("SKU")}</div>
            ),
        },

        {
            accessorKey: "StockQuantity",
            header: "Stock Level",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("StockQuantity")}</div>
            ),
        },
        {
            accessorKey: "ProductName",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("ProductName")}</div>
            ),
        },
        {
            accessorKey: "StorePrice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("StorePrice")}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {


                return (
                    <div className="flex items-center justify-start gap-x-3">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            {
                                eyeClicked ? <Eye size={20} onClick={toggleEyeClicked} /> : <EyeOff color="red" size={20} onClick={toggleEyeClicked} />
                            }
                        </Button>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            {
                                starClicked ? <Star size={20} onClick={toggleStarClicked} /> : <Star className=" text-blue-500" size={20} fill="green" onClick={toggleStarClicked} />
                            }
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                // onClick={() => navigator.clipboard.writeText(payment.id)}
                                >
                                    View
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Orders</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                )
            },
        },
    ]

    const [activeTab, setActiveTab] = useState("all_products");
    console.log("🚀 ~ Product ~ activeTab:", activeTab)

    // Handle tab change - only update table data
    const handleTabChange = React.useCallback((value: string) => {
        setActiveTab(value);
    }, []);

    const columns = React.useMemo(() => initialColumns, []);

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
    const router = useRouter()


    const [selectedIds, setSelectedIds] = useState<number[]>([]); // Step 1: Define selectedIds as number[]

    // Step 2: Filter out undefined values in useEffect
    useEffect(() => {
        const ids = table
            .getSelectedRowModel()
            .rows.map(row => row.original.ProductID)
            .filter((id): id is number => id !== undefined); // Ensure only numbers are stored
        console.log("🚀 ~ useEffect ~ ids:", ids);
        setSelectedIds(ids);
    }, [rowSelection, table]);


    const [DeleteProduct] = useDeleteProductMutation()

    const handleDelete = async () => {

        const promise = DeleteProduct(selectedIds).unwrap()

        toast.promise(promise, {
            loading: "Deleting...",
            success: "Category Deleted Successfully",
            error: "Error Deleting Category"
        })

        try {

            await promise;
            // toast.success("Category Deleted Successfully")
            router.refresh()
        } catch (err) {
            console.error(err)
            // toast.error("Error Deleting Category")
        }
    }


    return (

        <div className='w-full bg-white rounded-sm px-4 py-6'>
            <div className="flex flex-wrap items-center pb-8">
                <div className="flex items-center gap-x-3 w-full">
                    <Button onClick={() => router.push("/dashboard/products/add-products")} variant="default" className="w-fit px-4 py-1">
                        Add New Product
                        {/* <Plus className="h-4 w-4  ml-2" /> */}
                    </Button>

                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected products will be removed permanently. If the products appear in any Product Pick List options they will also be removed from those options. Are you sure?'
                        confirmLabel='Delete'
                        cancelLabel='Cancle'
                        onConfirm={handleDelete}
                        isDisabled={table.getSelectedRowModel().rows.length < 1}
                        triggerLabel={<Trash2 className="h-4 w-8 " />}
                        diasbledMessage='Select At least one product'

                    />


                    <Input
                        placeholder="Search for products..."
                        value={(table.getColumn("product_name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("product_name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm focus:ring-1 focus:ring-primary focus:border-transparent"
                    />

                    <Button onClick={() => router.push("/dashboard/products/advance-search-products")} variant="outline" className="">
                        {/* <Search className="h-4 w-4  " /> */}
                        Advance Search
                    </Button>

                    <Select onValueChange={handleTabChange} defaultValue='all_products'  >
                        <SelectTrigger className='w-40 self-end' >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                {tabs?.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* <div className="rounded-md border"> */}
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default ProductTable


