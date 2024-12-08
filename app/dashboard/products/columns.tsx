"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types";
import Link from "next/link";
import { deleteProduct } from "@/actions/products";

const deleteProductAction = async(productId: number | string) => {
    const result = await deleteProduct(productId); // Где 123 - это id продукта, который нужно удалить

    if (result.success) {
        console.log(result.message); // Успешно удалено
    } else {
        console.error(result.message); // Ошибка при удалении
    }
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "name",
    },
    {
        accessorKey: "price",
        header: "price",
    },
    {
        accessorKey: "brand",
        header: "brand",
    },
    {
        accessorKey: "colors",
        header: "Colors",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link className="flex gap-3" href={`/dashboard/products/edit/${product.id}`}>
                                <Edit />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="flex gap-3" href={`/dashboard/products/view/${product.id}`}>
                                <Eye />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteProductAction(product.id)}>
                            <Trash />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
