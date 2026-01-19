import BaseTable from "@/components/common/table/BaseTable";
import { getCartColumn } from "./column";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  updateCartSize,
} from "@/utils/cart.utils";
import { ICart } from "@/interfaces/cart/cart.interface";
import { CartEmptyIcon } from "@/components/common/icons/BaseIcon";
import { useSession } from "@/context/SessionProvider";
import { CartApis } from "@/apis";
import { IProductOption } from "@/interfaces/product/product.interface";
import { useCheckoutStore } from "@/stores/checkout.store";

export default function CartsTable({
  items,
  total,
}: {
  items?: ICart[];
  total?: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<ICart[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const user = useSession();
  const { setItems } = useCheckoutStore();

  const handleSubtractionCart = async (item: ICart) => {
    if (!user) {
      const newCart = updateCartQuantity(
        item.productId,
        item.quantity - 1,
        item.size.value,
      );
      setData(newCart);
      return;
    }

    if (item.quantity === 1) {
      const res = await CartApis.remove(item.id!);
      setData(res.data);
      return;
    }
    await CartApis.create({
      ...item,
      quantity: -1,
    });

    const res = await CartApis.findOneById();
    setData(res.data);
  };

  const handleAddCart = async (item: ICart) => {
    if (!user) {
      const newCart = updateCartQuantity(
        item.productId,
        item.quantity + 1,
        item.size.value,
      );
      setData(newCart);
      return;
    }

    await CartApis.create({
      ...item,
      quantity: +1,
    });

    const res = await CartApis.findOneById();
    setData(res.data);
  };

  const handleRemoveProductFromCart = async (item: ICart) => {
    if (!user) {
      const newCart = removeFromCart(item.productId, item.size.value);
      setData(newCart);
      return;
    }
    await CartApis.remove(item.id ?? "");
    const res = await CartApis.findOneById();
    setData(res.data);
  };

  const handleUpdateSize = async (item: ICart, newSize: IProductOption) => {
    if (!user) {
      const newCart = updateCartSize(item.productId ?? "", item.size, newSize);
      setData(newCart);
      return;
    }
    const res = await CartApis.update(item.id ?? "", {
      ...item,
      size: newSize,
    });
    setData(res.data);
  };

  const columns = getCartColumn({
    data: items || data,
    selected,
    onSetCart: (items) => setData(items),

    onSelected: (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    },

    onSelectAll: (checked: boolean) => {
      setSelected(
        checked ? (items || data).map((i) => i.id! ?? i.variantId) : [],
      );
    },

    onAddCart: handleAddCart,
    onSubtractionCart: handleSubtractionCart,
    onRemoveCart: handleRemoveProductFromCart,
    onUpdateSize: handleUpdateSize,
  });

  useEffect(() => {
    function initalItem() {
      const res = getCart();
      setData(res);
    }
    initalItem();
  }, []);

  return (
    <div>
      <BaseTable
        height="max-h-[50vh]! overflow-y-scroll"
        showIndex={false}
        columns={columns}
        data={items || data}
        onBtnAction={() => router.push("/products")}
        textBtn="Continue Shopping"
        empty={{
          icon: <CartEmptyIcon />,
          title: "Oops. Your Bag Is Empty.",
          btnText: "Don't Miss Out: Add Product",
          onBtn: () => router.push("/products"),
        }}
        header={(items?.length ?? 0) > 0 || (data?.length ?? 0) > 0}
      />

      <div>
        {selected.length > 0 && (
          <button
            onClick={() => {
              const checkoutItems = (items || data).filter((item) =>
                selected.includes(item.id ?? item.variantId!),
              );
              setItems(checkoutItems);
              router.push("/checkout");
            }}
            type="button"
            className="w-full max-w-48 mx-auto py-2 text-sm flex items-center justify-center rounded-sm text-(--color-text-btn) bg-(--color-btn) mb-0.5 cursor-pointer"
          >
            Proceed to Checkout ({selected.length})
          </button>
        )}
      </div>
    </div>
  );
}
