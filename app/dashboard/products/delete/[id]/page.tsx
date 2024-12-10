
import { getProductById } from "@/actions/products";
import Loader from "@/components/ui/loader";
import {PulseLoader} from 'react-spinners'


export default async function Page({params}: {params: Promise<{ id: string | number }>}) {
    const productId = (await params).id; 

    return(
        <div className="">
            <Loader />
        </div>
    )
}
