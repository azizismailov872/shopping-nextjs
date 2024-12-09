import { fetchProducts } from "@/actions/products";
import Header from "@/components/header/Header";
import ProductsList from "@/components/products/ProductsList";

export default async function Home({searchParams}: {searchParams: { page: string; pageSize: string }}) {
    
    const params = await searchParams;

    const currentPage = parseInt(params.page || "1");
    const currentPageSize = parseInt(params.pageSize || "10");

    const { products, totalCount } = await fetchProducts(
        currentPage,
        currentPageSize
    );

    const totalPages =
        totalCount && totalCount !== null
            ? Math.ceil(totalCount / currentPageSize)
            : 0;

    return(
        <>
            <Header />
            <main className="mx-auto max-w-screen-xl px-8 pt-4">
                <ProductsList products={products} />
            </main>
        </>
    )
}
