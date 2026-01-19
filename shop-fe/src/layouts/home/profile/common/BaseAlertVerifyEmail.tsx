import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function BaseAlertVerifyEmail() {
  return (
    <Alert variant="destructive" className="border border-rose-500">
      <AlertCircleIcon className="h-4 w-4" color="oklch(64.5% 0.246 16.439)" />
      <AlertTitle className="font-semibold text-rose-500">
        Email Verification Required
      </AlertTitle>
      <AlertDescription className="space-y-3 text-sm text-rose-500">
        <p className="text-rose-500">
          You need to verify your email address before proceeding with checkout.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-sm bg-(--color-btn) text-(--color-text-btn) border-black text-xs transition cursor-pointer"
          >
            Resend Verification Email
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-sm border border-(--color-btn) text-(--color-title) text-xs transition cursor-pointer"
          >
            Change Email
          </button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
