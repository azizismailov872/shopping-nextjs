"use server"

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { createSchema, updateSchema } from "@/utils/validation/products";
import { ProductImage } from "@/types";


type CreateProductData = z.infer<typeof createSchema>

type UpdateProductData = z.infer<typeof updateSchema>

interface Cart {
	user_id: string | number | null;
	product_id: string | number;
	size: string;
	color: string;
	totalPrice: number;
	count: number;
}

export const uploadImages = async (files: File[], productId: string | number): Promise<string[]> => {
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

export const saveProduct = async (formData: CreateProductData): Promise<string> => {
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
		.select()
		.single();

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

export const deleteProductImages = async (productId: number | string, productImages: ProductImage[] | File[] | string[] | null = nul) => {
	const supabase = await createClient()

	if (productImages && Array.isArray(productImages) && productImages.length > 0) {

		const filePaths = typeof productImages[0] === 'string' ? productImages.map(item => `products/${productId}/${item}`)
			: productImages.map(item => `products/${productId}/${item.name}`);

		const { data, error } = await supabase
			.storage
			.from('images')
			.remove(filePaths)

		return data
	}
}

export const deleteProduct = async (productId: number | string, productImages: ProductImage[] | File[] | string[] | null = null) => {
	const supabase = await createClient();

	try {

		if (productImages) {
			deleteProductImages(productId, productImages)
		}

		// Выполняем удаление по id
		const { error } = await supabase
			.from('products')
			.delete()
			.eq('id', productId)

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


export const getProductById = async (productId: string | number) => {
	const supabase = await createClient()


	const { data, error } = await supabase
		.from('products')
		.select(`
			*,
			categories(id,name)  // Получаем поле name из таблицы categories
		`)
		.eq('id', productId)
		.single()

	if (error) {
		throw new Error(`Failed to fetch product: ${error.message}`);
	}

	const product = {
		name: data?.name || '',
		description: data.description,
		price: data.price,
		brand: data.brand,
		sizes: data.sizes.join(", "), // Преобразуем массив в строку
		category: data.categories,
		colors: data.colors.join(", "), // Преобразуем массив в строку
		images: data.images.map((imagePath: string) => ({ name: imagePath.split("/").pop() })),
	};

	return product
}

export const updateProductData = async (formData: UpdateProductData, productId: string | number): Promise<any> => {
	const { name, description, price, brand, sizes, category, colors, images } = formData;

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

	if (images && Array.isArray(images) && images.every(file => file instanceof File)) {
		imagesNames = images ? images.map((file) => file.name) : [''];

		updatedData = Object.assign(updatedData, {
			images: imagesNames,
		});
	}

	const { status, statusText } = await supabase.from("products").update(updatedData).eq("id", productId);


	console.log("Product updated successfully");

	return status

};

// add to cart
export async function addToCart(data: Cart) {
	const { user_id, product_id, size, color, totalPrice, count } = data;
	const supabase = await createClient();

	try {
		// Вставляем или обновляем товар в корзине
		const { data: upsertData, error: upsertError } = await supabase
			.from('cart')
			.upsert([
				{
					user_id,
					product_id,
					size,
					color,
					totalPrice,
					count,
				}
			], { onConflict: ['user_id', 'product_id', 'size', 'color'] })
			.select();

		if (upsertError) {
			console.error('Ошибка при добавлении/обновлении товара в корзине:', upsertError.message);
			return { success: false, error: upsertError.message };
		}

		// Если товар найден, обновляем count и totalPrice
		if (upsertData && upsertData.length > 0) {
			const existingCartItem = upsertData[0];

			// Прибавляем к totalPrice (обновляем количество)
			const updatedTotalPrice = existingCartItem.totalPrice + totalPrice; // добавляем стоимость товара

			const { error: updateError } = await supabase
				.from('cart')
				.update({
					count: existingCartItem.count + 1, // Увеличиваем количество на 1
					totalPrice: updatedTotalPrice,      // Прибавляем цену к общей стоимости
				})
				.eq('user_id', user_id)
				.eq('product_id', product_id)
				.eq('size', size)
				.eq('color', color); // Сравниваем с правильным полем (color)

			if (updateError) {
				console.error('Ошибка при обновлении корзины:', updateError.message);
				return { success: false, error: updateError.message };
			}

			console.log('Корзина обновлена успешно!');
			return { success: true, cartItem: upsertData }; // Возвращаем обновленные данные
		} else {
			console.log('Ошибка: товар не найден');
			return { success: false, error: 'Товар не найден' };
		}
	} catch (error) {
		console.error("Error adding to cart:", error);
		return { success: false, error: error.message };
	}
}
