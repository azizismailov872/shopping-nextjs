import { fetchProducts, getCartItems } from "@/actions/products";
import Header from "@/components/header/Header";
import ProductsList from "@/components/products/ProductsList";
import { createClient } from "@/utils/supabase/server";

interface Props {
    searchParams: { 
        page: string; 
        pageSize: string 
    }
}

export default async function Home({searchParams}: Props) {
    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

    const params = await searchParams;

    const currentPage = parseInt(params.page || "1");
    const currentPageSize = parseInt(params.pageSize || "10");

    const { products, totalCount } = await fetchProducts(
        currentPage,
        currentPageSize
    );

    const totalPages = totalCount && totalCount !== null ? Math.ceil(totalCount / currentPageSize) : 0;

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
                <ProductsList products={products} />
            </main>
        </>
    );
}
