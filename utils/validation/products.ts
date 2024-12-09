

import {z} from 'zod'


export const createSchema = z.object({
    name: z.string().min(1, "Name is required"), 
    description: z.string().min(10, "Description must be at least 10 characters long"), 
    price: z.number().int().min(0, "Price must be a positive integer"), 
    brand: z.string().min(1, "Brand is required"), 
    sizes: z.string().min(1, "Size is required"), 
    //images: z.array(z.instanceof(File)).nullable(),
    category: z.number().int().min(1, "Category ID must be a positive integer"),
    colors: z.string().min(1, "Colors are required"), 
    images: z
    .array(z.instanceof(File)) // Проверка, что это массив файлов
    .refine((files) => files.length > 0, "At least one image is required")
    .refine((files) => files.every((file) => file instanceof File), "Invalid file format")
    .nullable()
});

export const updateSchema = z.object({
    name: z.string().min(1, "Name is required"), 
    description: z.string().min(10, "Description must be at least 10 characters long"), 
    price: z.number().int().min(0, "Price must be a positive integer"), 
    brand: z.string().min(1, "Brand is required"), 
    sizes: z.string().min(1, "Size is required"), 
    //images: z.array(z.instanceof(File)).nullable(),
    category: z.number().int().min(1, "Category ID must be a positive integer"),
    colors: z.string().min(1, "Colors are required"), 
    images: z
    .array(z.instanceof(File)) // Проверка, что это массив файлов
    .refine((files) => files.every((file) => file instanceof File), "Invalid file format")
    .optional()
});