import { CollectionApis } from "@/apis";
import { useToast } from "@/hooks/others/useToast.hook";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { useState } from "react";

export function useRestoreCollection() {
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [restoreItem, setRestoreItem] = useState<ICollection | null>(null);
  const { toastError, toastSuccess } = useToast();

  const handleOpenRestoreModal = (item: ICollection) => {
    setRestoreItem(item);
    setRestoreModalOpen(true);
  };

  const handleCloseRestoreModal = () => {
    setRestoreModalOpen(false);
    setRestoreItem(null);
  };

  const executeRestore = async () => {
    if (!restoreItem) return;

    try {
      await CollectionApis.restore(restoreItem.id as string);
      toastSuccess("Success", "Collection restored successfull");
      handleCloseRestoreModal();
    } catch (error) {
      toastError("Error", "Error restore collection");
      console.log("Restore Error", error);
    }
  };

  return {
    restoreModalOpen,
    restoreItem,
    handleOpenRestoreModal,
    handleCloseRestoreModal,
    executeRestore,
  };
}
