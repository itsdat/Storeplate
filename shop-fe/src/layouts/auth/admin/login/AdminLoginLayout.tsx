"use client";
import BaseCarousel from "@/components/common/carousel/BaseCarousel";
import { LogoIcon } from "@/components/common/icons/BaseIcon";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { useSimRhf } from "@/hooks/others/useSimRhf.hook";
import { SubmitHandler } from "react-hook-form";
import AdminIcon1 from "@/components/common/icons/admin/Shopping bag-amico.svg";
import AdminIcon2 from "@/components/common/icons/admin/Shopping bag-bro.svg";
import AdminIcon3 from "@/components/common/icons/admin/Shopping bag-pana.svg";
import Image, { StaticImageData } from "next/image";
import { AuthApis } from "@/apis";
import { useToast } from "@/hooks/others/useToast.hook";
import { useRouter } from "next/navigation";

interface IAdminLogin {
  email: string;
  password: string;
}

interface ISlider {
  label: string;
  desc: string;
  icon: StaticImageData;
}

const slides: ISlider[] = [
  {
    label: "Centralized Admin Control",
    desc: "Manage users, roles, and system settings from a single, powerful admin dashboard.",
    icon: AdminIcon1,
  },
  {
    label: "Secure & Reliable Access",
    desc: "Advanced authentication and role-based access ensure your data stays protected.",
    icon: AdminIcon2,
  },
  {
    label: "Boost Team Productivity",
    desc: "Streamline workflows and monitor operations efficiently with intuitive admin tools.",
    icon: AdminIcon3,
  },
];

export default function AdminLoginLayout() {
  const rhf = useSimRhf<IAdminLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, handleSubmit, reset } = rhf;
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<IAdminLogin> = async (data) => {
    try {
      const res = await AuthApis.adminLogin(data);
      if (res.statusCode === 200) {
        toastSuccess("Admin login successfull", res.message);
        sessionStorage.setItem("token", res.data.access_token);
        console.log("token", res.data.access_token);
      }
      reset();
      router.replace("/admin/dashboard");
    } catch (error: any) {
      toastError("Login Fail", error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#1a1c1e] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[120%] bg-slate-800/20 -rotate-12 skew-x-12 transform"></div>
        <div className="absolute top-[20%] -left-[20%] w-full h-[60%] bg-black/40 -rotate-45 transform border-y border-white/5"></div>
        <div className="absolute -top-20 left-0 w-96 h-96 bg-slate-700/10 rotate-45 transform"></div>
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-black/20 to-black/60"></div>
      </div>
      <div className="relative z-10 bg-white w-full h-full max-w-5xl rounded-4xl flex items-start justify-between p-10">
        <div className="w-1/2">
          <LogoIcon />
          <h1 className="text-4xl font-semibold text-gray-800 mt-5">
            Let's get you signed in
          </h1>

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
            </div>
          </form>
        </div>
        <div className="mx-6 w-px self-stretch bg-black/10" />

        <div className="w-1/2">
          <BaseCarousel<ISlider>
            slides={slides}
            slidesPerView={1}
            slidesPerGroup={1}
            arrow={false}
            dotOffset={0}
            renderItem={(item) => (
              <div className="text-center">
                <Image
                  src={item.icon}
                  alt="Admin icon"
                  className="mx-auto w-[90%]"
                  width={1000}
                  height={1000}
                  draggable={false}
                />
                <div className="pt-2 pb-10">
                  <h5 className="text-2xl font-medium text-shadow-sm">
                    {item.label}
                  </h5>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
