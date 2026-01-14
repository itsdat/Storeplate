"use client";
import BaseSlider from "@/components/common/slider/BaseSlider";
import { IProduct } from "@/interfaces/product/product.interface";
import { useState } from "react";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { LayoutGrid, List } from "lucide-react";
import ProductsGirdTab from "./tab/grid/ProductsGirdTab";
import ProductsListTab from "./tab/list/ProductsListTab";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DealOfTheWeekSectionLayout from "../home/sections/deals/DealOfTheWeekSectionLayout";

interface ProductsResProps {
  items: {
    collections?: {
      data: ICollection[];
      total: number;
    };
    products?: {
      data: IProduct[];
      total: number;
    };
  };
}

export default function ProductsListLayout({ items }: ProductsResProps) {
  // const [items, setItems] = useState<IProduct[]>(features);
  // const [categories, setCategories] = useState<ICollection[]>(collections);
  const maxPrice = Math.max(
    ...(items.products?.data.flatMap((item) =>
      item.variants.map((variant) => variant.price)
    ) ?? [])
  );
  const minPrice = Math.min(
    ...(items.products?.data.flatMap((item) =>
      item.variants.map((variant) => variant.price)
    ) ?? [])
  );
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [tab, setTab] = useState<"list" | "grid">("grid");

  return (
    <div className="w-full max-w-7xl lg:px-0 md:px-10 px-3 mx-auto">
      <div className="flex items-start justify-between gap-10 w-full mb-20">
        <div className="w-1/4">
          <div>
            <HeadingFilter title="Select Price Range" />
            <BaseSlider
              min={minPrice}
              max={maxPrice}
              onSelectRange={(range) => {
                setRangeValue(range);
                console.log("Price range:", range);
              }}
            />
            <button
              className={`${
                rangeValue[0] > minPrice || rangeValue[1] < maxPrice
                  ? "opacity-100 my-4 py-1.5"
                  : "opacity-0"
              } transition-all duration-300 cursor-pointer w-full bg-(--color-btn) text-(--color-text-btn) text-sm rounded-sm`}
            >
              Submit
            </button>
          </div>

          <div className="mb-5">
            <HeadingFilter title="Product Categories" />
            <div className="flex flex-col gap-2">
              {items.collections?.data.map((item, index) => (
                <div
                  className="cursor-pointer flex items-center justify-between text-(--color-desc)"
                  key={index}
                >
                  <span>{item.name}</span>
                  <span>(5)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <HeadingFilter title="Brands" />
            <div>
              <div className="flex items-center justify-between cursor-pointer">
                <Label
                  htmlFor="terms"
                  className="text-(--color-desc) text-md font-normal cursor-pointer"
                >
                  Accept terms and conditions
                </Label>
                <Checkbox
                  id="terms"
                  className="cursor-pointer rounded-[1px] border-(--color-border) data-[state=checked]:bg-(--color-backdround) data-[state=checked]:text-(--color-desc) data-[state=checked]:border-(--color-border)"
                />
              </div>
            </div>
          </div>

          <div>
            <HeadingFilter title="Tags" />
          </div>
        </div>

        <div className="w-3/4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center justify-start gap-4">
              <p className="text-(--color-title) font-medium">Views</p>
              <div className="flex items-center justify-start gap-2">
                <button
                  onClick={() => setTab("grid")}
                  className={`${
                    tab === "grid"
                      ? "bg-(--color-btn) text-(--color-text-btn)"
                      : "bg-transparent text-(--color-btn)"
                  } transition-all duration-200 cursor-pointer w-8 h-8 border border-(--color-btn) aspect-square flex items-center justify-center rounded-[3px] `}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setTab("list")}
                  className={`${
                    tab === "list"
                      ? "bg-(--color-btn) text-(--color-text-btn)"
                      : "bg-transparent text-(--color-btn)"
                  } transition-all duration-200 cursor-pointer w-8 h-8 border border-(--color-btn) aspect-square flex items-center justify-center rounded-[3px] `}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            {tab === "grid" ? (
              <ProductsGirdTab items={items.products?.data as any} />
            ) : (
              <ProductsListTab items={items.products?.data as any} />
            )}
          </div>
        </div>
      </div>

      <DealOfTheWeekSectionLayout />
    </div>
  );
}

const HeadingFilter = ({ title }: { title: string }) => {
  return (
    <div className="flex items-start flex-col justify-start w-full gap-1 mb-5">
      <h5 className="text-(--color-title) font-semibold text-xl">{title}</h5>
      <div className="border-b w-full border-(--color-border)"></div>
    </div>
  );
};
