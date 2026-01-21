"use client";
import BaseCarousel from "@/components/common/carousel/BaseCarousel";
import BaseHeading from "@/components/common/heading/BaseHeading";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { getImageLink } from "@/utils/getImageLink.utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function CollectionsSectionLayout({
  items,
  total,
}: {
  items: ICollection[];
  total: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <BaseHeading title="Collections" />
      <BaseCarousel<ICollection>
        slides={items}
        slidesPerView={3}
        slidesPerGroup={1}
        autoPlay={false}
        dot={false}
        renderItem={(item) => <CollectionCard item={item} />}
      />
    </div>
  );
}

const CollectionCard = ({
  item,
  count,
}: {
  item: ICollection;
  count?: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("collectionId", item.id);
        router.push(`/products?${params.toString()}`);
      }}
    >
      <img
        src={getImageLink(item.image)}
        alt={item.name || "image"}
        draggable={false}
        className="h-72 w-full object-cover"
      />
      <h5 className="text-3xl text-(--color-title) font-medium mt-6 mb-2">
        {item.name}
      </h5>
      <p className="text-(--color-desc) text-xl">{count} items</p>
    </div>
  );
};
