import { fetchProducts } from "@/actions/products";
import { ProductList } from "@/components/dashboard/products/product-list";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({
    searchParams,
}: {
    searchParams: { page: string; pageSize: string };
}) {
    const params = await searchParams;

    // Извлекаем параметры пагинации из query string
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

    return (
        <div>
            <div className="flex justify-between items-center mb-6 pr-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">제품</h2>
                    <p className="text-muted-foreground">
                        모든 제품 목록은 다음과 같습니다.
                    </p>
                </div>
                <Link className="px-4 h-9 max-h-9 flex justify-center items-center border border-black font-bold" href={'/dashboard/products/create'}>추가하다</Link>
            </div>
            <ProductList data={products} columns={columns} />
            {totalCount && totalCount > currentPageSize ? (
                <div className="mt-4 flex justify-between items-center">
                    <Link
                        href={{
                            pathname: "/dashboard/products",
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
                            pathname: "/dashboard/products",
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
        </div>
    );
}
