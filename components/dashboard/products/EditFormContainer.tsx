"use client"

import { Category, Product} from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {updateSchema } from "@/utils/validation/products"
import { useState } from "react"
import { z } from "zod"
import { updateProductData, uploadImages } from "@/actions/products"
import { redirect } from "next/navigation"
import { EditForm } from "./EditForm"

type Props = {
    product: any
    categories: Category[]
    productId: number | string
}

export type fileListName = {
    name: string
}

type ProductForm = z.infer<typeof updateSchema>

export const EditFormContainer = ({categories,product,productId,...props}: Props) => {
    const [fileList,setFileList] = useState<File[] | fileListName[] | null>(product?.images ? product.images : [])

    const {images, ...defaultProductData} = product

    const {register,handleSubmit,setValue,formState: { errors },control} = useForm<ProductForm>({
        resolver: zodResolver(updateSchema),
        defaultValues: {...defaultProductData}
    });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setValue("images", files);
        setFileList(files)
    };

    const handleProductSave = async(formData: ProductForm) => {
        
        try {
            // Сначала создаем продукт в базе данных, чтобы получить его ID
            const status = await updateProductData(formData,productId);

            // Если изображения есть, загружаем их в Supabase
            let uploadedFilePaths: string[] = [];
            if (formData.images && formData.images.length > 0 && formData.images.every(file => file instanceof File)) {
                uploadedFilePaths = await uploadImages(
                    formData.images,
                    product.id
                );
            }

            redirect('/dashboard/products')
        } catch (error) {
            console.error("Error saving product:", error);
            redirect('/dashboard/products')
        }
    }

    return(
        <EditForm
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