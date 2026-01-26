"use client";
import BaseAvatar from "@/components/common/avatar/BaseAvatar";
import BaseEmpty from "@/components/common/empty/BaseEmpty";
import BaseInput from "@/components/common/input/BaseInput";
import BaseTag from "@/components/common/tags/BaseTag";
import { Separator } from "@/components/ui/separator";
import { STATUS_COLORS } from "@/constants/status-color.constant";
import { IUser } from "@/interfaces/user/user.interface";
import {
  LogOut,
  MapPin,
  Pencil,
  Plus,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { ReactNode, useState } from "react";
import BaseAlertVerifyEmail from "./common/BaseAlertVerifyEmail";
import EditProfileBtn from "./modal/edit-profile/EditProfileBtn";
import { getImageLink } from "@/utils/getImageLink.utils";
import AddAddressBtn from "./modal/add-address/AddAddressBtn";
import { IAddress } from "@/interfaces/address/address.interface";
import AddressCard from "./common/card/AddressCard";
import { useAuth } from "@/context/AuthContext";
import BaseConfirmAlert from "@/components/common/alert/BaseConfirmAlert";

interface ProfileResProps {
  userData: IUser;
  addresses: {
    data: IAddress[];
    total: number;
  };
}

export default function ProfileLayout({ items }: { items: ProfileResProps }) {
  const { logoutUser } = useAuth();
  const [signOut, setSingOut] = useState<boolean>(false);
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-7 md:px-0 px-5 relative">
      <div className="w-full flex items-center justify-between ">
        <div className="w-full flex flex-1 items-center justify-start md:gap-5 gap-2">
          <BaseAvatar
            name={`${items.userData.lastName} ${items.userData.firstName}`}
            url={getImageLink(items.userData.avatar) ?? ""}
            size={50}
          />
          <div>
            <h1 className="text-sm">Account Settings</h1>
            <p className="text-xs text-(--color-text)">
              Manage your personal information and orders
            </p>
          </div>
        </div>
        <button
          onClick={() => setSingOut(true)}
          className="flex items-center justify-end md:w-52 px-2 md:px-0 w-fit md:gap-2 gap-1 md:text-md text-sm font-normal text-red-500 md:font-medium cursor-pointer"
        >
          <LogOut strokeWidth={1.7} className="md:size-5 size-4" /> Sign Out
        </button>
      </div>

      {items.userData.verified === false && <BaseAlertVerifyEmail />}

      <div>
        <HeaderTitle
          title="Personal Information"
          icon={<UserRound strokeWidth={1.5} size={16} />}
          textBtn={
            <EditProfileBtn
              item={items.userData}
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
              value={items.userData.firstName ?? ""}
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
              value={items.userData.lastName ?? ""}
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
          <div className="flex md:flex-row flex-col-reverse items-center justify-between gap-5">
            <BaseInput
              value={items.userData.email ?? ""}
              disabled
              className="text-[14px]! px-5"
              placeholder="johndoe@gmail.com"
              label="Email"
              classProps={{
                inputClass:
                  "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                lableClass: "text-sm font-normal",
              }}
              addon={
                items.userData.verified ? (
                  <BaseTag color={STATUS_COLORS.SUCCESS}>verified</BaseTag>
                ) : (
                  <BaseTag color={STATUS_COLORS.ERROR}>not verified</BaseTag>
                )
              }
            />
            <BaseInput
              disabled
              value={items.userData.phone ?? ""}
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
            <AddAddressBtn
              total={items.addresses.total}
              trigger={
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <Plus strokeWidth={1.5} size={18} />
                  New Address
                </div>
              }
            />
          }
        />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
          {items.addresses.data.map((item) => (
            <AddressCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      <BaseConfirmAlert
        open={signOut}
        onOpenChange={() => setSingOut(false)}
        onConfirm={logoutUser}
        title="Sign out"
        description="Are you sure you want to sign out? You will need to log in again to access your account."
        confirmText="Sign out"
        cancelText="Cancel"
      />
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
