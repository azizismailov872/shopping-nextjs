import { getProductById } from "@/actions/products";
import ProductCarousel from "@/components/products/ProductCarusel";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string | number }>;
}) {
    const productId = (await params).id;

    const product = await getProductById(productId);

    const placeholder = "https://placehold.co/600x400";

    const publicUrl = `${process.env.IMAGES_PUBLIC_URL}products/${productId}/`;

    const sizes = product.sizes.split(',')


    return (
        <div className="container mb-16">
            <h2 className="text-black font-semibold mb-4 text-3xl">View product {product.name}</h2>
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
                            <h2 className="text-lgtext-gray-600 mb-2">설명:</h2>
                            <p className="text-gray-500 mb-6">
                                {product.description}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lgtext-gray-600 mb-2">범주:</h2>
                            <p className="text-gray-500 mb-6">
                                {product.category.name}
                            </p>
                        </div>
                    </div>
                    <Separator className="bg-black mb-4" />
                    <div className="px-4">
                        <div className="mb-4">
                            <h2 className="text-lgtext-gray-600 mb-2">그림 물감:</h2>
                            <p className="text-gray-500 mb-6">
                                {product.colors}
                            </p>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">사이즈:</span>
                            <ul className="flex space-x-2">
                                {sizes.map((size: string, index: string) => (
                                    <li
                                        key={index}
                                        className="border text-center w-12 py-1 font-bold"
                                    >
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="px-4">
                        <Link className="hover:text-white hover:bg-black transition-colors flex justify-center items-center gap-2 max-w-32 px-2 py-1 border border-black" href={`/dashboard/products/edit/${productId}`}>
                            <Edit size={18} />
                            <span className="text-lg">편집하다</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
