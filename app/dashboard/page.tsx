import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient();

	// const { error } = await supabase.auth.signOut()

    // if(!error) {
    //     redirect('/')
    // }

    return <div>hello world</div>;
}
