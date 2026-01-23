import Image from "next/image";
import Link from "next/link";
import IMG from "../../../../../../public/images/home/home_5.webp";
import { ChevronsDown, Copy } from "lucide-react";

export default function DealOfTheWeekSectionLayout() {
  return (
    <div className="md:h-140 md:rounded-xl w-full bg-(--color-foreground) flex md:flex-row flex-col items-center justify-between mt-10">
      <div className="md:w-1/2 w-full md:p-0 p-5 text-center flex flex-col items-center justify-center">
        <span className="text-(--color-desc) md:text-xl text-sm font-semibold text-center">
          Deal of the Week
        </span>
        <h5 className="text-(--color-title) lg:text-5xl text-xl font-semibold text-center lg:leading-14 w-full md:max-w-[80%] md:my-5">
          Curved Collection for Your Bedroom Get 25% Off
        </h5>
        <p className="md:text-lg text-sm font-normal text-(--color-text)">
          Subscribe our Newsletter and get all latest information and offers
        </p>
        <div className="flex flex-col items-center justify-center md:gap-2 mt-5">
          <div className="flex items-center justify-center gap-2 ">
            <div className="md:px-5 px-2 py-1 md:text-2xl text:lg border border-dashed border-gray-500 rounded-sm">
              SPLHPNY2026
            </div>
            <button className="md:w-10 w-8 cursor-pointer aspect-square bg-(--color-btn) flex items-center justify-center text-(--color-text-btn) rounded-sm">
              <Copy className="md:size-6 size-4" />
            </button>
          </div>
          <ChevronsDown className="animate-bounce mt-2" strokeWidth={1.5} />
          <Link
            href={"/products"}
            className="w-fit mx-auto md:px-10 px-5 md:py-2 py-1.5 bg-(--color-title) text-(--color-background) rounded-sm md:text-lg text-sm font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="w-1/2 p-10 hidden md:block">
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
