"use client"


import React from 'react'



import { ArrowUpDown, Ban, ChevronDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCheck } from 'lucide-react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import CommonDataTable from '@/components/common/CommonDataTable'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'



export type Category = {
    id: string
    categoryName: string
    parentCategory: string
    products: number
    productsInSubCats: number
    visibleInMenu: boolean
    action: string
}

const data: Category[] = [
    {
        id: "1",
        categoryName: "Mobile",
        parentCategory: "Electronics",
        products: 120,
        productsInSubCats: 80,
        visibleInMenu: true,
        action: "Edit",
    },
    {
        id: "2",
        categoryName: "Tshirts",
        parentCategory: "Clothing",
        products: 200,
        productsInSubCats: 150,
        visibleInMenu: false,
        action: "Edit",
    },
]


const columns: ColumnDef<Category>[] = [
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
        accessorKey: "categoryName",
        header: "category Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("categoryName")}</div>
        ),
    },
    {
        accessorKey: "parentCategory",
        header: "Parent Category",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("parentCategory")}</div>
        ),
    },

    {
        accessorKey: "products",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase items-center flex justify-center">{row.getValue("products")}</div>,
    },
    {
        accessorKey: "productsInSubCats",
        header: () => <div className="text-right">Products In Sub Cats</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("productsInSubCats"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium items-center flex justify-center">{amount}</div>
        },
    },
    {
        accessorKey: "visibleInMenu",
        header: "visible In Menu",
        cell: ({ row }) => (
            <div className="capitalize items-center flex justify-center">{
                row.getValue("visibleInMenu") === true ? <CheckCheck size={20} color='green' /> : <Ban size={20} color='red' />
            }</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <Link href={"/dashboard/products/product-subCategories/add-subCategories"}>
                    <PencilLine color='green' />
                </Link>
            )
        },
    },
]


const ProductSubCategoryTable = () => {
    const router = useRouter()

    const handleDelete = () => {
        console.log('Delete')
    }

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
        <div className='bg-white px-4 py-8 rounded-sm '>
            <CommonDataTable
                data={data}
                columns={columns}
                table={table}
                topClassName='gap-x-4'
                tableSearchKeys={['categoryName']}
                searchPlaceholder='Search for Categories'
            >

                <Button
                    onClick={() => router.push("/dashboard/products/product-subCategories/add-subCategories")}
                    className='bg-primary text-white'
                >
                    Add SubCategory
                </Button>

                <ConfirmationDialog
                    title='Confirmation'
                    description='WARNING: The selected products will be removed permanently. If the products appear in any Product Pick List options they will also be removed from those options. Are you sure?'
                    confirmLabel='Delete'
                    cancelLabel='Cancle'
                    onConfirm={handleDelete}
                    isDisabled={table.getSelectedRowModel().rows.length < 1}
                    triggerLabel={<Trash2 className="h-4 w-4  " />}
                    diasbledMessage='Select At least one Category'

                />

            </CommonDataTable>
        </div>
    )
}

export default ProductSubCategoryTable
