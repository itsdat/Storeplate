import { CartApis } from "@/apis";
import { CartEmptyIcon } from "@/components/common/icons/BaseIcon";
import BasePopover from "@/components/common/popover/BasePopover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/context/SessionProvider";
import { ICart } from "@/interfaces/cart/cart.interface";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cart.utils";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function UserCart({
  trigger,
  open,
  onSetCount,
}: {
  trigger: ReactNode;
  open: boolean;
  onSetCount: (count: number) => void;
}) {
  const [carts, setCarts] = useState<ICart[]>([]);
  const router = useRouter();
  const user = useSession();

  useEffect(() => {
    if (!open) return;

    async function fetchCart() {
      if (!user?.userId) {
        setCarts(getCart());
        return;
      }

      const res = await CartApis.findOneById();
      setCarts(res.data);
    }

    fetchCart();
  }, [open, user?.userId]);

  useEffect(() => {
    onSetCount(carts?.length ?? 0);
  }, [carts, onSetCount]);

  const handleSubtractionCart = async (item: ICart) => {
    if (!user) {
      const newCart = updateCartQuantity(
        item.id ?? '',
        item.quantity - 1,
        item.size.value
      );
      setCarts(newCart);
      return;
    }

    await CartApis.create({
      ...item,
      quantity: -1,
    });

    const res = await CartApis.findOneById();
    setCarts(res.data);
  };

  const handleAddCart = async (item: ICart) => {
    if (!user) {
      const newCart = updateCartQuantity(
        item.id ?? '',
        item.quantity + 1,
        item.size.value
      );
      setCarts(newCart);
      return;
    }

    await CartApis.create({
      ...item,
      quantity: +1,
    });

    const res = await CartApis.findOneById();
    setCarts(res.data);
  };

  const handleRemoveProductFromCart = async (item: ICart) => {
    if (!user) {
      const newCart = removeFromCart(item.id ?? '', item.size.value);
      setCarts(newCart);
    }
    await CartApis.remove(item.id ?? '');
    const res = await CartApis.findOneById();
    setCarts(res.data);
  };

  return (
    <BasePopover align="center" trigger={trigger}>
      {!carts ? (
        <Spinner />
      ) : carts.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <CartEmptyIcon />
          <h5 className="text-lg text-(--color-text)">
            Oops. Your Bag Is Empty.
          </h5>
          <Link
            href={"/products"}
            className="w-full py-2.5 bg-(--color-btn) text-(--color-text-btn) mt-5 rounded-sm cursor-pointer text-center"
          >
            Don't Miss Out: Add Product
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <ScrollArea>
            <div className="w-full flex flex-col gap-3 pr-7 max-h-60">
              {carts &&
                carts.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-start justify-start gap-2">
                      <img
                        src={getImageLink(item.thumbnail)}
                        alt="image"
                        className="w-12 h-12 aspect-square rounded-[3px]"
                      />

                      <div className="flex flex-col">
                        <p
                          className="text-(--color-title) group-hover:underline cursor-pointer line-clamp-1 max-w-52"
                          onClick={() => router.push(`/product/${item.slug}`)}
                        >
                          {item.name}
                        </p>
                        <span className="text-[12px] text-(--color-desc)">
                          {item.size.label} - £{item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2 transition-all duration-300 group-hover:translate-x-3 translate-x-10">
                      <div className="flex flex-1 items-center justify-end gap-3">
                        <p className="text-(--color-text)">
                          £{item.price * item.quantity}
                        </p>

                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleSubtractionCart(item)}
                            className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
                          >
                            <Minus strokeWidth={1.5} size={15} />
                          </button>
                          <div className="w-7 h-7 aspect-square flex items-center justify-center bg-(--color-foreground) border border-(--color-foreground)">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => handleAddCart(item)}
                            className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
                          >
                            <Plus strokeWidth={1.5} size={15} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer"
                        onClick={() => handleRemoveProductFromCart(item)}
                      >
                        <Trash2
                          color="var(--color-red-500)"
                          strokeWidth={1.5}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
          <button
            onClick={() => router.push("/carts")}
            className="w-full mt-3 py-2 bg-(--color-btn) text-(--color-text-btn) rounded-sm text-sm cursor-pointer text-center"
          >
            View All Cart
          </button>
        </div>
      )}
    </BasePopover>
  );
}
