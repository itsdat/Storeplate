import { CartApis } from "@/apis";
import { useSession } from "@/context/SessionProvider";
import { useToast } from "@/hooks/others/useToast.hook";
import { ICart } from "@/interfaces/cart/cart.interface";
import { IProduct } from "@/interfaces/product/product.interface";
import { addToCart } from "@/utils/cart.utils";
import { getImageLink } from "@/utils/getImageLink.utils";
import Link from "next/link";

export default function ProductCardGrid({ item }: { item: IProduct }) {
  const { toastAddToCart, toastError, toastWarning } = useToast();
  const user = useSession();
  const handleAddToCart = async (data: ICart) => {
    try {
      if (!user) {
        if (!data.size) {
          toastWarning("size is required", "Please select one size option");
          return;
        }
        addToCart(data);
        toastAddToCart({
          title: `${data.name} added to cart`,
          image: getImageLink(data.thumbnail),
        });
        return;
      }

      await CartApis.create({ ...data });
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
    <div className="w-full" title={item.name}>
      <Link
        href={`product/${item.slug}`}
        className="w-full cursor-pointer group transition-all duration-200 flex flex-col items-center justify-center gap-5"
      >
        <div className="w-full relative">
          <img
            src={getImageLink(item.variants[0].images[0])}
            alt="image"
            className="object-cover w-full h-64 rounded-sm border border-(--color-foreground)"
          />

          <button
            disabled={checkStock}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({
                variantId: item.variants[0].id,
                name: item.name,
                price: item.variants[0].price,
                quantity: 1,
                thumbnail: item.variants[0].images[0],
                size: item.sizes[0],
                slug: item.slug,
                discount: item.variants[0].discount,
                sizes: item.sizes,
                productId: item.id,
              });
            }}
            className={`absolute opacity-0 ease-in-out group-hover:opacity-100 transition-all duration-200  translate-y-0 group-hover:-translate-y-10 bottom-0 left-1/2 -translate-x-1/2 px-5 py-2 bg-(--color-btn) text-(--color-text-btn) font-bold rounded-sm ${
              checkStock ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {checkStock === true ? "Out Of Stock" : "Add To Cart"}
          </button>
        </div>

        <h5 className="font-medium text-xl line-clamp-2">{item.name}</h5>
        <div className="flex items-center justify-center gap-3 -translate-y-3">
          <span className="text-xl font-semibold">
            £
            {(item.variants?.[0]?.price ?? 0) -
              (item.variants?.[0]?.discount ?? 0)}
          </span>
          {item.variants[0].discount && (
            <small className="text-lg text-(--color-desc) line-through">
              £{item.variants?.[0]?.price ?? 0}
            </small>
          )}
        </div>
      </Link>
    </div>
  );
}
