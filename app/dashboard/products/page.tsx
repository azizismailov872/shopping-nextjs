import { fetchProducts } from "@/actions/products";
import { ProductList } from "@/components/dashboard/product-list";
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
            <div className="flex justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Products</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your tasks for this month!
                    </p>
                </div>
                <Button size={'sm'}>
                    <Link href={'/dashboard/products/create'}>Create</Link>
                </Button>
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
