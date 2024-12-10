import React, { useEffect, useState } from "react";
import { getCartItems } from "@/actions/products";
import { createClient } from "@/utils/supabase/server";
import Checkout from "@/components/cart/Checkout";

export default async function CheckoutPage() {
    const supabase = await createClient()

    const {data: { user }} = await supabase.auth.getUser();
    
    let cartList: any = []

    let totalPrice: any  = 0

    if(user) {
        const {cartWithProductInfo, total} =  await getCartItems(user.id)

        cartList = cartWithProductInfo

        totalPrice = total
    }

    return(
        <Checkout cartList={cartList} totalPrice={totalPrice} user={user} />
    )

    
};
