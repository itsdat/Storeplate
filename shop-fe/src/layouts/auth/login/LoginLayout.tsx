"use client";
import { AuthApis, CartApis } from "@/apis";
import BaseHeading from "@/components/common/heading/BaseHeading";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { useAuth } from "@/context/AuthContext";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { useToast } from "@/hooks/others/useToast.hook";
import { ILogin } from "@/interfaces/auth/auth.interface";
import { clearCart, getCart } from "@/utils/cart.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function LoginLayout() {
  const rhf = useSimRhf<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, handleSubmit, reset } = rhf;
  const router = useRouter();
  const { refreshUser } = useAuth();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await AuthApis.login(data);
      if (res.statusCode === 200) {
        reset();
        toastSuccess(
          "Login Successfull",
          "Signed in successfully. Wellcome to Storeplate!",
        );
        refreshUser();
        try {
          const localCart = getCart();
          for (const item of localCart) {
            await CartApis.create({
              ...item,
              userId: res.data.user.id,
            });
          }
          clearCart();
        } catch (error) {
          console.log("error", error);
        }
        router.replace("/");
      } else {
        toastError("Login fail", "Email or password is incorrect");
      }
    } catch (error: any) {
      toastError("Login Fail", `${error.message}`);
    }
  };

  const { toastSuccess, toastError } = useToast();

  return (
    <div className="w-full max-w-7xl mx-auto h-[calc(100vh-7rem)] flex flex-col items-center justify-center md:px-0 px-5">
      <BaseHeading
        title="Login"
        desc="Please fill your email and password to login"
      />
      <form
        className="mt-14 max-w-xl mx-auto w-full flex flex-col gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
            lableClass: "text-xl font-normal",
          }}
        />

        <BaseInputRhf
          required
          name="password"
          control={control}
          className="text-[16px]! px-5"
          label="Password"
          type="password"
          placeholder="****************"
          classProps={{
            inputClass:
              "py-7 focus:border-none border-none shadow-none bg-(--color-foreground) rounded-[3px] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-gray-500 has-[[data-slot=input-group-control]:focus-visible]:ring-[1px]",
            lableClass: "text-xl font-normal",
          }}
        />

        <div className="flex flex-col gap-5">
          <button
            type="submit"
            className="w-full rounded-[3px] bg-(--color-title) text-(--color-text-btn) py-3 font-medium text-lg cursor-pointer"
          >
            Log In
          </button>

          <div className="w-full flex items-center justify-start gap-2 text-(--color-desc)">
            <span>Don't have an account?</span>
            <Link
              href={"/register"}
              className="underline text-(--color-title) font-medium cursor-pointer"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
