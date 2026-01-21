import ProductCardList from "@/components/feature/card/ProductCardList";
import { IProduct } from "@/interfaces/product/product.interface";

export default function ProductsListTab({ items }: { items: IProduct[] }) {
  return (
    <div className="w-full flex flex-col gap-5">
      {items &&items.map((item, index) => (
        <ProductCardList item={item} key={index} />
      ))}
    </div>
  );
}
