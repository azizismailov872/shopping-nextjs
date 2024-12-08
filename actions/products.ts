"use server"

import { createClient } from "@/utils/supabase/server";



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
      return { success: false, message: error?.message ? error.message : '' };
    }
  };