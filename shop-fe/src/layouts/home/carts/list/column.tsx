import { AdvancedColumn } from "@/components/common/table/BaseTable";
import { getImageLink } from "@/utils/getImageLink.utils";
import PreviewImage from "@/components/common/image/image-view/PreviewImage";
import { ICart } from "@/interfaces/cart/cart.interface";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeFromCart, updateCartSize } from "@/utils/cart.utils";
import BaseSelect from "@/components/common/input-select/BaseSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { IProductOption } from "@/interfaces/product/product.interface";

export const getCartColumn = ({
  data,
  selected,
  onSetCart,
  onSelected,
  onSelectAll,
  onAddCart,
  onSubtractionCart,
  onRemoveCart,
  onUpdateSize,
}: {
  data: ICart[];
  selected: string[];
  onSetCart: (items: ICart[]) => void;
  onSelected: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onAddCart: (item: ICart) => void;
  onSubtractionCart: (item: ICart) => void;
  onRemoveCart: (item: ICart) => void;
  onUpdateSize: (item: ICart, newSize: IProductOption) => void;
}): AdvancedColumn<ICart>[] => {
  return [
    {
      label: (
        <Checkbox
          checked={
            selected.length === 0
              ? false
              : selected.length === data.length
              ? true
              : "indeterminate"
          }
          onCheckedChange={(checked) => {
            if (checked === true) {
              onSelectAll(true);
            } else {
              onSelectAll(false);
            }
          }}
          className="cursor-pointer bg-white rounded-[1px]"
        />
      ),
      key: "temp",
      render: (record: ICart) => (
        <Checkbox
          checked={selected.includes(record.id ?? record.variantId ?? "")}
          onCheckedChange={() =>
            onSelected(record.id ?? record.variantId ?? "")
          }
          className="cursor-pointer bg-white rounded-[1px]"
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
          // onSelectOption={(value) => {
          //   const newCart = updateCartSize(
          //     record.productId ?? "",
          //     record.size,
          //     value
          //   );
          //   onSetCart(newCart);
          // }}
          onSelectOption={(value) => {
            onUpdateSize(record, value);
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
            onClick={() => onSubtractionCart(record)}
            className="w-5 h-5 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Minus strokeWidth={1.5} size={15} />
          </button>
          <div className="w-7 h-7 aspect-square flex items-center justify-center bg-(--color-foreground) border border-(--color-foreground)">
            {record.quantity}
          </div>
          <button
            onClick={() => onAddCart(record)}
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
          type="button"
          className="cursor-pointer"
          onClick={() => onRemoveCart(record)}
        >
          <Trash2 strokeWidth={1.5} size={20} color="var(--color-red-500)" />
        </button>
      ),
    },
  ];
};
