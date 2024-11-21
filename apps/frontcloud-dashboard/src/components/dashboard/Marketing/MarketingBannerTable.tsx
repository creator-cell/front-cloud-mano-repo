"use client";

import React, { useState } from 'react';
import {
    ColumnDef,
    SortingState,
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCheck, CirclePlus, CircleX, Ellipsis, PenLineIcon, Trash2 } from "lucide-react";
import SectionLayout from '@/components/common/CommonSectionLayout';
import Link from 'next/link';
import PageWrapper from '@/app/(dashboard)/dashboard/_components/PageWrapper';
import { MarketingBanner } from '@/store/api/marketing/types/banner-types';
import Image from 'next/image';
import { useDeleteMarketingBannerMutation } from '@/store/api/marketing';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MarketinBannerTableProps {
    data: MarketingBanner[];
}

const MarketingBannerTable: React.FC<MarketinBannerTableProps> = ({ data }) => {

    const router = useRouter();

    const [selectedBanners, setSelectedBanners] = useState<number[]>([]);

    const [DeleteBanners, { isLoading }] = useDeleteMarketingBannerMutation();


    const handleSelectRow = (bannerId: number, selected: boolean) => {
        console.log("🚀 ~ handleSelectRow ~ selected:", selected)
        setSelectedBanners((prev) =>
            selected ? [...prev, bannerId] : prev.filter((id) => id !== bannerId)
        );
    };

    const initialColumns: ColumnDef<MarketingBanner>[] = [
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
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        handleSelectRow(row.original.MarketingBannerID, value as boolean);
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "MarketingBannerName",
            header: "Banner Name",
        },
        {
            accessorKey: "Location",
            header: "Location",
        },
        {
            accessorKey: "CreatedAt",
            header: "Date Created",
        },
        {
            accessorKey: "Visible",
            header: "Visible",
            cell: ({ row }) => (
                row.original.Visible === 1 ? <CheckCheck size={20} color="green" /> : <CircleX size={20} color="red" />
            ),
        },
        {
            accessorKey: "StoreName",
            header: "Store Name",
        },
        {
            accessorKey: "CategoryName",
            header: "Category",
        },
        {
            accessorKey: "OwnerName",
            header: "Owner",
        },
        {
            accessorKey: "ImageURL",
            header: "Image",
            cell: ({ row }) => (
                <Image src={row.original.ImageURL} width={30} height={30} alt="Banner Image" className="w-20 h-20 object-cover" />
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Ellipsis size={20} color="green" className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <PenLineIcon className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const columns = React.useMemo(() => initialColumns, []);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });


    const handleDelete = async () => {
        const ids = selectedBanners.join(",");
        const promise = DeleteBanners(ids).unwrap()

        toast.promise(promise, {
            loading: "Deleting Banners...",
            success: () => {
                setDeleteModal(false)
                return "Banners Deleted Successfully"
            },
            error: "Error Deleting Category"
        })
        try {
            await promise;
            router.refresh()
        } catch (err) {
            console.error(err)
            // toast.error("Error Deleting Category")
        }
    }

    return (
        <SectionLayout className="px-4 rounded-md">
            <div className="flex items-center gap-x-5">
                <Button asChild>
                    <Link href="/dashboard/marketing/banners/create">
                        <CirclePlus size={20} color="white" className="mr-2" />
                        <span>Create Banner</span>
                    </Link>
                </Button>
                <ConfirmationDialog
                    title='Confirmation'
                    description='WARNING: The selected Banners will be removed permanently. If the Banner appear in any Banner List options they will also be removed from those options. Are you sure?'
                    confirmLabel='Delete'
                    cancelLabel='Cancle'
                    onConfirm={handleDelete}
                    isDisabled={table.getSelectedRowModel().rows.length < 1 || isLoading}
                    triggerLabel={<Trash2 className="h-4 w-4  " />}
                    diasbledMessage='Select At least one Category'
                    open={deleteModal}
                    onClose={setDeleteModal}
                />

            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No banners available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </SectionLayout>
    );
};

export default MarketingBannerTable;
