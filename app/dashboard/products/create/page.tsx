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
        <div>
            <h2>Add New product</h2>
            <CreateFormContainer categories={data} />
        </div>
    )
}