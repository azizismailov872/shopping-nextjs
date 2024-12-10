import Link from "next/link";

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
    product: Product,
}

const ProductCard = ({product}: Props) => {

    const placeholder = 'https://placehold.co/600x400'

    const publicUrl = process.env.IMAGES_PUBLIC_URL

    return (
        <Link href={`/products/view/${product.id}`} className="group block overflow-hidden">
            <div className="relative h-[350px] sm:h-[450px]">
                <img
                    src={product.images.length > 0  ? `${publicUrl}/products/${product.id}/${product.images[0]}` : placeholder}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-100 group-hover:opacity-0"
                />

                <img
                    src={`${publicUrl}/products/${product.id}/${product.images[1]}`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
            </div>

            <div className="relative bg-white pt-3">
                <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {
                        product.name
                    }
                </h3>

                <div className="mt-1.5 flex items-center justify-between text-gray-900">
                    <p className="tracking-wide">₩ {product.price}</p>

                    <p className="text-xs uppercase tracking-wide">{product.colors.length} 그림 물감</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
