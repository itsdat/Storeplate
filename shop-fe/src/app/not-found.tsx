import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <h2 className="text-9xl font-bold text-(--color-title) my-10">404</h2>
      <p className="text-4xl font-bold mb-10">Page not found</p>
      <span className="text-(--color-text) w-2xl mx-auto text-center mb-10">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </span>
      <Link
        href="/"
        className={`cursor-pointer px-5 py-2.5 bg-(--color-btn) text-(--color-text-btn) font-bold rounded-sm`}
      >
        Back To Home
      </Link>
    </div>
  );
}
