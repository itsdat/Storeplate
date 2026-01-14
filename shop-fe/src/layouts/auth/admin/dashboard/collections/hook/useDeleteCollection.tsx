import { CollectionApis } from "@/apis";
import { useToast } from "@/hooks/others/useToast.hook";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { useState } from "react";

export function useDeleteCollection() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<ICollection | null>(null);
  const { toastError, toastSuccess } = useToast();

  const handleOpenDeleteModal = (item: ICollection) => {
    setDeleteItem(item);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteItem(null);
  };

  const executeDelete = async () => {
    if (!deleteItem) return;

    try {
      await CollectionApis.softDelete(deleteItem.id as string);
      toastSuccess("Success", "Collection deleted successfull");
      handleCloseDeleteModal();
    } catch (error) {
      toastError("Error", "Error deleting collection");
      console.log("Delete Error", error);
    }
  };

  return {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  };
}
