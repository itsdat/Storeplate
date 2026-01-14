import { IPopupAction } from "@/components/common/dropdown/BaseDropdown";
import { IProduct } from "@/interfaces/product/product.interface";
import { EditIcon, RefreshCcw, Trash2 } from "lucide-react";

export const getProductAction = ({
  onEditProduct,
  onDeleteProduct,
  record,
  onRestoreProduct,
}: {
  onEditProduct: (item: IProduct) => void;
  onDeleteProduct: (item: IProduct) => void;
  onRestoreProduct: (item: IProduct) => void;
  record: IProduct;
}): IPopupAction[] => [
  {
    label: "Edit",
    icon: (
      <EditIcon
        strokeWidth={1.5}
        className="size-5"
        color="var(--color-text)"
      />
    ),
    onClick: () => onEditProduct(record),
  },
  {
    label: "Restore",
    icon: (
      <RefreshCcw
        strokeWidth={1.5}
        className="size-5"
        color="var(--color-text)"
      />
    ),
    onClick: () => onRestoreProduct(record),
    hidden: record.isActive,
  },
  {
    label: "Detele",
    icon: <Trash2 strokeWidth={1.5} className="size-5" color="#fb2c36" />,
    onClick: () => onDeleteProduct(record),
    danger: true,
    hidden: !record.isActive,
  },
];
