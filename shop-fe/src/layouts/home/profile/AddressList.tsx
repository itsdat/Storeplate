"use client";

import { useEffect, useState } from "react";
import { IAddress } from "@/interfaces/address/address.interface";
import BaseEmpty from "@/components/common/empty/BaseEmpty";
import { getLocationNameByCode } from "@/helpers/location.helper";
import { Trash2 } from "lucide-react";
import BaseTag from "@/components/common/tags/BaseTag";
import { STATUS_COLORS } from "@/constants/status-color.constant";

export default function AddressList({ items }: { items: IAddress[] }) {
  const [wardMap, setWardMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function resolveWards() {
      const results = await Promise.all(
        items.map(async (item) => ({
          id: item.id,
          ward: await getLocationNameByCode(item.wards),
        })),
      );

      const map: Record<string, string> = {};
      results.forEach((r) => {
        map[r.id] = r.ward ?? "";
      });

      setWardMap(map);
    }

    if (items.length) {
      resolveWards();
    }
  }, [items]);

  if (!items.length) return <BaseEmpty />;

  return (
    <div className="grid grid-cols-3 gap-5 mt-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="border py-3 px-4 rounded-xs hover:shadow-md transition"
        >
          {item.isDefault && (
            <div className="flex items-center justify-end w-full">
              <BaseTag color={STATUS_COLORS.DEFAULT}>Default</BaseTag>
            </div>
          )}
          <p className="text-sm text-(--color-title) font-medium">
            {item.street}
          </p>
          <p className="text-(--color-text) text-sm">
            {wardMap[item.id] || "Loading..."}
          </p>
          <div className="flex items-center justify-end w-full">
            <button className="text-red-500 p-1 cursor-pointer">
              <Trash2 strokeWidth={1.5} size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
