"use client";

import { ChevronsUpDown, LogOut, ShoppingBag } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Props {
    cart: any[];
}

const CartNav = ({ cart }: Props) => {
    const publicUrl = `https://gcxevpimgjmjtkhcfrin.supabase.co/storage/v1/object/public/images/products/`;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 px-1 py-1.5 text-left text-sm">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            <ShoppingBag />
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuItem>
                    <div
                        className="relative w-screen max-w-sm"
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="mt-4 space-y-6">
                            <ul className="space-y-4">
                                {cart && cart.length > 0 ? (
                                    cart.slice(0, 3).map((product) => (
                                        <li key={product.product_id + Math.random()} className="flex items-center gap-4">
                                            <img
                                                src={`${publicUrl}/${product.product_id}/${product.productImages[0]}`}
                                                alt=""
                                                className="size-16 rounded object-cover"
                                            />

                                            <div>
                                                <h3 className="text-sm text-gray-900">
                                                    {
                                                        product.productName.slice(0,10) + '...'
                                                    }
                                                </h3>

                                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                    <div>
                                                        <dt className="inline">
                                                            Size
                                                        </dt>
                                                        <dd className="inline">
                                                            {product.size}
                                                        </dd>
                                                    </div>

                                                    <div>
                                                        <dt className="inline">
                                                            Color:
                                                        </dt>
                                                        <dd className="inline">
                                                            {product.color}
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>No products</li>
                                )}
                            </ul>

                            <div className="space-y-4 text-center">
                                <Link
                                    href="/cart"
                                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                                >
                                    결제를 진행하세요 ({cart.length})
                                </Link>
                            </div>
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CartNav;
