import BaseHeading from "@/components/common/heading/BaseHeading";
import ProductCardGrid from "@/components/feature/card/ProductCardGrid";
import { IProduct } from "@/interfaces/product/product.interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeatureSectionLayout({
  items,
  total,
}: {
  items: IProduct[];
  total: number;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <BaseHeading
        title="Featured Products"
        desc="Explore Today's Featured Picks!"
      />

      <div className="my-20 grid grid-cols-4 gap-x-5 gap-y-14">
        {items ? (
          items.length > 8 ? (
            items
              .slice(0, 8)
              .map((item, index) => <ProductCardGrid key={index} item={item} />)
          ) : (
            items.map((item, index) => (
              <ProductCardGrid key={index} item={item} />
            ))
          )
        ) : (
          <div>No Product</div>
        )}
      </div>

      <button
        onClick={() => router.push("/products")}
        className="w-60 rounded-sm cursor-pointer py-4 gap-1 text-xl font-medium flex items-center justify-center bg-(--color-btn) text-(--color-text-btn)"
      >
        <Plus size={16} strokeWidth={3} />
        See All Products
      </button>
    </div>
  );
}
