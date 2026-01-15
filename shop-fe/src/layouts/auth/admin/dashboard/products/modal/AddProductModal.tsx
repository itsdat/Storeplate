import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import BaseModal from "@/components/common/modal/BaseModal";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IProduct } from "@/interfaces/product/product.interface";
import { SubmitHandler } from "react-hook-form";
import ProductFormLayout from "../form/ProductFormLayout";
import { v4 as uuid } from "uuid";
import { ProductApis } from "@/apis";

export default function AddProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rhf = useSimRhf<IProduct>({
    defaultValues: {
      name: "",
      description: "",
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
  const { handleSubmit, reset } = rhf;
  const { toastError, toastSuccess } = useToast();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log("data", data);
    
    try {
      const res = await ProductApis.create(data);
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
      width="4xl"
      open={open}
      onClose={onClose}
      title="Create new product"
      description="This action cannot be undone. This will permanently delete your account
          and remove your data from our servers."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[60vh] overflow-y-auto"
      >
        <ProductFormLayout rhf={rhf} />
        <BaseGroupButton submitText="Create" onCancel={onClose} />
      </form>
    </BaseModal>
  );
}
