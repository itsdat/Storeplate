"use client";
import { ICollection } from "@/interfaces/collection/collection.interface";
import CollectionTable from "./list/CollectionTable";

export default function CollectionsLayout({
  items,
  totalItems,
}: {
  items: ICollection[];
  totalItems: number;
}) {
  return (
    <div className="w-full">
      <CollectionTable items={items} totalItems={totalItems} />
    </div>
  );
}
