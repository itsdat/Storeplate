"use client";
import BaseCarousel from "@/components/common/carousel/BaseCarousel";
import { IBanner } from "@/interfaces/banner/banner.interface";
import Image from "next/image";
import Link from "next/link";

const banners: IBanner[] = [
  {
    id: "1",
    title: "Styles Accessories & New Table Lamp",
    subtitle: "Work light, LED, white",
    image:
      "https://cdn.shopify.com/s/files/1/0631/6815/1720/files/Group1000005037.png?v=1700127846",
    ctaLink: "/product/1",
    createdAt: "2025-01-01T08:00:00Z",
    updatedAt: "2025-01-01T08:00:00Z",
  },
  {
    id: "2",
    title: "Modern Chair & Minimal Design",
    subtitle: "Comfortable, wood, premium",
    image:
      "https://cdn.shopify.com/s/files/1/0631/6815/1720/files/11062497_48473_Converted_3.png?v=1700127894",
    ctaLink: "/product/2",
    createdAt: "2025-01-02T08:00:00Z",
    updatedAt: "2025-01-02T08:00:00Z",
  },
  {
    id: "3",
    title: "New Arrival Office Desk",
    subtitle: "Natural wood, modern style",
    image:
      "https://cdn.shopify.com/s/files/1/0631/6815/1720/files/11062497_48473_Converted_5.png?v=1700127953",
    ctaLink: "/product/3",
    createdAt: "2025-01-03T08:00:00Z",
    updatedAt: "2025-01-03T08:00:00Z",
  },
  {
    id: "4",
    title: "Minimal Sofa Collection",
    subtitle: "Soft fabric, neutral color",
    image:
      "https://cdn.shopify.com/s/files/1/0631/6815/1720/files/11062497_48473_Converted_5_1.png?v=1700128020",
    ctaLink: "/product/4",
    createdAt: "2025-01-04T08:00:00Z",
    updatedAt: "2025-01-04T08:00:00Z",
  },
];

export default function BannerSectionLayout() {
  return (
    <div className="w-full max-w-7xl mx-auto h-auto">
      <BaseCarousel<IBanner>
        arrow={false}
        slides={banners}
        slidesPerView={1}
        slidesPerGroup={1}
        autoPlay={false}
        renderItem={(item) => <BannerCard key={item.id} item={item} />}
      />
    </div>
  );
}

const BannerCard = ({ item }: { item: IBanner }) => {
  return (
    <div className="w-full rounded-md bg-(--color-foreground) flex items-center justify-between lg:h-140 md:pb-0 pb-10">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <span className="text-(--color-desc) md:text-xl text-sm font-semibold text-center">
          {item.subtitle}
        </span>
        <h5 className="text-(--color-title) lg:text-5xl text-xl font-semibold text-center lg:leading-14 w-full md:max-w-[80%] md:my-5">
          {item.title}
        </h5>
        <Link
          href={item.ctaLink ?? ""}
          className="w-fit md:mt-5 mt-2 mx-auto md:px-10 px-3 md:py-4 py-1.5 bg-(--color-title) text-(--color-background) rounded-xs md:text-xl text-xs font-semibold"
        >
          {item.ctaText ?? "Shop Now"}
        </Link>
      </div>
      <div className="w-1/2 md:p-10">
        <Image
          draggable={false}
          src={item.image}
          alt={item.image || "imgae"}
          width={10000}
          height={10000}
          priority
        />
      </div>
    </div>
  );
};
