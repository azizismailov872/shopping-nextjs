import { getCategoriesList } from "@/actions/categories";
import { createClient } from "@/utils/supabase/server";
import { CreateFormContainer } from "@/components/dashboard/products/CreateFormContainer";


export default async function CreatePage() {

    const supabase = await createClient();

    const { data, error } = await getCategoriesList()

    if (error) {
        console.log("error: ", error);
        throw error;
    }


    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Add new product</h2>
            <CreateFormContainer categories={data} />
        </div>
    )
}