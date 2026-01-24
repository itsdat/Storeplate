"use client";
import BaseSlider from "@/components/common/slider/BaseSlider";
import { IProduct } from "@/interfaces/product/product.interface";
import { useEffect, useState } from "react";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { Funnel, FunnelX, LayoutGrid, List } from "lucide-react";
import ProductsGirdTab from "./tab/grid/ProductsGirdTab";
import ProductsListTab from "./tab/list/ProductsListTab";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DealOfTheWeekSectionLayout from "../home/sections/deals/DealOfTheWeekSectionLayout";
import { useRouter, useSearchParams } from "next/navigation";
import BaseEmpty from "@/components/common/empty/BaseEmpty";

interface ProductsResProps {
  items: {
    collections?: {
      data: ICollection[];
      total: number;
    };
    products?: {
      data: IProduct[];
      total: number;
      priceRange: { min: number; max: number };
    };
  };
}

export default function ProductsListLayout({ items }: ProductsResProps) {
  const searchParams = useSearchParams();
  const maxPrice = items.products?.priceRange
    ? Number(items.products?.priceRange.max)
    : 0;
  const minPrice = items.products?.priceRange
    ? Number(items.products?.priceRange.min)
    : 0;
  const queryMin = Number(searchParams.get("minPrice")) || minPrice;
  const queryMax = Number(searchParams.get("maxPrice")) || maxPrice;
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    queryMin,
    queryMax,
  ]);
  const [tab, setTab] = useState<"list" | "grid">("grid");
  const router = useRouter();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // useEffect(() => {
  //   if (rangeValue[0] === minPrice && rangeValue[1] === maxPrice) {
  //     router.push("/products");
  //   }
  // }, [rangeValue]);

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", String(rangeValue[0]));
    params.set("maxPrice", String(rangeValue[1]));

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-7xl lg:px-0 md:px-10 px-5 mx-auto">
      <div className="flex md:flex-row flex-col items-start justify-between gap-5 md:gap-10 w-full md:mb-20">
        <div
          className={`
    w-full md:w-1/4 overflow-hidden
    transition-all duration-300 ease-in-out
    ${
      showFilters
        ? "max-h-125 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
    }
    md:max-h-none
    md:opacity-100
    md:translate-y-0
    md:pointer-events-auto
    md:transition-none
  `}
        >
          <div>
            <HeadingFilter title="Select Price Range" />
            <BaseSlider
              min={minPrice}
              max={maxPrice}
              range={rangeValue}
              onSelectRange={(range) => {
                setRangeValue(range);
              }}
            />
            <button
              onClick={handleSubmit}
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
              <div
                onClick={() => router.push("/products")}
                className="cursor-pointer flex items-center justify-between text-(--color-desc)"
              >
                <span>All Categories</span>
                <span>(5)</span>
              </div>
              {items.collections &&
                items.collections?.data.map((item, index) => (
                  <div
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.set("collectionId", item.id);
                      router.push(`/products?${params.toString()}`);
                    }}
                    className={`cursor-pointer flex items-center justify-between  ${searchParams.get("collectionId") === item.id ? "text-(--color-btn) font-semibold text-shadow-xs" : "text-(--color-desc)"}`}
                    key={index}
                  >
                    <span>{item.name}</span>
                    <span>(5)</span>
                  </div>
                ))}
            </div>
          </div>

          {/* <div className="mb-5">
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
          </div> */}

          <div>
            <HeadingFilter title="Tags" />
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center justify-start gap-4 w-full">
              <p className="text-(--color-title) font-medium hidden md:block">
                Views
              </p>
              <div className="flex items-center justify-between w-full">
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
                <button
                  className="flex items-center justify-center gap-1 px-2 py-1 transition-all duration-200 md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? (
                    <FunnelX className="size-5" strokeWidth={1.5} />
                  ) : (
                    <Funnel className="size-5" strokeWidth={1.5} />
                  )}{" "}
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            {!items.products?.data ? (
              <div>ÌAASFKLDJFKLDJSFLKJDSLKJFLK:DSJLFJLDJFLKDJKFDJL:</div>
            ) : items.products?.data.length === 0 ? (
              <div>
                <BaseEmpty
                  title="No Products"
                  description="No products were found."
                />
              </div>
            ) : tab === "grid" ? (
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
