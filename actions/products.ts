"use server"

import { createClient } from "@/utils/supabase/server";
import { createSchema, updateSchema } from "@/utils/validation/products";
import { z } from "zod";


type CreateProductData = z.infer<typeof createSchema> 

type UpdateProductData =  z.infer<typeof updateSchema>

export const uploadImages = async (files: File[], productId: string): Promise<string[]> => {
    const supabase = await createClient()

    const uploadedFiles: string[] = [];

    // Загружаем все файлы по очереди
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `products/${productId}/${file.name}`; // Путь для хранения в Supabase Storage

        // Загружаем файл в Supabase
        const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

        if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        }

        // Добавляем путь к файлу в массив
        uploadedFiles.push(data?.path || "");
    }

    return uploadedFiles;
};

const parseStringToArray = (input: string): string[] => {
	return input.split(",").map((item) => item.trim());
};

export const saveProduct = async(formData: CreateProductData): Promise<string> => {
	const { name, description, price, brand, sizes, category, colors, images } = formData;

	const supabase = await createClient()

	// Преобразуем строки в массивы для sizes и colors
	const sizesArray = parseStringToArray(sizes);
	const colorsArray = parseStringToArray(colors); // Если colors это массив строк

	const imageNames = images ? images.map((file) => file.name) : [];
	// Сохраняем продукт в базе данных и получаем его ID
	const { data, error } = await supabase
		.from("products")
		.insert([
			{
				name,
				description,
				price,
				brand,
				sizes: sizesArray, // Преобразуем строку в массив
				category,
				colors: colorsArray, // Преобразуем строку в массив
				images: imageNames, // Сохраняем имена файлов как есть
			},
		])
		.select() // Добавляем .select(), чтобы получить данные, включая ID
		.single(); // .single() чтобы получить единственный объект

	if (error) {
		throw new Error(`Failed to save product: ${error.message}`);
	}

	console.log("Product created successfully:", data);
	return data?.id || ""; // Возвращаем ID нового продукта
};



export const fetchProducts = async (page: number = 1, pageSize: number = 2) => {

	const supabase = await createClient()

	try {
		const { data, error, count } = await supabase
			.from("products")
			.select("*", { count: "exact" }) // Получаем точное количество записей
			.range((page - 1) * pageSize, page * pageSize - 1); // Применяем пагинацию

		if (error) {
			throw new Error(error.message);
		}

		return { products: data, totalCount: count };
	} catch (error) {
		throw new Error(`Error fetching products: ${error}`);
	}
};

export const deleteProduct = async (productId: number | string) => {
	const supabase = await createClient();

	try {
		// Выполняем удаление по id
		const { data, error: deleteError } = await supabase.storage
			.from('images')
			.remove([`products/${productId}`]); // Указываем путь к папке

		if (deleteError) {
			throw new Error(`Error deleting images: ${deleteError.message}`);
		}


		const { error } = await supabase
			.from('products')
			.delete()
			.eq('id', productId)


		console.log('error 12321', error)
		// Если ошибка, выбрасываем исключение
		if (error) {
			throw new Error(`Error deleting product: ${error.message}`);
		}

		// Возвращаем успех, если ошибок нет
		return { success: true, message: 'Product deleted successfully' };
	} catch (error) {
		// Обработка ошибок
		return { success: false, message: error };
	}
};


export const getProductById = async(productId: string | number) => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single(); // Ожидаем одну запись

    if (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }

    const product = {
        name: data.name,
        description: data.description,
        price: data.price,
        brand: data.brand,
        sizes: data.sizes.join(", "), // Преобразуем массив в строку
        category: data.category,
        colors: data.colors.join(", "), // Преобразуем массив в строку
        images: data.images.map((imagePath: string) => ({ name: imagePath.split("/").pop() })) // Если необходимо только имя
    };

    return product
}

export const updateProductData = async (formData: UpdateProductData, productId: string | number): Promise<any> => {
    const { name, description, price, brand, sizes, category, colors, images } = formData;
	console.log('product_id: ',productId)
    const supabase = await createClient()

    const sizesArray = parseStringToArray(sizes);
    const colorsArray = parseStringToArray(colors);

	let imagesNames: string[] = []

	let updatedData = {
		name,
		description,
		price,
		brand,
		sizes: sizesArray,
		category,
		colors: colorsArray,
	}

	if(images && Array.isArray(images) && images.every(file => file instanceof File)) {
		imagesNames = images ? images.map((file) => file.name) : [''];

		updatedData = Object.assign(updatedData, {
			images: imagesNames,
		});
	}

	const { status, statusText } = await supabase.from("products").update(updatedData).eq("id", productId);


	console.log("Product updated successfully");

	return status

  };