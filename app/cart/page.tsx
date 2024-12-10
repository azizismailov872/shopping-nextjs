import { getCartItems } from "@/actions/products";
import CartPage from "@/components/cart/CartPage";
import Header from "@/components/header/Header";
import { createClient } from "@/utils/supabase/server";

export default async function Cart() {
    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

    let cartList: any = []

    let totalPrice: any  = 0

    if(user) {
        const {cartWithProductInfo, total} =  await getCartItems(user.id)

        cartList = cartWithProductInfo

        totalPrice = total
    }

    return (
        <>
            <Header user={user} cartList={cartList} />
            <main className="mx-auto max-w-screen-xl px-8 pt-4">
                <section>
                    <CartPage cartList={cartList} totalPrice={totalPrice} />
                </section>
            </main>
        </>
    );
}
