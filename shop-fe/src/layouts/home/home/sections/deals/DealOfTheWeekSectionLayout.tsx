import Image from "next/image";
import Link from "next/link";
import IMG from "../../../../../../public/images/home/home_5.webp";
import { ChevronsDown, Copy } from "lucide-react";

export default function DealOfTheWeekSectionLayout() {
  return (
    <div className="h-140 rounded-xl w-full bg-(--color-foreground) flex items-center justify-between">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <span className="text-(--color-desc) text-xl font-semibold">
          Deal of the Week
        </span>
        <h5 className="text-(--color-title) text-5xl font-semibold text-center leading-14 w-full my-5">
          Curved Collection for Your Bedroom Get 25% Off
        </h5>
        <p className="text-lg font-normal text-(--color-text)">
          Subscribe our Newsletter and get all latest information and offers
        </p>
        <div className="flex flex-col items-center justify-center gap-2 mt-5">
          <div className="flex items-center justify-center gap-2 ">
            <div className="px-5 py-1 text-2xl border border-dashed border-gray-500 rounded-sm">
              SPLHPNY2026
            </div>
            <button className="w-10 cursor-pointer aspect-square bg-(--color-btn) flex items-center justify-center text-(--color-text-btn) rounded-sm">
              <Copy />
            </button>
          </div>
          <ChevronsDown className="animate-bounce mt-2" strokeWidth={1.5} />
          <Link
            href={"/products"}
            className="w-fit mx-auto px-10 py-2 bg-(--color-title) text-(--color-background) rounded-sm text-lg font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="w-1/2 p-10">
        <Image
          draggable={false}
          src={IMG}
          alt={"imgae"}
          width={10000}
          height={10000}
          priority
        />
      </div>
    </div>
  );
}
