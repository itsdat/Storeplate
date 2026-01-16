import { AdvancedColumn } from "@/components/common/table/BaseTable";
import { getImageLink } from "@/utils/getImageLink.utils";
import PreviewImage from "@/components/common/image/image-view/PreviewImage";
import { ICart } from "@/interfaces/cart/cart.interface";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  removeFromCart,
  updateCartQuantity,
  updateCartSize,
} from "@/utils/cart.utils";
import BaseSelect from "@/components/common/input-select/BaseSelect";
import { Checkbox } from "@/components/ui/checkbox";

export const getCartColumn = ({
  onSetCart,
  onSelected,
}: {
  onSetCart: (items: ICart[]) => void;
  onSelected: (items: string) => void;
}): AdvancedColumn<ICart>[] => {
  return [
    {
      label: (
        <Checkbox
          id="terms"
          className="cursor-pointer bg-white rounded-[1px] border-(--color-border) data-[state=checked]:bg-(--color-btn) data-[state=checked]:text-(--color-text-btn) data-[state=checked]:border-(--color-border)"
        />
      ),
      key: "temp",
      render: (record: ICart) => (
        <Checkbox
          onClick={() => onSelected(record?.id as any)}
          id="terms"
          className="cursor-pointer bg-white rounded-[1px] border-(--color-border) data-[state=checked]:bg-(--color-btn) data-[state=checked]:text-(--color-text-btn) data-[state=checked]:border-(--color-border)"
        />
      ),
    },
    {
      label: "Image",
      key: "thumbnail",
      render: (record: ICart) => (
        <PreviewImage url={getImageLink(record.thumbnail)} classname="w-10" />
      ),
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Size",
      key: "size",
      render: (record: ICart) => (
        <BaseSelect
          options={record.sizes}
          value={record.size.value}
          onSelectOption={(value) => {
            const newCart = updateCartSize(record.id ?? "", record.size, value);
            onSetCart(newCart);
          }}
        />
      ),
    },
    {
      label: "Price",
      key: "price",
      render: (record: ICart) => (
        <div className="flex items-center justify-start gap-1">
          <p className="text-red-500 font-medium">
            £{record.price * record.quantity}
          </p>
          <p className="line-through text-(--color-desc) text-xs">
            £{record.discount}
          </p>
        </div>
      ),
    },
    {
      label: "Quantity",
      key: "quantity",
      render: (record: ICart) => (
        <div className="flex items-center justify-start gap-1">
          <button
            onClick={() => {
              const newCart = updateCartQuantity(
                record.id ?? "",
                record.quantity - 1,
                record.size.value
              );
              onSetCart(newCart);
            }}
            className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Minus strokeWidth={1.5} size={15} />
          </button>
          <div className="w-7 h-7 aspect-square flex items-center justify-center bg-(--color-foreground) border border-(--color-foreground)">
            {record.quantity}
          </div>
          <button
            onClick={() => {
              const newCart = updateCartQuantity(
                record.id ?? "",
                record.quantity + 1,
                record.size.value
              );
              onSetCart(newCart);
            }}
            className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Plus strokeWidth={1.5} size={15} />
          </button>
        </div>
      ),
    },
    {
      label: "Action",
      key: "action",
      render: (record: ICart) => (
        <button
          className="cursor-pointer"
          onClick={() => {
            const newCart = removeFromCart(record.id ?? "", record.size.value);
            onSetCart(newCart);
          }}
        >
          <Trash2 strokeWidth={1.5} size={20} color="var(--color-red-500)" />
        </button>
      ),
    },
  ];
};
