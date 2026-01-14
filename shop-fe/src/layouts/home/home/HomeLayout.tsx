import { ICollection } from "@/interfaces/collection/collection.interface";
import BannerSectionLayout from "./sections/banners/BannerSectionLayout";
import CollectionsSectionLayout from "./sections/collections/CollectionsSectionLayout";
import DealOfTheWeekSectionLayout from "./sections/deals/DealOfTheWeekSectionLayout";
import FeatureSectionLayout from "./sections/features/FeatureSectionLayout";
import { IBanner } from "@/interfaces/banner/banner.interface";

interface HomeResProps {
  items: {
    collections?: {
      data: ICollection[];
      total: number;
    };
    banners?: {
      data: IBanner[];
      totlal: number;
    };
  };
}

export default function HomeLayout({ items }: HomeResProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <BannerSectionLayout />
      <CollectionsSectionLayout
        items={items?.collections?.data!}
        total={items.collections?.total!}
      />
      <FeatureSectionLayout />
      <DealOfTheWeekSectionLayout />
    </div>
  );
}
