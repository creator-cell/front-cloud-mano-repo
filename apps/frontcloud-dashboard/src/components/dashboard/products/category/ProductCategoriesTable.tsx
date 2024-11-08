"use client"


import React from 'react'



import { ArrowUpDown, Ban, ChevronDown, CirclePlus, MoreHorizontal, PencilLine, Trash2 } from "lucide-react"

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

import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import CommonDataTable from '@/components/common/CommonDataTable'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import { ProductCategoryType } from '@/store/api/products/types/category-types'



const columns: ColumnDef<ProductCategoryType>[] = [
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
        accessorKey: "CategoryName",
        header: "Category Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("CategoryName")}</div>
        ),
    },
    {
        accessorKey: "Description",
        header: "Description",
        cell: ({ row }) => (
            <div
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: row.getValue("Description") }}
            />
        ),
    },
    {
        accessorKey: "VisibleInMenu",
        header: "Visible In Menu",
        cell: ({ row }) => (
            <div className="capitalize items-center flex justify-center">
                {row.getValue("VisibleInMenu") === 1 ? (
                    <CheckCheck size={20} color='green' />
                ) : (
                    <Ban size={20} color='red' />
                )}
            </div>
        ),
    },
    {
        accessorKey: "CreatedAt",
        header: "Created At",
        cell: ({ row }) => (
            <div>{new Date(row.getValue("CreatedAt")).toLocaleDateString()}</div>
        ),
    },
    {
        accessorKey: "UpdatedAt",
        header: "Updated At",
        cell: ({ row }) => (
            <div>{new Date(row.getValue("UpdatedAt")).toLocaleDateString()}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => (
            <Link href={"/dashboard/products/product-categories/add-categories"}>
                <PencilLine color='green' />
            </Link>
        ),
    },
];




const ProductCategoriesTable = ({ datas }: { datas: ProductCategoryType[] }) => {
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
        data: datas,
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
                data={datas}
                columns={columns}
                table={table}
                topClassName='gap-x-4'
                tableSearchKeys={['categoryName']}
                searchPlaceholder='Search for Categories'
            >

                <Button
                    onClick={() => router.push("/dashboard/products/product-categories/add-categories")}
                    className='bg-primary text-white'
                >
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add Category
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


export default ProductCategoriesTable