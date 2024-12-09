
import { getCategoriesList } from "@/actions/categories";
import { getProductById } from "@/actions/products";
import { EditFormContainer } from "@/components/dashboard/products/EditFormContainer";


export default async function Page({params}: {params: Promise<{ id: string | number }>}) {
    const productId = (await params).id;

    const product = await getProductById(productId)

    const {data,error} = await getCategoriesList()

    console.log('initial product: ',product)


    return(
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <EditFormContainer categories={data} product={product} productId={productId} />
        </div>
    )
}
