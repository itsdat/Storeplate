import { CartApis } from "@/apis";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/others/useToast.hook";
import { ICart } from "@/interfaces/cart/cart.interface";
import { IProduct } from "@/interfaces/product/product.interface";
import { addToCart } from "@/utils/cart.utils";
import { getImageLink } from "@/utils/getImageLink.utils";
import Link from "next/link";

export default function ProductCardList({ item }: { item: IProduct }) {
  const { toastAddToCart, toastError, toastWarning } = useToast();
  const {user} = useAuth()
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
    <div className="w-full">
      <div className="w-full flex items-start justify-start gap-5">
        <div className="w-1/3">
          <img
            src={getImageLink(item.variants[0].images[0])}
            alt="image"
            className="object-cover w-full md:h-64  rounded-sm border border-(--color-foreground)"
          />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-start md:gap-5 gap-3">
          <div className="flex flex-col items-start justify-start gap-1 w-full">
            <Link href={`product/${item.slug}`} className="md:text-3xl text-2xl line-clamp-1 md:line-clamp-2">
              {item.name}
            </Link>
            <div className="w-full flex items-start text-(--color-desc) justify-start gap-3">
              <span className="text-xl font-semibold">
                €
                {(item.variants?.[0]?.price ?? 0) -
                  (item.variants?.[0]?.discount ?? 0)}
              </span>
              {item.variants[0].discount && (
                <small className="text-lg line-through">
                  €{item.variants?.[0]?.price ?? 0}
                </small>
              )}
            </div>
          </div>

          {/* <div
            className="prose bg-white p-3 text-(--color-desc) line-clamp-3"
            dangerouslySetInnerHTML={{ __html: item.description }}
          /> */}
          <p className="text-(--color-desc) md:line-clamp-3 line-clamp-1 w-full hidden">{item.description}</p>

          <button
            onClick={() => {
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
            className={`md:px-5 px-3 md:py-1.5 py-1 bg-(--color-text-btn) text-(--color-btn) border border-(--color-btn) hover:bg-(--color-btn) hover:text-(--color-text-btn) transition-all duration-300 font-bold rounded-sm ${
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
