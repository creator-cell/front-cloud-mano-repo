'use client';
import React, { useState } from 'react'


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
import { ArrowUpDown, PencilLine, Settings, Trash2 } from "lucide-react"



import { CustomHeading } from '@/components/custom/CustomHeading'
import { CustomParagraph } from '@/components/custom/CustomParagraph'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CommonDataTable from '@/components/common/CommonDataTable'
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import Link from 'next/link';
import { BrandData } from '@/store/api/products/types';
import { useDeleteBrandsMutation, useGetAllBrandsQuery } from '@/store/api/products/brand';
import { toast } from 'sonner';


const columns: ColumnDef<BrandData>[] = [
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
        accessorKey: "BrandName",
        header: "Brand Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("BrandName")}</div>
        ),
    },
    {
        accessorKey: "MetaTitle",
        header: "Meta Title",
        cell: ({ row }) => (
            <div>{row.getValue("MetaTitle") || "N/A"}</div>
        ),
    },
    {
        accessorKey: "ImageURL",
        header: "Image",
        cell: ({ row }) => (
            <div className="flex justify-center">
                <img
                    src={row.getValue("ImageURL")}
                    alt={row.getValue("BrandName")}
                    className="h-12 w-12 rounded"
                />
            </div>
        ),
    },
    {
        accessorKey: "CreatedAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("CreatedAt"));
            return <div>{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const brandId = row.original.BrandID;
            return (
                <div className="flex gap-2 items-center justify-center">
                    <Link href={`/dashboard/products/brands/create?id=${brandId}`}>
                        <PencilLine size={20} color="green" />
                    </Link>
                </div>
            );
        },
    },
];



const Brands = () => {





    const [deleteModalOen, setDeleteModalOen] = useState(false)

    const { data: AllBrands, refetch } = useGetAllBrandsQuery()
    console.log("🚀 ~ Brands ~ AllBrands:", AllBrands)

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: AllBrands?.Data || [],
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
    const [DeleteBrand, { isLoading }] = useDeleteBrandsMutation()

    const handleDelete = async () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.BrandID).join(',')

        const promise = DeleteBrand(ids).unwrap()

        toast.promise(promise, {
            loading: 'Deleting Brand',
            success: 'Brand Deleted Successfully',
            error: 'Error Deleting Brand'
        })
        try {
            await promise;
            setDeleteModalOen(false)
            refetch();
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='w-full flex flex-col gap-y-6  py-20 min-h-screen'>
            <div className='space-y-1'>
                <CustomHeading variant={"pageHeading"} className='font-[100] text-black text-left'>View Brands</CustomHeading>
                <CustomParagraph variant={"xmedium"} className='text-gray-500 text-left'>Brands can be associated with products, allowing your customers to shop by browsing their favorite brands.</CustomParagraph>
            </div>
            <div className='bg-white px-4 pb-8 rounded-sm '>
                <CommonDataTable
                    data={AllBrands?.Data || []}
                    columns={columns}
                    table={table}
                    topClassName='gap-x-4'
                    tableSearchKeys={['categoryName']}
                    searchPlaceholder='Search for Categories'
                >
                    <Button className='' onClick={() => router.push('/dashboard/products/brands/create')}>Add New Brand</Button>
                    <ConfirmationDialog
                        title='Confirmation'
                        description='WARNING: The selected Brands will be removed permanently. If the Brand appear in any Product Pick List options they will also be removed from those options. Are you sure?'
                        confirmLabel='Delete'
                        cancelLabel='Cancle'
                        onConfirm={handleDelete}
                        isDisabled={table.getSelectedRowModel().rows.length < 1 && isLoading}
                        triggerLabel={<Trash2 className="h-4 w-12  " />}
                        diasbledMessage='Select At least one Brand'
                        open={deleteModalOen}
                        onClose={setDeleteModalOen}

                    />

                </CommonDataTable>
            </div>

        </div>
    )
}

export default Brands


