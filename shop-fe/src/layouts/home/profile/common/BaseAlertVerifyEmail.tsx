import { AuthApis } from "@/apis";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/others/useToast.hook";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

export default function BaseAlertVerifyEmail() {
  const { toastError, toastSuccess } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSendMail = async () => {
    try {
      setLoading(true);
      const res = await AuthApis.sendMail();
      toastSuccess("Success", res.message);
      setLoading(false);
    } catch (error) {
      toastError("Fail", "Please check your email again!");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Spinner />
        </div>
      )}

      <Alert variant="destructive" className="border border-rose-500">
        <AlertCircleIcon
          className="h-4 w-4"
          color="oklch(64.5% 0.246 16.439)"
        />
        <AlertTitle className="font-semibold text-rose-500">
          Email Verification Required
        </AlertTitle>
        <AlertDescription className="space-y-3 text-sm text-rose-500">
          <p>
            You need to verify your email address before proceeding with
            checkout.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleSendMail}
              type="button"
              disabled={loading}
              className="px-3 py-1.5 rounded-sm bg-(--color-btn) text-(--color-text-btn) text-xs disabled:opacity-50"
            >
              Resend Verification Email
            </button>
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
}
