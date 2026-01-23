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
    <div className="flex flex-col items-center justify-center md:gap-10 gap-5 md:py-20 md:mx-0 mx-5">
      <BaseHeading
        title="Featured Products"
        desc="Explore Today's Featured Picks!"
      />

      <div className="md:my-20 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 md:gap-y-14">
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
        className="md:w-60 w-fit md:px-0 px-5 rounded-sm cursor-pointer md:py-4 py-2.5 gap-1 md:text-xl text-sm font-medium flex items-center justify-center bg-(--color-btn) text-(--color-text-btn)"
      >
        <Plus size={16} strokeWidth={3} />
        See All Products
      </button>
    </div>
  );
}
