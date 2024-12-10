import { fetchProducts, getCartItems } from "@/actions/products";
import Header from "@/components/header/Header";
import ProductsList from "@/components/products/ProductsList";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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
    const currentPageSize = parseInt(params.pageSize || "12");

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
                {totalCount && totalCount > currentPageSize ? (
                <div className="mt-4 flex justify-between items-center">
                    <Link
                        href={{
                            pathname: "/",
                            query: {
                                page: currentPage - 1,
                                pageSize: currentPageSize,
                            },
                        }}
                    >
                        <Button disabled={currentPage === 1}>Previous</Button>
                    </Link>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <Link
                        href={{
                            pathname: "/",
                            query: {
                                page: currentPage + 1,
                                pageSize: currentPageSize,
                            },
                        }}
                    >
                        <Button disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </Link>
                </div>
            ) : null}
            </main>
        </>
    );
}
