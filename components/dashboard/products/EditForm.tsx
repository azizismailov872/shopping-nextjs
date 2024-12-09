"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import { File } from "lucide-react";
import { Controller } from "react-hook-form";
import { fileListName } from "./EditFormContainer";

type Props = {
    register: any;
    onSubmit: any;
    control: any;
    categories: Category[];
    errors: any;
    onFileChange: any;
    fileList: File[] | fileListName[] | null
}

export const EditForm = ({register,onSubmit,control,categories,errors,onFileChange,fileList}: Props) => {

    return(
        <form onSubmit={onSubmit}>
           <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="name">
                    Name
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Name"
                        className="border-none"
                        {...register("name")}
                    />
                </div>
                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Description Field */}
            <div className="mb-3">
                <Label
                    className="mb-3 text-sm font-semibold"
                    htmlFor="description"
                >
                    Description
                </Label>
                <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded-md"
                    {...register("description")}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-sm">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Price Field */}
            <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="price">
                    Price
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Price"
                        type="number"
                        className="border-none"
                        {...register("price", { valueAsNumber: true })}
                    />
                </div>
                {errors.price && (
                    <p className="text-red-500 text-sm">
                        {errors.price.message}
                    </p>
                )}
            </div>

            {/* Brand Field */}
            <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="brand">
                    Brand
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Brand"
                        className="border-none"
                        {...register("brand")}
                    />
                </div>
                {errors.brand && (
                    <p className="text-red-500 text-sm">
                        {errors.brand.message}
                    </p>
                )}
            </div>

            {/* Colors Field */}
            <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="colors">
                    Colors
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Red, Purple"
                        className="border-none"
                        {...register("colors")}
                    />
                </div>
                {errors.colors && (
                    <p className="text-red-500 text-sm">
                        {errors.colors.message}
                    </p>
                )}
            </div>

            {/* Size Field */}
            <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="size">
                    Sizes
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Sizes"
                        className="border-none"
                        {...register("sizes")}
                    />
                </div>
                {errors.sizes && (
                    <p className="text-red-500 text-sm">
                        {errors.sizes.message}
                    </p>
                )}
            </div>

            {/* Category Field */}
            <div className="mb-3">
                <Label
                    className="mb-3 text-sm font-semibold"
                    htmlFor="category_id"
                >
                    Category
                </Label>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={(newValue) =>
                                field.onChange(Number(newValue))
                            }
                            {...field}
                            value={`${field.value}`}
                        >
                            <SelectTrigger className="focus:border focus:border-black">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories && categories.length > 0 ? (
                                    categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="0">
                                        No category
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.category && <p className="text-red-500 text-sm">
                        {errors.category.message}
                    </p>}
            </div>
            <div className="mb-3">
                <Label className="mb-3 text-sm font-semibold" htmlFor="size">
                    Images
                </Label>
                <div className="border border-input bg-background rounded-md focus-within:border-black">
                    <Input
                        placeholder="Sizes"
                        className="border-none"
                        type="file"
                        name="images"
                        onChange={onFileChange}
                        multiple
                    />
                </div>
                {errors.images && (
                    <p className="text-red-500">{errors.images.message}</p>
                )}
            </div>
            <div className="mt-6" id="fileList">
                {fileList && fileList?.length > 0
                    ? fileList.map((image) => (
                          <div key={image.name} className="flex gap-3 mb-3">
                              <File />
                              <p className="font-semibold">{image.name}</p>
                          </div>
                      ))
                    : null}
            </div>
            <Button type="submit" className="mt-3 min-w-[150px]">Send</Button>
        </form>
    )
}