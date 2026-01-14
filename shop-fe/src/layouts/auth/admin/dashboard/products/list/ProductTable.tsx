import { useState } from "react";
import BaseTable from "@/components/common/table/BaseTable";
import { IProduct } from "@/interfaces/product/product.interface";
import { getProductColumn } from "./column";
import AddProductModal from "../modal/AddProductModal";

export default function ProductTable({
  items,
  totalItems,
}: {
  items: IProduct[];
  totalItems: number;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const columns = getProductColumn({
    onEditProduct: () => console.log("Edit"),
    onRestoreProduct: () => console.log("Edit"),
    onDeleteProduct: () => console.log("Edit"),
  });
  return (
    <div>
      <BaseTable
        data={items}
        columns={columns}
        showIndex={false}
        onBtnAction={() => setOpenModal(true)}
      />

      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
