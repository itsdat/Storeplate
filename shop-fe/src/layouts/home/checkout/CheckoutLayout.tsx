"use client";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useCheckoutStore } from "@/stores/checkout.store";
import { ChevronsRight, CreditCard, ListOrdered, Truck } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import ShippingOption from "./common/radio/ShippingOption";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import BaseConfirmAlert from "@/components/common/alert/BaseConfirmAlert";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import BaseInput from "@/components/common/input/BaseInput";
import ShowVoucherModal from "./modal/ShowVoucherModal";
import { IVoucher } from "@/interfaces/voucher/voucher.interface";
import { IAddress } from "@/interfaces/address/address.interface";
import { IUser } from "@/interfaces/user/user.interface";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  city: string;
  district: string;
  street: string;
  wards: string;
  address: string;
  user: IUser;
}

export default function CheckoutLayout({ data }: { data: CheckoutForm }) {
  const rhf = useSimRhf<CheckoutForm>({
    defaultValues: {
      address: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    },
  });
  const { control, handleSubmit, reset } = rhf;
  const { items, clear } = useCheckoutStore();
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const router = useRouter();
  const [voucher, setVoucher] = useState<IVoucher>();
  const totalTemp = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const getDiscountValue = (v: IVoucher) =>
    Math.min((totalTemp * v.discountPercentage) / 100, v.maxDiscount);

  useEffect(() => {
    if (!data) return;

    const address = `${data.street}, ${data.wards}, ${data.district}, ${data.city}`;

    reset({
      address,
      user: data.user ?? "",
    });
  }, [data, reset]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex items-start justify-between gap-10">
        <div className="w-2/3 flex flex-col gap-10">
          <div className="w-full">
            <HeaderTitle
              icon={<Truck strokeWidth={1.5} />}
              title="Shipping Information"
            />
            <div className="flex w-full flex-col gap-5">
              <div className="flex items-center justify-between gap-5">
                <BaseInputRhf
                  required
                  name="user.firstName"
                  control={control}
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
                  required
                  name="user.lastName"
                  control={control}
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
                <BaseInputRhf
                  required
                  type="email"
                  name="user.email"
                  control={control}
                  className="text-[14px]! px-5"
                  placeholder="email@gmail.com"
                  label="Email"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />

                <BaseInputRhf
                  required
                  name="user.phone"
                  control={control}
                  className="text-[14px]! px-5"
                  placeholder="+1 027346722"
                  label="Phone number"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />
              </div>
              <BaseInputRhf
                required
                name="address"
                control={control}
                className="text-[14px]! px-5"
                placeholder="Morden Way"
                label="Address"
                classProps={{
                  inputClass:
                    "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                  lableClass: "text-sm font-normal",
                }}
              />
            </div>
          </div>

          <div className="w-full">
            <HeaderTitle
              icon={<CreditCard strokeWidth={1.5} />}
              title="Payment Method"
            />
            <ShippingOption />
          </div>
        </div>
        <div className="w-1/3">
          <div className="w-full bg-(--color-background) border border-(--color-border) rounded-lg p-5">
            <HeaderTitle
              icon={<ListOrdered strokeWidth={1.5} />}
              title="Order Summary"
            />
            <div className="flex flex-col gap-5">
              <ScrollArea className="max-h-52 flex flex-col gap-5">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-start gap-5 mb-3"
                  >
                    <img
                      src={getImageLink(item.thumbnail)}
                      alt="image"
                      className="w-20 h-20 aspect-square object-cover"
                    />
                    <div className="">
                      <h5>{item.name}</h5>
                      <p className="text-sm text-(--color-desc)">
                        {item.size.label} x{item.quantity}
                      </p>
                      <span>€{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <div className="flex items-center justify-start gap-2 ">
                <BaseInput
                  readOnly
                  value={voucher ? voucher.code : ""}
                  type="email"
                  className="text-[14px]! px-5"
                  placeholder="Voucher"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />

                <ShowVoucherModal
                  currentVoucher={voucher?.id}
                  onApply={(item) => setVoucher(item)}
                  totalTemp={items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )}
                />
              </div>

              <Separator className="bg-(--color-border)" />

              <div className="flex flex-col gap-2">
                <RowItem
                  label="Subtotal"
                  content={`€${items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )}`}
                />
                <RowItem
                  label="Shipping"
                  content="Free"
                  classname="text-green-600"
                />
                <RowItem
                  label="Voucher discount"
                  content={`- €${voucher ? getDiscountValue(voucher) : "0"}`}
                />
              </div>

              <Separator className="bg-(--color-border)" />

              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-(--color-title)">
                  Total
                </p>
                <p className="font-semibold text-lg text-(--color-title)">
                  €{totalTemp - (voucher ? getDiscountValue(voucher) : 0)}
                </p>
              </div>

              <button className="px-3 py-2 bg-(--color-btn) flex items-center justify-center gap-1 text-sm rounded-[3px] text-(--color-text-btn) cursor-pointer">
                Complete Purchase
                <ChevronsRight strokeWidth={1.5} className="size-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsCancel(true)}
            className="max-w-[90%] mx-auto mt-5 hover:bg-red-500 hover:text-white transition-all duration-200 w-full px-3 py-2 border border-red-500  text-red-500 flex items-center justify-center gap-1 text-sm rounded-[3px] cursor-pointer"
          >
            Cancel Checkout
          </button>
        </div>
      </div>

      <BaseConfirmAlert
        title="Cancel Checkout?"
        description="Your selected items will remain in your cart, but you will leave the checkout process."
        cancelText="Stay on Checkout"
        confirmText="Yes, Cancel Checkout"
        open={isCancel}
        onOpenChange={() => setIsCancel(false)}
        onConfirm={() => {
          clear();
          router.replace("/carts");
        }}
      />
    </div>
  );
}

const HeaderTitle = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <div className="w-full flex items-center justify-start gap-2 mb-5 font-bold">
      {icon} <h5>{title}</h5>
    </div>
  );
};

const RowItem = ({
  label,
  content,
  classname,
}: {
  label: string;
  content: string;
  classname?: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-(--color-desc) text-sm">{label}</p>
      <span className={cn("text-(--color-title) font-medium", classname)}>
        {content}
      </span>
    </div>
  );
};
