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
    <div className="flex flex-col items-center justify-center md:gap-10 gap-5 md:py-20 py-10 md:mx-0 mx-5">
      <BaseHeading title="Collections" />
      <div className="w-full hidden md:block">
        <BaseCarousel<ICollection>
          slides={items}
          slidesPerView={3}
          slidesPerGroup={1}
          autoPlay={false}
          dot={false}
          renderItem={(item) => <CollectionCard item={item} />}
        />
      </div>
      <div className="w-full block md:hidden">
        <BaseCarousel<ICollection>
          slides={items}
          slidesPerView={2}
          slidesPerGroup={1}
          autoPlay={false}
          dot={false}
          renderItem={(item) => <CollectionCard item={item} />}
        />
      </div>
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
        className="md:h-72 aspect-square w-full object-cover"
      />
      <h5 className="md:text-3xl text-center text-(--color-title) font-medium md:mt-6 mt-2 md:mb-2">
        {item.name}
      </h5>
      <p className="text-(--color-desc) text-xl">{count} items</p>
    </div>
  );
};
