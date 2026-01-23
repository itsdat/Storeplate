"use client";
import ProductCardGrid from "@/components/feature/card/ProductCardGrid";
import { IProduct } from "@/interfaces/product/product.interface";

export default function ProductsGirdTab({ items }: { items: IProduct[] }) {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items &&items.map((item, index) => (
        <ProductCardGrid item={item} key={index} />
      ))}
    </div>
  );
}
