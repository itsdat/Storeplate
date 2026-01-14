import BaseModal from "@/components/common/modal/BaseModal";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { ICollection } from "@/interfaces/collection/collection.interface";
import CollectionFormLayout from "../form/CollectionFormLayout";
import { SubmitHandler } from "react-hook-form";
import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import { CollectionApis } from "@/apis";
import { useToast } from "@/hooks/others/useToast.hook";

export default function AddCollectionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rhf = useSimRhf<ICollection>({
    defaultValues: {
      name: "",
      image: "",
    },
  });
  const { handleSubmit, reset } = rhf;
  const { toastError, toastSuccess } = useToast();

  const onSubmit: SubmitHandler<ICollection> = async (data) => {
    try {
      const res = await CollectionApis.create(data);
      if (res.statusCode === 201) {
        toastSuccess("Success", res.message);
        reset();
        onClose();
      }
    } catch (error: any) {
      toastError("Error", error.message);
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Create new collection"
      description="This action cannot be undone. This will permanently delete your account
        and remove your data from our servers."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CollectionFormLayout rhf={rhf} />
        <BaseGroupButton submitText="Create" onCancel={onClose} />
      </form>
    </BaseModal>
  );
}
