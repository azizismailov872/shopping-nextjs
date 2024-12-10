import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";
import CartNav from "../cart/CartNav";

const Header = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    let cartList: any[] = [];

    if (user) {
        const { data: cartItems, error: cartError } = await supabase
            .from("cart")
            .select("product_id, size, color, count, totalPrice") // Поля корзины
            .eq("user_id", user.id); // Фильтруем по user_id

        if (cartError) {
            console.error(
                "Ошибка при получении товаров из корзины:",
                cartError.message
            );
            return { success: false, error: cartError.message };
        }

        // Получаем информацию о товарах из таблицы products
        const productIds = cartItems.map((item) => item.product_id);

        const { data: products, error: productsError } = await supabase
            .from("products")
            .select("id, name, description, price, images") // Поля продуктов
            .in("id", productIds); // Фильтруем по массиву product_id

        if (productsError) {
            console.error(
                "Ошибка при получении данных о товарах:",
                productsError.message
            );
            return { success: false, error: productsError.message };
        }

        // Сопоставляем товары из корзины с информацией о товарах
        const cartWithProductInfo = cartItems.map((item) => {
            const product = products.find((p) => p.id === item.product_id);
            return {
                ...item,
                productName: product?.name,
                productDescription: product?.description,
                productPrice: product?.price,
                productImages: product?.images,
            };
        });

        cartList = cartWithProductInfo

        console.log(cartList)
    }

    return (
        <header className="bg-white shadow-md mb-6">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link className="block text-black font-bold" href="/">
                            <span className="sr-only">Home</span>
                            <span>MussarovShop</span>
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <AuthButtons user={user} />
                        <CartNav cart={cartList} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
