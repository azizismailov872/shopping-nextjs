"use client";

import React, { useState } from "react";
import ProductCarousel from "./ProductCarusel";
import { Product } from "@/types";
import { Separator } from "@/components/ui/separator";
import { addToCart } from "@/actions/products";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { ShoppingBag} from "lucide-react";
import { redirect } from "next/navigation";

interface LocalProduct extends Omit<Product, "images"> {
    images: {
        name: string;
    }[];
}

interface Props {
    publicUrl: string;
    product: LocalProduct;
    productId: number | string;
    user: User | null
}

const ProductView = ({ product, productId,publicUrl, user}: Props) => {
    const placeholder = "https://placehold.co/600x400";

    const sizes = product.sizes.split(",");

    const colors = product.colors.split(",");

    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [count, setCount] = useState<number>(1);


    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor) {
          alert("사이즈와 색상을 선택해주세요.");
          return;
        }
    
        const response = await addToCart({
          user_id: user ? user.id : null, // Получите ID пользователя через механизм аутентификации
          product_id: productId,
          size: selectedSize,
          color: selectedColor,
          totalPrice: Number(product.price) * count,
          count: count,
        });
    
        if (response.success) {
            toast.success('제품이 성공적으로 추가되었습니다.')
            redirect(`/products/view/${productId}`)
        } else {
          alert(`Ошибка при добавлении товара в корзину ${response.error}`);
        }
      };

    return (
        <main className="p-8">
            <div className="container mb-16">
                <div className="mx-auto flex md:flex-row flex-col gap-9">
                    <ProductCarousel
                        publicUrl={publicUrl}
                        images={
                            product.images && product.images.length > 0
                                ? product.images
                                : []
                        }
                        mainImage={
                            product.images && product.images.length > 0
                                ? product.images[0].name
                                : placeholder
                        }
                    />
                    <div className="md:w-2/5 w-full border border-black py-5">
                        <div className="px-4">
                            <div className="flex flex-wrap justify-between">
                                <h2 className="text-xl font-semibold mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-gray-700 text-lg mb-4">
                                    ₩ {product.price}
                                </p>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {product.brand}
                            </p>
                            <div>
                                <h2 className="text-lgtext-gray-600 mb-2">
                                    설명:
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    {product.description}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lgtext-gray-600 mb-2">
                                    범주:
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    {product.category.name}
                                </p>
                            </div>
                        </div>
                        <Separator className="bg-black mb-4" />
                        <div className="px-4">
                            <div className="mb-4">
                                <h2 className="text-lgtext-gray-600 mb-2">
                                    그림 물감:
                                </h2>
                                <fieldset className="flex flex-wrap gap-3">
                                    <legend className="sr-only">Color</legend>
                                    {colors.map((color, index) => (
                                        <div key={color}>
                                            <label
                                                htmlFor={`color-${index}`} // Уникальный id для каждой радиокнопки
                                                className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            >
                                                <input
                                                    type="radio"
                                                    name="color"
                                                    value={color}
                                                    id={`color-${index}`} // Уникальный id для каждой радиокнопки
                                                    className="sr-only"
                                                    checked={
                                                        selectedColor === color
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedColor(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <p className="text-sm font-medium">
                                                    {color}
                                                </p>
                                            </label>
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                            <div className="mb-4">
                                <span className="font-semibold inline-block mb-3">사이즈:</span>
                                <fieldset className="flex flex-wrap gap-3">
                                    <legend className="sr-only">Size</legend>
                                    {sizes.map((size, index) => (
                                        <div key={size}>
                                            <label
                                                htmlFor={`size-${index}`} // Уникальный id для каждой радиокнопки
                                                className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            >
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size}
                                                    id={`size-${index}`} // Уникальный id для каждой радиокнопки
                                                    className="sr-only"
                                                    checked={
                                                        selectedSize === size
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedSize(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <p className="text-sm font-medium">
                                                    {size}
                                                </p>
                                            </label>
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                        </div>
                        <div className="px-4">
                            <Button variant={'outline'} className="border-black rounded-none hover:bg-black hover:text-white" onClick={user && user !== null ? handleAddToCart : () =>redirect('/login')}>
                                <ShoppingBag size={24} />
                                추가하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductView;
