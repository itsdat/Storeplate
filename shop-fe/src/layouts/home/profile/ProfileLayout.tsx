"use client";
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import BaseEmpty from "@/components/common/empty/BaseEmpty";
import BaseInput from "@/components/common/input/BaseInput";
import BaseTag from "@/components/common/tags/BaseTag";
import { Separator } from "@/components/ui/separator";
import { STATUS_COLORS } from "@/constants/status-color.constant";
import { useSession } from "@/context/SessionProvider";
import { IUser } from "@/interfaces/user/user.interface";
import {
  LogOut,
  MapPin,
  Pencil,
  Plus,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { ReactNode } from "react";
import BaseAlertVerifyEmail from "./common/BaseAlertVerifyEmail";
import EditProfileBtn from "./modal/edit-profile/EditProfileBtn";
import { getImageLink } from "@/utils/getImageLink.utils";

export default function ProfileLayout({ item }: { item: IUser }) {
  const user = useSession();
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-7">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex  items-center justify-start gap-5">
          <BaseAvatar url={getImageLink(item.avatar) ?? ""} size={50} />
          <div>
            <h1>Account Settings</h1>
            <p>Manage your personal information and orders</p>
          </div>
        </div>
        <button className="flex items-center justify-end w-52 gap-2 text-red-500 font-medium cursor-pointer">
          <LogOut strokeWidth={1.7} size={20} /> Sign Out
        </button>
      </div>

      <BaseAlertVerifyEmail />

      <div>
        <HeaderTitle
          title="Personal Information"
          icon={<UserRound strokeWidth={1.5} size={16} />}
          textBtn={
            <EditProfileBtn
              item={item}
              trigger={
                <div className="flex items-center justify-end gap-2 cursor-pointer">
                  <Pencil strokeWidth={1.5} size={14} />
                  Edit Profile
                </div>
              }
            />
          }
        />

        <div className="flex flex-col gap-5 mt-5">
          <div className="flex items-center justify-between gap-5">
            <BaseInput
              value={item.firstName}
              disabled
              className="text-[14px]! px-5"
              placeholder="John"
              label="First Name"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
            />
            <BaseInput
              value={item.lastName}
              disabled
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
          <div className="flex items-center justify-between gap-5">
            <BaseInput
              value={item.email}
              disabled
              className="text-[14px]! px-5"
              placeholder="johndoe@gmail.com"
              label="Email"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
              addon={<BaseTag color={STATUS_COLORS.ERROR}>not verified</BaseTag>}
            />
            <BaseInput
              disabled
              value={item.phone}
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

      <div>
        <HeaderTitle
          title="Recent Orders"
          icon={<ShoppingCart strokeWidth={1.5} size={16} />}
          textBtn={"View All Orders"}
        />
        <div>
          <BaseEmpty />
        </div>
      </div>

      <div>
        <HeaderTitle
          title="Saved Address"
          icon={<MapPin strokeWidth={1.5} size={16} />}
          textBtn={
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <Plus strokeWidth={1.5} size={18} />
              Add New Address
            </div>
          }
        />

        <div>
          <BaseEmpty />
        </div>
      </div>
    </div>
  );
}

const HeaderTitle = ({
  icon,
  title,
  onClick,
  textBtn,
}: {
  icon: ReactNode;
  title: string;
  textBtn?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="w-full flex items-center justify-start gap-2 mb-1 font-medium">
          {icon} <h5>{title}</h5>
        </div>
        {textBtn && (
          <button
            className="w-46 group text-end cursor-pointer"
            onClick={onClick}
          >
            {textBtn}
            {/* <span className="block h-px mb-1 w-0 bg-(--color-btn) transition-all duration-300 group-hover:w-full" /> */}
          </button>
        )}
      </div>
      <Separator className="bg-(--color-border)" />
    </div>
  );
};
