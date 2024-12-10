"use client";

import React, { useState } from "react";
import { Separator } from "../ui/separator";

type ProductImagesProps = {
    mainImage: string;
    publicUrl: string;
    images: {
        name: string;
    }[];
};


const ProductCarousel = ({
    mainImage,
    images,
    publicUrl,
}: ProductImagesProps) => {
    const [currentImage, setCurrentImage] = useState(mainImage);

    return (
        <div className="md:flex block gap-2 items-end mr-6 md:w-1/2 w-full">
            {/* Главная картинка */}
            <div className="w-full mb-4 md:mb-0">
                <img
                    src={`${publicUrl}${currentImage}`}
                    alt="Main Product"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="flex md:flex-col gap-2 md:gap-0 justify-start md:space-y-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="md:w-16 md:h-16 w-20 h-20 cursor-pointer"
                        onClick={() => setCurrentImage(image.name)} // Обновление главной картинки
                    >
                        <img
                            src={publicUrl + image.name}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-full h-full object-cover object-center ${image.name == currentImage ? 'border border-black' : ''}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
