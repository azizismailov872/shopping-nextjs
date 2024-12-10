export interface Product {
    id?: string | number;
    name: string;
    description: string;
    price: number | string;
    brand: string;
    sizes: string[];
    images: string[] | File[];
    category: number | string;
    colors: string[];
}

export interface Category {
    id: string | number;
    name: string;
    created_at?: string
}

export type ProductImage = {
    name: string
}