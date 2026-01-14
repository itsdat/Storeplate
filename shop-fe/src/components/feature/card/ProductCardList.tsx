import { useToast } from "@/hooks/others/useToast.hook";
import { ICart } from "@/interfaces/cart/cart.interface";
import { IProduct } from "@/interfaces/product/product.interface";
import { addToCart } from "@/utils/cart.utils";
import { getImageLink } from "@/utils/getImageLink.utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardList({ item }: { item: IProduct }) {
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
  const checkStock = item.variants.every((i) => i.stock === 0);

  return (
    <div className="w-full">
      <div className="w-full flex items-start justify-start gap-5">
        <div className="w-1/3">
          <img
            src={getImageLink(item.variants[0].images[0])}
            alt="image"
            className="object-cover w-full h-64 rounded-sm border border-(--color-foreground)"
          />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-start gap-5">
          <div className="flex flex-col items-start justify-start gap-1 w-full">
            <Link href={`product/${item.slug}`} className="text-3xl">
              {item.name}
            </Link>
            <div className="flex items-start text-(--color-desc) justify-start gap-3">
              <span className="text-xl font-semibold">
                £
                {(item.variants?.[0]?.price ?? 0) -
                  (item.variants?.[0]?.discount ?? 0)}
              </span>
              <small className="text-lg line-through">
                £{item.variants?.[0]?.price ?? 0}
              </small>
            </div>
          </div>

          <p className="text-(--color-desc) line-clamp-4">{item.description}</p>

          <button
            onClick={() => {
              handleAddToCart({
                id: item.variants[0].id,
                name: item.name,
                price: item.variants[0].price,
                quantity: 1,
                thumbnail: item.variants[0].images[0],
                size: { label: "Size M", value: "m" },
              });
            }}
            className={`px-5 py-2 bg-(--color-text-btn) text-(--color-btn) border border-(--color-btn) hover:bg-(--color-btn) hover:text-(--color-text-btn) transition-all duration-300 font-bold rounded-sm ${
              checkStock ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {checkStock === true ? "Out Of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
