"use client";
import ProductCardGrid from "@/components/feature/card/ProductCardGrid";
import { IProduct } from "@/interfaces/product/product.interface";

export default function ProductsGirdTab({ items }: { items: IProduct[] }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, index) => (
        <ProductCardGrid item={item} key={index} />
      ))}
    </div>
  );
}
