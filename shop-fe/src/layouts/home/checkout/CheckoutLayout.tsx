"use client";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useCheckoutStore } from "@/stores/checkout.store";
import { ChevronsRight, CreditCard, ListOrdered, Truck } from "lucide-react";
import { ReactNode } from "react";
import ShippingOption from "./common/radio/ShippingOption";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CheckoutLayout() {
  const rhf = useSimRhf<any>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, handleSubmit, reset } = rhf;
  const { items } = useCheckoutStore();

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
                  name="email"
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
                  type="email"
                  name="email"
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
              <BaseInputRhf
                required
                type="email"
                name="email"
                control={control}
                className="text-[14px]! px-5"
                placeholder="123 Morden Way, Suite 400"
                label="Street Address"
                classProps={{
                  inputClass:
                    "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                  lableClass: "text-sm font-normal",
                }}
              />
              <div className="flex items-center justify-between gap-5">
                <BaseInputRhf
                  required
                  name="email"
                  control={control}
                  className="text-[14px]! px-5"
                  placeholder="San Francisco"
                  label="District"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />
                <BaseInputRhf
                  required
                  name="email"
                  control={control}
                  className="text-[14px]! px-5"
                  placeholder="San Francisco"
                  label="City"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />
              </div>
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
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-start gap-5"
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
                    <span>£{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-start gap-2 mt-5">
                <BaseInputRhf
                  type="email"
                  name="email"
                  control={control}
                  className="text-[14px]! px-5"
                  placeholder="Voucher"
                  classProps={{
                    inputClass:
                      "focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
                    lableClass: "text-sm font-normal",
                  }}
                />

                <button className="px-3 py-1.5 bg-(--color-btn) text-sm rounded-[3px] text-(--color-text-btn) cursor-pointer">
                  Apply
                </button>
              </div>

              <Separator className="bg-(--color-border)" />

              <div className="flex flex-col gap-2">
                <RowItem
                  label="Subtotal"
                  content={`£${items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}`}
                />
                <RowItem
                  label="Shipping"
                  content="Free"
                  classname="text-green-600"
                />
                <RowItem label="Voucher discount" content="£0" />
              </div>

              <Separator className="bg-(--color-border)" />

              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg text-(--color-title)">
                  Total
                </p>
                <p className="font-semibold text-lg text-(--color-title)">
                  £
                  {items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>

              <button className="px-3 py-2 bg-(--color-btn) flex items-center justify-center gap-1 text-sm rounded-[3px] text-(--color-text-btn) cursor-pointer">
                Complete Purchase <ChevronsRight strokeWidth={1.5} className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
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
