"use client";

import React, { useState } from "react";
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
import { CheckCheck, CirclePlus, CircleX, Ellipsis, PenLineIcon, SquareChartGantt, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionLayout from "@/components/common/CommonSectionLayout";
import Link from "next/link";
import { Coupon } from "@/store/api/store/storefront/types";
import { toast } from "sonner";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { useDeleteCouponCodeMutation } from "@/store/api/store/marketing/coupon-code";

interface CouponTableProps {
    data: Coupon[];
    refetch: () => void;
}

const CouponTable: React.FC<CouponTableProps> = ({ data, refetch }) => {
    console.log("🚀 ~ CouponTable ~ data:", data);

    const [deleteModal, setDeleteModal] = useState(false)
    const router = useRouter()

    const initialColumns: ColumnDef<Coupon>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div className={('flex items-center justify-start')}>
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
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "CouponName",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Coupon Name
                </div>
            )
        },
        {
            accessorKey: "CouponCode",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Coupon Code
                </div>
            )
        },
        {
            accessorKey: "Discount",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Discount
                </div>
            )
        },
        {
            accessorKey: "ExpireDate",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Expire Date
                </div>
            ),
            cell: ({ row }) => new Date(row.original.ExpireDate).toLocaleDateString(),
        },
        {
            accessorKey: "Enabled",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Enabled
                </div>
            ),
            cell: ({ row }) => (
                row.original.Enabled ? (
                    <CheckCheck size={20} color="green" />
                ) : (
                    <CircleX size={20} color="red" />
                )
            ),
        },
        {
            id: "actions",
            header: () => (
                <div className={('flex items-center justify-start')}>
                    Actions
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
                            <DropdownMenuItem className="cursor-pointer">
                                <SquareChartGantt className="mr-2 h-4 w-4" />
                                <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <PenLineIcon className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const columns = React.useMemo(() => initialColumns, []);
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });


    const [DeleteCouponCode, { isLoading }] = useDeleteCouponCodeMutation()

    const handleDelete = async () => {

        const ids = table.getSelectedRowModel().rows.map((row) => row.original.StoreCouponID).join(',')
        console.log("🚀 ~ handleDelete ~ ids:", ids)

        if (!ids) {
            toast.error('Select at least one coupon code')
            return;
        }

        const promise = DeleteCouponCode(ids).unwrap()

        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Coupon code deleted successfully',
            error: 'Failed to delete coupon code'
        })

        try {
            await promise
            table.resetRowSelection();
            refetch()
        } catch (err) {
            console.error(err)
        } finally {
            setDeleteModal(false)
        }
    }

    return (
        <SectionLayout className="px-4 rounded-md">
            <div className="flex items-center gap-x-5">
                <Button asChild>
                    <Link href="/dashboard/marketing/cupon-codes/create">
                        <CirclePlus size={16} color="white" className="m-2" />
                        <span>Add Coupon</span>
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
                                No coupons available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </SectionLayout>
    );
};

export default CouponTable;

