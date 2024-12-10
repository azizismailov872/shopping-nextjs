
import { getCategoriesList } from "@/actions/categories";
import { getProductById } from "@/actions/products";
import { EditFormContainer } from "@/components/dashboard/products/EditFormContainer";


export default async function Page({params}: {params: Promise<{ id: string | number }>}) {
    const productId = (await params).id;

    const product = await getProductById(productId)

    const {data,error} = await getCategoriesList()

    return(
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Edit product {`${product.name}`}</h2>
            <EditFormContainer categories={data} product={product} productId={productId} />
        </div>
    )
}
