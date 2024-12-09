"use server"

import { createClient } from "@/utils/supabase/server";

export const AddCategory = async<T>(data: T ) => {
    const supabase = await createClient()

    try {
        // Сохраняем в таблице categories
        const { error } = await supabase
            .from("categories")
            .insert(data);

        if (error) throw error;

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}


export const getCategoriesList = async() => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("categories")
        .select("id, name");

    return {
        data: data && data?.length > 0 ? data : [],
        error
    }
}