import ProductCard from "./ProductCard";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: string;
    sizes: string[];  // Массив строк для размеров
    category: number;  // Идентификатор категории
    images: string[];  // Массив строк для имен файлов изображений
    colors: string[];  // Массив строк для цветов
    created_at: string;  // Строка с датой
};

interface Props {
    products: Product[],
}

const ProductsList = ({products}: Props) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                products && products.map((product) => <ProductCard key={product.name} product={product} />)
            }
        </div>
    );
}

export default ProductsList