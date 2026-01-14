"use client";
import { IProduct } from "@/interfaces/product/product.interface";
import ProductTable from "./list/ProductTable";

export default function ProductsDashboardLayout({
  items,
  totalItems,
}: {
  items: IProduct[];
  totalItems: number;
}) {
  return (
    <div className="w-full">
      <ProductTable items={items} totalItems={totalItems} />
    </div>
  );
}
