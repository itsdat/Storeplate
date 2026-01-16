import BaseTable from "@/components/common/table/BaseTable";
import { getCartColumn } from "./column";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart.utils";
import { ICart } from "@/interfaces/cart/cart.interface";
import { CartEmptyIcon } from "@/components/common/icons/BaseIcon";

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
  const columns = getCartColumn({
    onSetCart: (items) => setData(items),
    onSelected: (id: string) => {
      setSelected(
        (prev) =>
          prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]
      );
    },
  });

  useEffect(() => {
    function initalItem() {
      const res = getCart();
      setData(res);
    }
    initalItem();
  }, []);

  console.log("selected", selected);

  return (
    <div>
      <BaseTable
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
        header={!data}
      />
    </div>
  );
}
