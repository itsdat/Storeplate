"use client";

import { AuthApis } from "@/apis";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/others/useToast.hook";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VerifyEmailLayout({ token }: { token: string }) {
  const { toastSuccess, toastError } = useToast();
  const calledRef = useRef(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token || calledRef.current) return;

    calledRef.current = true;

    async function verify() {
      try {
        setLoading(true);
        const res = await AuthApis.verifyMail(token);
        if (res.statusCode === 200) {
          setTimeout(() => {
            router.replace("/");
          }, 1500);
          toastSuccess("Success", res.message);
        } else {
          toastError("Fail", res.message);
        }
      } catch {
        toastError("Fail", "Verify email failed");
      }
    }

    verify();
  }, [token, toastSuccess, toastError]);

  if (loading) {
    return (
      <div className="w-full mx-auto h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return null;
}
