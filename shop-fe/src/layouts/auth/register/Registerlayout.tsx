"use client";
import { AuthApis } from "@/apis";
import BaseHeading from "@/components/common/heading/BaseHeading";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { IRegister } from "@/interfaces/auth/auth.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function Registerlayout() {
  const rhf = useSimRhf<IRegister>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  const { control, handleSubmit } = rhf;
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const res = await AuthApis.register(data);
      if (res.statusCode === 201) {
        toastSuccess(
          "Register Successfull",
          "Please enter email & password to login",
        );
        router.replace("/login");
      } else {
        toast("Login fail");
      }
    } catch (error: any) {
      toastError("Register Fail", `${error.message}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <BaseHeading
        title="Create an account"
        desc="Create an account and start using..."
      />

      <form
        className="mt-14 max-w-xl mx-auto w-full flex flex-col gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between gap-5">
          <BaseInputRhf
            required
            name="firstName"
            control={control}
            className="text-[16px]! px-5"
            placeholder="First name"
            label="First Name"
            classProps={{
              inputClass:
                "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px]  has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
              lableClass: "text-xl font-normal",
            }}
          />
          <BaseInputRhf
            required
            name="lastName"
            control={control}
            className="text-[16px]! px-5"
            placeholder="Last Name"
            label="Last Name"
            classProps={{
              inputClass:
                "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px]  has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
              lableClass: "text-xl font-normal",
            }}
          />
        </div>

        <BaseInputRhf
          required
          type="email"
          name="email"
          control={control}
          className="text-[16px]! px-5"
          placeholder="Type your email"
          label="Email Address"
          classProps={{
            inputClass:
              "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px]  has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
            lableClass: "text-xl font-normal",
          }}
        />

        <BaseInputRhf
          control={control}
          required
          name="password"
          className="text-[16px]! px-5"
          label="Password"
          type="password"
          placeholder="****************"
          classProps={{
            inputClass:
              "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px]  has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
            lableClass: "text-xl font-normal",
          }}
        />

        <div className="flex flex-col gap-5">
          <button className="w-full rounded-[3px] bg-(--color-title) text-(--color-text-btn) py-3 font-medium text-lg cursor-pointer">
            Log In
          </button>

          <div className="flex flex-col gap-1">
            <div className="w-full flex items-center justify-start gap-2 text-(--color-desc)">
              <span>I have read and agree to the</span>
              <Link
                href={"/login"}
                className="underline text-(--color-title) font-medium cursor-pointer"
              >
                Terms & Conditions
              </Link>
            </div>
            <div className="w-full flex items-center justify-start gap-2 text-(--color-desc)">
              <span>Have an account?</span>
              <Link
                href={"/login"}
                className="underline text-(--color-title) font-medium cursor-pointer"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
