import { CartEmptyIcon } from "@/components/common/icons/BaseIcon";
import BasePopover from "@/components/common/popover/BasePopover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICart } from "@/interfaces/cart/cart.interface";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cart.utils";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
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
  const [carts, setCarts] = useState<ICart[]>();

  useEffect(() => {
    async function fetchCartLocal() {
      const res = getCart();
      setCarts(res);
    }
    fetchCartLocal();
  }, []);

  useEffect(() => {
    if (!open) return;

    const res = getCart();
    setCarts(res);
  }, [open]);

  useEffect(() => {
    onSetCount(carts?.length ?? 0);
  }, [carts, onSetCount]);

  return (
    <BasePopover align="center" trigger={trigger}>
      {!carts || carts.length === 0 ? (
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
        <ScrollArea className="max-h-60">
          <div className="w-full flex flex-col gap-3 pr-3">
            {carts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between group transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-start gap-2">
                  <img
                    src={getImageLink(item.thumbnail)}
                    alt="image"
                    className="w-12 h-12 aspect-square rounded-[3px]"
                  />

                  <div className="flex flex-col">
                    <p className="text-(--color-title)">{item.name}</p>
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
                        onClick={() => {
                          const newCart = updateCartQuantity(
                            item.id,
                            item.quantity - 1
                          );
                          setCarts(newCart);
                        }}
                        className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
                      >
                        <Minus strokeWidth={1.5} size={15} />
                      </button>
                      <div className="w-7 h-7 aspect-square flex items-center justify-center bg-(--color-foreground) border border-(--color-foreground)">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => {
                          const newCart = updateCartQuantity(
                            item.id,
                            item.quantity + 1
                          );
                          setCarts(newCart);
                        }}
                        className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
                      >
                        <Plus strokeWidth={1.5} size={15} />
                      </button>
                    </div>
                  </div>

                  <div
                    className="opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      const newCart = removeFromCart(item.id);
                      setCarts(newCart);
                    }}
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
      )}
    </BasePopover>
  );
}
