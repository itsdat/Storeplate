"use client";
import { useRouter } from "next/navigation";

export default function GlobalError({ error }: { error: Error }) {
  console.log("error 500", error);
  const router = useRouter();
  return (
    <div className="w-full h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <h2 className="text-9xl font-bold text-(--color-title) my-10">500</h2>
      <p className="text-4xl font-bold mb-10">An error occurred</p>
      <span className="text-(--color-text) w-2xl mx-auto text-center mb-10">
        please try again.
      </span>
      <button
        onClick={() => router.forward()}
        className={`cursor-pointer px-5 py-2.5 bg-(--color-btn) text-(--color-text-btn) font-bold rounded-sm`}
      >
        Try Again
      </button>
    </div>
  );
}
