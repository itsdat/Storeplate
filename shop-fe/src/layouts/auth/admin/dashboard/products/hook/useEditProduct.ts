import { IProduct } from "@/interfaces/product/product.interface";
import { useState } from "react";

export default function useEditCollection() {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IProduct | null>(null);

  const handleOpenEdit = (item: IProduct) => {
    setEditItem(item), setEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setEditItem(null), setEditModalOpen(false);
  };

  return {
    editModalOpen,
    editItem,
    handleOpenEdit,
    handleCloseEdit,
  };
}
