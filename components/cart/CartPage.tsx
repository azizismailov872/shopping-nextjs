"use client";

import { deleteCartItem } from "@/actions/products";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    cartList: any;
    totalPrice: number | string;
}

export default function CartPage({ cartList, totalPrice }: Props) {
    const publicUrl =
        "https://gcxevpimgjmjtkhcfrin.supabase.co/storage/v1/object/public/images/products/";

    const addCommas = (str) => {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const total = addCommas(String(totalPrice));

    const handleDelete = async (cartItemId: string | number) => {
        const result = await deleteCartItem(cartItemId);

        if (result.success) {
            toast.success("제품이 삭제되었습니다.");
            redirect("/cart");
            // Здесь можно обновить состояние корзины или перезагрузить данные
        } else {
            alert(`Failed to delete item: ${result.error}`);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        귀하의 구매
                    </h1>
                </header>

                <div className="mt-8">
                    <ul className="space-y-4">
                        {cartList && cartList.length > 0 ? (
                            cartList.map((product) => (
                                <li
                                    key={product.product_id + Math.random()}
                                    className="flex items-center gap-4"
                                >
                                    <img
                                        src={`${publicUrl}${product.product_id}/${product.productImages[0]}`}
                                        alt=""
                                        className="size-16 rounded object-cover"
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">
                                            {product.productName}
                                        </h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">
                                                    Size:
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

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <span>{product.count}</span>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="text-gray-600 transition hover:text-red-600"
                                        >
                                            <span className="sr-only">
                                                Remove item
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>제품 없음</li>
                        )}
                    </ul>

                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                        <div className="w-screen max-w-lg space-y-4">
                            <dl className="space-y-0.5 text-sm text-gray-700">
                                <div className="flex justify-between !text-base font-medium">
                                    <dt>총 가격</dt>
                                    <dd>₩ {total}</dd>
                                </div>
                            </dl>

                            {cartList && cartList.length > 0 && (
                                <div className="flex justify-end">
                                    <Link
                                        href="/checkout"
                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                    >
                                        결제를 진행하세요
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
