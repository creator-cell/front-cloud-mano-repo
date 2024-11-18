"use client"

import React, { useEffect, useState } from 'react'
import { ArrowUpDown, Ban, CheckCheck, PencilLine, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { SubCategoryType } from '@/store/api/products/types/sub-category-types'
import { useDeleteSubCategoryMutation } from '@/store/api/products/sub-category'
import { toast } from 'sonner'

const columns: ColumnDef<SubCategoryType>[] = [
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
        accessorKey: "SubCategoryName",
        header: "Subcategory Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("SubCategoryName")}</div>
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
            <div className="flex justify-center">
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
            <Link href={`/dashboard/products/product-subCategories/add-subCategories?id=${row.original.SubCategoryID}`}>
                <PencilLine color='green' />
            </Link>
        ),
    },
]

const ProductSubCategoryTable = ({ data }: { data: SubCategoryType[] }) => {
    console.log("🚀 ~ ProductSubCategoryTable ~ data:", data)
    const router = useRouter()


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
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

    const [DeleteSubCategory] = useDeleteSubCategoryMutation()


    const [selectedIds, setSelectedIds] = useState<number[]>([]); // Step 1: Define selectedIds as number[]

    // Step 2: Filter out undefined values in useEffect
    useEffect(() => {
        const ids = table
            .getSelectedRowModel()
            .rows.map(row => row.original.CategoryID)
            .filter((id): id is number => id !== undefined); // Ensure only numbers are stored
        console.log("🚀 ~ useEffect ~ ids:", ids);
        setSelectedIds(ids);
    }, [rowSelection, table]);


    const handleDelete = async () => {
        try {
            await DeleteSubCategory(selectedIds).unwrap()
            toast.success("Category Deleted Successfully")
            router.refresh()
        } catch (err) {
            console.error(err)
            toast.error("Error Deleting Category")
        }
    }

    return (
        <div className='bg-white px-4 py-8 rounded-sm '>
            <CommonDataTable
                data={data}
                columns={columns}
                table={table}
                topClassName='gap-x-4'
                tableSearchKeys={['SubCategoryName']}
                searchPlaceholder='Search for Subcategories'
            >
                <Button
                    onClick={() => router.push("/dashboard/products/product-subCategories/add-subCategories")}
                    className='bg-primary text-white'
                >
                    Add SubCategory
                </Button>

                <ConfirmationDialog
                    title='Confirmation'
                    description='WARNING: The selected subcategories will be removed permanently. Are you sure?'
                    confirmLabel='Delete'
                    cancelLabel='Cancel'
                    onConfirm={handleDelete}
                    isDisabled={table.getSelectedRowModel().rows.length < 1}
                    triggerLabel={<Trash2 className="h-4 w-4" />}
                    diasbledMessage='Select at least one subcategory'
                />
            </CommonDataTable>
        </div>
    )
}

export default ProductSubCategoryTable
