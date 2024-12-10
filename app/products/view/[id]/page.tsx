import { getProductById } from "@/actions/products";
import ProductCarousel from "@/components/products/ProductCarusel";
import ProductView from "@/components/products/ProductView";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { Edit } from "lucide-react";
import Link from "next/link";

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

    return (
        <ProductView 
            product={product}
            productId={productId}
            publicUrl={publicUrl}
            user={user}
        />
    );
}
