import { useState } from "react";
import BaseTable from "@/components/common/table/BaseTable";
import { IProduct } from "@/interfaces/product/product.interface";
import { getProductColumn } from "./column";
import AddProductModal from "../modal/AddProductModal";
import useEditCollection from "../hook/useEditProduct";
import EditProductModal from "../modal/EditProductModal";
import { useDeleteProduct } from "../hook/useDeleteProduct";
import BaseConfirmAlert from "@/components/common/alert/BaseConfirmAlert";

export default function ProductTable({
  items,
  totalItems,
}: {
  items: IProduct[];
  totalItems: number;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { editModalOpen, editItem, handleOpenEdit, handleCloseEdit } =
    useEditCollection();

  const {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  } = useDeleteProduct();

  const columns = getProductColumn({
    onEditProduct: handleOpenEdit,
    onRestoreProduct: () => console.log("Edit"),
    onDeleteProduct: handleOpenDeleteModal,
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

      <EditProductModal
        open={editModalOpen}
        onClose={handleCloseEdit}
        item={editItem as any}
      />

      <BaseConfirmAlert
        open={deleteModalOpen}
        onOpenChange={handleCloseDeleteModal}
        onConfirm={executeDelete}
      />
    </div>
  );
}
