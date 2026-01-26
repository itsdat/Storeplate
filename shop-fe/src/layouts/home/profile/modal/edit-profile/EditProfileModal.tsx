import { UploadApis, UserApis } from "@/apis";
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import BaseGroupButton from "@/components/common/button/BaseGroupButton";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import BaseModal from "@/components/common/modal/BaseModal";
import { BASE_FOLDER } from "@/constants/folder.constant";
import { useAuth } from "@/context/AuthContext";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IUser } from "@/interfaces/user/user.interface";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toastSuccess, toastWarning, toastError } = useToast();
  const { refreshUser } = useAuth();
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
        reset({
          firstName: item.firstName ?? "",
          lastName: item.lastName ?? "",
          email: item.email ?? "",
          phone: item.phone ?? "",
        });
      }
      initialItem();
    }
  }, [open, item]);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      let avatarUrl = item.avatar;
      if ((file?.size as any) > 1 * 1024 * 1024) {
        toastWarning("Warning", "File size must be less than 1MB");
        return;
      }
      if (file) {
        const uploadRes = await UploadApis.create(file!, BASE_FOLDER.AVATARS);
        avatarUrl = uploadRes.data.url;
        if (uploadRes.statusCode === 201 && item.avatar) {
          // await UploadApis.deteleMulti([item.avatar.slice(1) as any]);
          await UploadApis.deteleMulti([item.avatar]);
        }
      }

      const formatData: IUser = {
        ...data,
        avatar: avatarUrl,
      };
      const res = await UserApis.update(formatData);
      if (res.statusCode === 200) {
        toastSuccess("Success", "Profile updated successfully");
      }
      onClose();
      refreshUser();
    } catch (error) {
      toastError("Error", (error as Error).message);
    }
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
        <div className="flex md:flex-row flex-col items-center justify-between md:gap-5 w-full">
          <div className="md:w-1/5 w-full flex flex-col items-center justify-center gap-3 group">
            <div className="border rounded-full">
              <BaseAvatar
                // name={`${item.lastName} ${item.firstName} `}
                url={
                  preview !== null ? String(preview) : getImageLink(item.avatar)
                }
                size={100}
              />
            </div>
            <label
              htmlFor="upload"
              className="w-25 h-25 absolute rounded-full opacity-90 items-center justify-center px-5 py-1 bg-(--color-background) text-(--color-title) text-xs cursor-pointer hidden group-hover:flex"
            >
              <Upload strokeWidth={1.5} size={18} />
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSelectImage}
            />
          </div>
          <div className="flex flex-col gap-5 mt-5 md:w-4/5 w-full">
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
        </div>
        <BaseGroupButton onCancel={onClose} submitText="Update" />
      </form>
    </BaseModal>
  );
}
