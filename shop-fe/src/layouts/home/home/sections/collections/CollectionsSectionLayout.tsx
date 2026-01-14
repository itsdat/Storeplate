"use client";
import BaseCarousel from "@/components/common/carousel/BaseCarousel";
import BaseHeading from "@/components/common/heading/BaseHeading";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { getImageLink } from "@/utils/getImageLink.utils";

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
        renderItem={(item) => (
          <CollectionCard image={getImageLink(item.image)} name={item.name} />
        )}
      />
    </div>
  );
}

const CollectionCard = ({
  image,
  count,
  name,
}: {
  image: string;
  name: string;
  count?: number;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        src={image}
        alt={image || "image"}
        draggable={false}
        className="h-72 w-full object-cover"
      />
      <h5 className="text-3xl text-(--color-title) font-medium mt-6 mb-2">
        {name}
      </h5>
      <p className="text-(--color-desc) text-xl">{count} items</p>
    </div>
  );
};
