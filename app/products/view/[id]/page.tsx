import { getCartItems, getProductById } from "@/actions/products";
import Header from "@/components/header/Header";
import ProductView from "@/components/products/ProductView";
import { createClient } from "@/utils/supabase/server";


export default async function Page({
    params,
}: {
    params: Promise<{ id: string | number }>;
}) {
    const supabase = await createClient()

    const productId = (await params).id;

    const product = await getProductById(productId);

    const publicUrl = `${process.env.IMAGES_PUBLIC_URL}products/${productId}/`;
    
    const { data: { user } } = await supabase.auth.getUser()


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
            <ProductView 
                product={product}
                productId={productId}
                publicUrl={publicUrl}
                user={user}
            />
        </>
    );
}
