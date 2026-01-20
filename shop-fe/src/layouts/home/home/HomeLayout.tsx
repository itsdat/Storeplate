"use client";
import { ICollection } from "@/interfaces/collection/collection.interface";
import BannerSectionLayout from "./sections/banners/BannerSectionLayout";
import CollectionsSectionLayout from "./sections/collections/CollectionsSectionLayout";
import DealOfTheWeekSectionLayout from "./sections/deals/DealOfTheWeekSectionLayout";
import FeatureSectionLayout from "./sections/features/FeatureSectionLayout";
import { IBanner } from "@/interfaces/banner/banner.interface";
import { IProduct } from "@/interfaces/product/product.interface";

interface HomeResProps {
  items: {
    collections?: {
      data: ICollection[];
      total: number;
    };
    banners?: {
      data: IBanner[];
      total: number;
    };
    products?: {
      data: IProduct[];
      total: number;
    };
  };
}

export default function HomeLayout({ items }: HomeResProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {process.env.NEXT_PUBLIC_BACKEND_URL}
      <BannerSectionLayout />
      <CollectionsSectionLayout
        items={items?.collections?.data!}
        total={items.collections?.total!}
      />
      <FeatureSectionLayout
        items={items?.products?.data!}
        total={items.products?.total!}
      />
      <DealOfTheWeekSectionLayout />
    </div>
  );
}
