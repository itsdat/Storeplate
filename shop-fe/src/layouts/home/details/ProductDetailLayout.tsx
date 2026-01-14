"use client";
import { IProduct } from "@/interfaces/product/product.interface";
import { useState } from "react";
import { MomoIcon } from "@/components/common/icons/BaseIcon";
import { Separator } from "@/components/ui/separator";
import BaseCarousel from "@/components/common/carousel/BaseCarousel";
import BaseTab from "@/components/common/tab/BaseTab";
import { getImageLink } from "@/utils/getImageLink.utils";
import { ICart } from "@/interfaces/cart/cart.interface";
import { addToCart } from "@/utils/cart.utils";
import { useToast } from "@/hooks/others/useToast.hook";

export default function ProductDetailLayout({ item }: { item: IProduct }) {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [viewImage, setViewImage] = useState<number>(0);
  const { toastAddToCart, toastError } = useToast();

  const handleAddToCart = (data: ICart) => {
    try {
      addToCart(data);
      toastAddToCart({
        title: `${data.name} added to cart`,
        image: getImageLink(data.thumbnail),
      });
    } catch (error) {
      toastError("Error", "Can't add product");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-10">
        <div className="w-1/2">
          <BaseCarousel
            slides={item.variants[variantIndex].images}
            slidesPerView={1}
            slidesPerGroup={1}
            autoPlay={false}
            gap={20}
            dot={false}
            renderItem={(item) => (
              <>
                <img
                  src={getImageLink(item)}
                  alt={item || "image"}
                  draggable={false}
                  className="w-full aspect-square object-cover translate-x-2.5 rounded-sm"
                />
              </>
            )}
            activeIndex={viewImage}
          />

          <div className="flex items-start justify-start gap-4 mt-4">
            {item.variants[variantIndex].images.map((img, index) => (
              <img
                key={index}
                src={getImageLink(img)}
                alt={img || "image"}
                draggable={false}
                className={`w-20 aspect-square border-2 transition-all duration-300 object-cover translate-x-2.5 rounded-sm cursor-pointer ${
                  viewImage === index
                    ? "border-(--color-btn)"
                    : "border-transparent"
                }`}
                onClick={() => setViewImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-start gap-7">
          <h5 className="text-3xl font-semibold">{item.name}</h5>

          <div className="flex items-start justify-center gap-3 -translate-y-3">
            <span className="text-3xl text-(--color-desc) font-semibold">
              £
              {(item.variants?.[variantIndex]?.price ?? 0) -
                (item.variants?.[variantIndex]?.discount ?? 0)}
            </span>
            <small className="text-lg text-(--color-desc) line-through">
              £{item.variants?.[variantIndex]?.price ?? 0}
            </small>
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <h5 className="text-2xl text-(--color-title) font-semibold">
              Color
            </h5>
            <div className="flex items-start justify-start gap-3">
              {item.variants.map((v, index) => (
                <img
                  key={index}
                  src={getImageLink(v.images[0])}
                  alt="image"
                  className={`object-cover w-12 border-2 transition-all ring-2 ring-white duration-300 aspect-square rounded-sm cursor-pointer ${
                    variantIndex === index ? "border-2 border-black" : ""
                  }`}
                  onClick={() => {
                    setVariantIndex(index), setViewImage(0);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <h5 className="text-2xl text-(--color-title) font-semibold">
              Size
            </h5>
          </div>

          <div className="flex flex-col items-start justify-start gap-4">
            <button
              onClick={() =>
                handleAddToCart({
                  id: item.variants[variantIndex].id,
                  name: item.name,
                  price: item.variants[variantIndex].price,
                  quantity: 1,
                  thumbnail: item.variants[variantIndex].images[0],
                  size: { label: "Size M", value: "m" },
                })
              }
              className={`cursor-pointer px-5 py-2.5 bg-(--color-btn) text-(--color-text-btn) font-semibold rounded-sm`}
            >
              Add To Cart
            </button>

            <div className="w-full rounded-sm bg-(--color-foreground) px-2 py-1.5 text-(--color-text)">
              {item.deliveryInfo || "Est. Delivery between 4 - 6 days"}
            </div>
          </div>

          <div className="flex items-start justify-start gap-2">
            <h5 className="text-2xl text-(--color-title) font-semibold">
              Payment:
            </h5>
            <div className="bg-(--color-foreground) p-1 rounded-sm">
              <MomoIcon />
            </div>
          </div>

          <Separator className="text-(--color-dark-light)" />

          <div className="flex flex-col items-start justify-start gap-2">
            <h5 className="text-2xl text-(--color-title) font-semibold">
              Share:
            </h5>
          </div>

          <div className="flex items-start justify-start gap-2">
            <h5 className="text-2xl text-(--color-title) font-semibold">
              Tags:
            </h5>
            <div className="flex items-start justify-start flex-wrap gap-2">
              {item.tags?.map((tag, index) => (
                <div
                  className="border border-(--color-foreground) px-2 py-1.5 rounded-sm text-(--color-desc)"
                  key={index}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 mb-20">
        <BaseTab
          items={[
            {
              label: "Description",
              value: "desc",
              content: `${item.description}`,
            },
            {
              label: "More Info",
              value: "more",
              content: `${item.moreInfo}`,
            },
          ]}
        />
      </div>
    </div>
  );
}
