import { ProductApis } from '@/apis';
import { useToast } from '@/hooks/others/useToast.hook';
import { IProduct } from '@/interfaces/product/product.interface';
import { useState } from 'react';

export function useDeleteProduct() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<IProduct | null>(null);
  const {toastSuccess, toastError} = useToast()

  const handleOpenDeleteModal = (item: IProduct) => {
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
        const res = await ProductApis.remove(deleteItem.id);
        toastSuccess("Success", res.message)
        handleCloseDeleteModal()
    } catch (error: any) {
        toastError("Fail", error.message)
        console.log("Delete Error", error)
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
