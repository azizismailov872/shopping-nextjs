"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product, ProductImage } from "@/types";
import Link from "next/link";
import { deleteProduct } from "@/actions/products";
import { redirect } from "next/navigation";



const deleteProductAction = async(productId: number | string,productImages: ProductImage[] | File[] | string[] |  null = null )     => {
    const result = await deleteProduct(productId,productImages); // Где 123 - это id продукта, который нужно удалить

    if (result.success) {
        
        redirect('/dashboard/products')
    } else {
        console.error(result.message); // Ошибка при удалении
    }
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "colors",
        header: "Colors",
    },
    {
        accessorKey: "sizes",
        header: "Sizes",
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
                                <span>View</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => deleteProductAction(product?.id ? product.id : '',product.images)}>
                            <Trash />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
