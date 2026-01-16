import BaseModal from "@/components/common/modal/BaseModal";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IProduct } from "@/interfaces/product/product.interface";
import { SubmitHandler } from "react-hook-form";
import ProductFormLayout from "../form/ProductFormLayout";
import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import { useEffect } from "react";
import { ProductApis } from "@/apis";
import { v4 as uuid } from "uuid";

export default function EditProductModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: IProduct;
}) {
  const rhf = useSimRhf<IProduct>({
    defaultValues: {
      moreInfo: "",
      variants: [
        {
          id: uuid(),
          stock: 0,
          price: 0,
          images: [],
          size: { label: "M", value: "m" },
        },
      ],
      sizes: [
        {
          // id: uuid(),
          label: "",
          value: "",
        },
      ],
    },
  });

  const { handleSubmit, reset, getValues } = rhf;
  const { toastError, toastSuccess } = useToast();

  useEffect(() => {
    if (open && item) {
      reset({
        ...item,
        collectionId: item.collectionId ?? item.collection?.id ?? "",
      });
    }
  }, [open, item, reset]);

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log("data", data);
    try {
      const res = await ProductApis.update(item.id, data);
      if (res.statusCode === 200) {
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
      width="4xl"
      open={open}
      onClose={onClose}
      title="Edit product"
      description="This action cannot be undone. This will permanently delete your account
            and remove your data from our servers."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[60vh] overflow-y-auto px-1"
      >
        <ProductFormLayout rhf={rhf} />
        <BaseGroupButton submitText="Update" onCancel={onClose} />
      </form>
    </BaseModal>
  );
}
