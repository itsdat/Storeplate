import BaseTag from "@/components/common/tags/BaseTag";
import { STATUS_COLORS } from "@/constants/status-color.constant";
import { IAddress } from "@/interfaces/address/address.interface";
import { Pencil, Trash2 } from "lucide-react";

export default function AddressCard({ item }: { item: IAddress }) {
  return (
    <div
      key={item.id}
      className="border py-3 px-4 rounded-xs hover:shadow-md transition"
    >
      {item.isDefault && (
        <div className="flex items-center justify-end w-full">
          <BaseTag color={STATUS_COLORS.DEFAULT}>Default</BaseTag>
        </div>
      )}
      <p className="text-sm text-(--color-title) font-medium">{item.street}</p>
      <p className="text-(--color-text) text-sm">
        {item.wards}, {item.district}, {item.city}
      </p>
      <div className="flex items-center justify-end gap-3 w-full">
        <button className="text-(--color-text) p-1 cursor-pointer">
          <Pencil strokeWidth={1.5} size={16} />
        </button>
        <button className="text-red-500 p-1 cursor-pointer">
          <Trash2 strokeWidth={1.5} size={18} />
        </button>
      </div>
    </div>
  );
}
