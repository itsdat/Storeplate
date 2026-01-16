"use client";
import BaseHeading from "@/components/common/heading/BaseHeading";
import CartsTable from "./list/CartsTable";
import { ICart } from "@/interfaces/cart/cart.interface";

export default function CartsLayout({
  items,
  total,
}: {
  items?: ICart[];
  total?: number;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <BaseHeading
        title="Carts"
        desc="Check product details, quantities, and prices in your cart."
      />

      <CartsTable items={items} total={total} />
    </div>
  );
}
