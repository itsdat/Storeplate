import BaseTable from "@/components/common/table/BaseTable";
import { getCollectionColumn } from "./column";
import { useState } from "react";
import { ICollection } from "@/interfaces/collection/collection.interface";
import AddCollectionModal from "../modal/AddCollectionModal";
import { useDeleteCollection } from "../hook/useDeleteCollection";
import BaseConfirmAlert from "@/components/common/alert/BaseConfirmAlert";
import { useRestoreCollection } from "../hook/useRestoreCollection";

export default function CollectionTable({
  items,
  totalItems,
}: {
  items: ICollection[];
  totalItems: number;
}) {
  const {
    deleteModalOpen,
    deleteItem,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    executeDelete,
  } = useDeleteCollection();

  const {
    restoreModalOpen,
    restoreItem,
    handleOpenRestoreModal,
    handleCloseRestoreModal,
    executeRestore,
  } = useRestoreCollection();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const columns = getCollectionColumn({
    onEditCollection: () => console.log("Edit"),
    onRestoreCollection: handleOpenRestoreModal,
    onDeleteCollection: handleOpenDeleteModal,
  });
  return (
    <div>
      <BaseTable
        data={items}
        columns={columns}
        showIndex={false}
        onBtnAction={() => setOpenModal(true)}
      />

      <AddCollectionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <BaseConfirmAlert
        open={deleteModalOpen}
        onOpenChange={handleCloseDeleteModal}
        onConfirm={executeDelete}
      />

      <BaseConfirmAlert
        open={restoreModalOpen}
        onOpenChange={handleCloseRestoreModal}
        onConfirm={executeRestore}
      />
    </div>
  );
}
