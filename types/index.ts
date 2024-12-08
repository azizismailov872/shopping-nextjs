export interface Product {
    id: string | number;
    name: string;
    description: string;
    price: number | string;
    brand: string;
    sizes: string[];
    images: string[];
    category: number | string;
    colors: string[];
}


interface ProductForm extends Omit<Product, 'id' | 'images' | 'sizes' | 'colors'> {
    images: File[];
    sizes: string;
    colors: string;
}

interface Category {
    id: string | number;
    name: string;
    created_at?: string
}

