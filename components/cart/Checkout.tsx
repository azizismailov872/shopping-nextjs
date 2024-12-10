"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { deleteAllCartItems } from "@/actions/products";

interface Props {
    cartList: any;
    totalPrice: any;
    user: User | null;
}

const Checkout = ({ cartList, totalPrice, user }: Props) => {
    const publicUrl =
        "https://gcxevpimgjmjtkhcfrin.supabase.co/storage/v1/object/public/images/products/";

    const [customerInfo, setCustomerInfo] = useState({
        address: "",
        name: "",
        email: user?.email ? user.email : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await deleteAllCartItems(user.id); // Вызываем серверную функцию

        if (result.success) {
            toast.success("구매가 성공적으로 완료되었습니다");
            redirect("/");
            // Здесь можно обновить состояние корзины на клиенте или перезагрузить страницу
        } else {
            toast.error('Error')
            redirect("/");
        }

       
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6">지불</h1>

                {/* Список товаров в корзине */}
                <div className="space-y-4 mb-6">
                    {cartList &&
                        cartList.length > 0 &&
                        cartList.map((item: any) => (
                            <div
                                key={item.product_id + Math.random()}
                                className="flex items-center justify-between p-4 border rounded-md shadow-sm mb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`${publicUrl}${item.product_id}/${item.productImages[0]}`}
                                        alt={item.productName}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm text-gray-900">
                                            {item.productName}
                                        </h3>
                                        <div className="text-xs text-gray-600">
                                            <p>Size: {item.size}</p>
                                            <p>Color: {item.color}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-gray-900">
                                    £{item.productPrice * item.count}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Сумма заказа */}
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                        <span>총 가격</span>
                        <span>₩ {totalPrice}</span>
                    </div>
                </div>

                {/* Форма для ввода данных покупателя */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium">
                            전체 이름
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            value={customerInfo.name}
                            onChange={handleChange}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="address"
                            className="text-sm font-medium"
                        >
                            주소
                        </Label>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            value={customerInfo.address}
                            onChange={handleChange}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                            이메일
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={customerInfo.email}
                            onChange={handleChange}
                            required
                            className="w-full"
                        />
                    </div>

                    {/* Кнопка отправки */}
                    <Button
                        type="submit"
                        className="w-full bg-transparent border border-black text-black py-3 rounded mt-6 hover:bg-black hover:text-white"
                    >
                        Place Order
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
