import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import BaseModal from "@/components/common/modal/BaseModal";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { IUser } from "@/interfaces/user/user.interface";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

export default function EditProfileModal({
  onClose,
  open,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: IUser;
}) {
  const { control, handleSubmit, reset } = useSimRhf<IUser>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (open && item) {
      function initialItem() {
        reset(item);
      }
      initialItem();
    }
  }, [open, item]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log("====================================");
    console.log("Data", data);
    console.log("====================================");
    onClose()
  };

  return (
    <BaseModal
      width="2xl"
      open={open}
      onClose={onClose}
      title="Edit Profile"
      description="You can update your personal details below. Changes will be saved immediately."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex items-center justify-between gap-3">
            <BaseInputRhf
              control={control}
              name="firstName"
              className="text-[14px]! px-5"
              placeholder="John"
              label="First Name"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
            />
            <BaseInputRhf
              control={control}
              name="lastName"
              className="text-[14px]! px-5"
              placeholder="Doe"
              label="Last Name"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <BaseInputRhf
              control={control}
              name="email"
              className="text-[14px]! px-5"
              placeholder="johndoe@gmail.com"
              label="Email"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
            />
            <BaseInputRhf
              control={control}
              name="phone"
              className="text-[14px]! px-5"
              placeholder="(+1).834.738.264"
              label="Phone Number"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
            />
          </div>
        </div>
        <BaseGroupButton onCancel={onClose} submitText="Update" />
      </form>
    </BaseModal>
  );
}
