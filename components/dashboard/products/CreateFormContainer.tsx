"use client"

import { Category} from "@/types"
import { CreateForm } from "./CreateForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSchema } from "@/utils/validation/products"
import { useState } from "react"
import { z } from "zod"
import { saveProduct, uploadImages } from "@/actions/products"
import { redirect } from "next/navigation"

type Props = {
    categories: Category[]
}

type ProductForm = z.infer<typeof createSchema>

export const CreateFormContainer = ({categories,...props}: Props) => {

    const [fileList,setFileList] = useState<File[] | null>(null)

    const {register,handleSubmit,setValue,formState: { errors },control} = useForm<ProductForm>({
        resolver: zodResolver(createSchema),
    });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setValue("images", files);
        setFileList(files)
    };

    //const {register,handleSubmit,setValue,formState: { errors },control} = useForm();


    const handleProductSave = async(formData: ProductForm) => {
        try {
            // Сначала создаем продукт в базе данных, чтобы получить его ID
            const productId = await saveProduct(formData);

            // Если изображения есть, загружаем их в Supabase
            let uploadedFilePaths: string[] = [];
            if (formData.images && formData.images.length > 0) {
                uploadedFilePaths = await uploadImages(
                    formData.images,
                    productId
                ); // Передаем productId
            }

            redirect('/dashboard')
        } catch (error) {
            console.error("Error saving product:", error);
            redirect('/dashboard')
        }
    }

    return(
        <CreateForm 
            register={register}
            onSubmit={handleSubmit(handleProductSave)}
            categories={categories ? categories : []}
            errors={errors}
            control={control}
            onFileChange={onFileChange}
            fileList={fileList}
        />
    )
}