import { AddressApi } from "@/apis";
import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import BaseModal from "@/components/common/modal/BaseModal";
import { BaseSwitchRhf } from "@/components/common/switch/BaseSwitchRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IAddress } from "@/interfaces/address/address.interface";
import { SubmitHandler } from "react-hook-form";

export default function AddAddressModal({
  onClose,
  open,
  total,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
}) {
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { control, handleSubmit, reset, watch } = useSimRhf<IAddress>({
    defaultValues: {
      city: "",
      district: "",
      wards: "",
      street: "",
      isDefault: false,
    },
  });

  const onSubmit: SubmitHandler<IAddress> = async (data) => {
    if (total === 3) {
      toastWarning(
        "Warning",
        "You are not allowed to add more than 3 addresses.",
      );
      return;
    }
    try {
      const res = await AddressApi.create(data);
      if (res.statusCode === 201) {
        toastSuccess("Susscess", res.message);
      }
      onClose();
      reset();
    } catch (error: any) {
      toastError("Error", error.message);
    }
  };

  return (
    <BaseModal
      width="2xl"
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Add New Address"
      description="You can update your personal details below. Changes will be saved immediately."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mb-1">
          <div className="grid grid-cols-2 gap-5">
            <BaseInputRhf
              required
              control={control}
              name="city"
              className="text-[14px]! px-5"
              placeholder="City/Province"
              label="City/Province"
              classProps={{
                inputClass:
                  "focus:border-none! border-none! shadow-none! bg-(--color-foreground) rounded-[3px] ring-(--color-btn)! rounded-[3px]! has-[[data-slot=input-group-control]:focus-visible]:ring-[0.5px]! has-[[data-slot=input-group-control]:focus-visible]:shadow-none! has-[[data-slot=input-group-control]:focus-visible]:border-none!",
                lableClass: "text-sm font-normal",
              }}
            />

            <BaseInputRhf
              required
              control={control}
              name="district"
              className="text-[14px]! px-5"
              placeholder="District"
              label="District"
              classProps={{
                inputClass:
                  "focus:border-none! border-none! shadow-none! bg-(--color-foreground) rounded-[3px] ring-(--color-btn)! rounded-[3px]! has-[[data-slot=input-group-control]:focus-visible]:ring-[0.5px]! has-[[data-slot=input-group-control]:focus-visible]:shadow-none! has-[[data-slot=input-group-control]:focus-visible]:border-none!",
                lableClass: "text-sm font-normal",
              }}
            />

            <BaseInputRhf
              required
              control={control}
              name="wards"
              className="text-[14px]! px-5"
              placeholder="Wards"
              label="Wards"
              classProps={{
                inputClass:
                  "focus:border-none! border-none! shadow-none! bg-(--color-foreground) rounded-[3px] ring-(--color-btn)! rounded-[3px]! has-[[data-slot=input-group-control]:focus-visible]:ring-[0.5px]! has-[[data-slot=input-group-control]:focus-visible]:shadow-none! has-[[data-slot=input-group-control]:focus-visible]:border-none!",
                lableClass: "text-sm font-normal",
              }}
            />

            <BaseInputRhf
              required
              control={control}
              name="street"
              className="text-[14px]! px-5"
              placeholder="Street Address"
              label="Street Address"
              classProps={{
                inputClass:
                  "focus:border-none! border-none! shadow-none! bg-(--color-foreground) rounded-[3px] ring-(--color-btn)! rounded-[3px]! has-[[data-slot=input-group-control]:focus-visible]:ring-[0.5px]! has-[[data-slot=input-group-control]:focus-visible]:shadow-none! has-[[data-slot=input-group-control]:focus-visible]:border-none!",
                lableClass: "text-sm font-normal",
              }}
            />
          </div>

          <div className="flex items-end justify-start gap-5">
            <div className="w-1/2">
              <BaseSwitchRhf
                control={control}
                name="isDefault"
                label="Set Default Address"
              />
            </div>
          </div>
        </div>
        <BaseGroupButton
          onCancel={() => {
            onClose();
            reset();
          }}
        />
      </form>
    </BaseModal>
  );
}
