"use client";

import { toast } from "sonner";
import { Check } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter } from "next/navigation";

interface ToastAddToCartProps {
  title: string;
  onView?: () => void;
  btnText?: string
  image?: string
}

export function useToast() {
  const router = useRouter();
  const toastAddToCart = ({
  title,
  image,
  onView,
  btnText,
}: ToastAddToCartProps) => {
  toast.info("", {
    description: _jsxs("div", {
      className: "flex items-center gap-3 -ml-5!",

      children: [
        // LEFT: Image
        image &&
          _jsx(
            "div",
            {
              className:
                "w-12 h-12 rounded-sm overflow-hidden border border-(--color-border) flex-shrink-0",
              children: _jsx("img", {
                src: image,
                alt: "product",
                className: "w-full h-full object-cover",
              }),
            },
            "image"
          ),

        // RIGHT: text (xếp dọc)
        _jsxs(
          "div",
          {
            className: "flex flex-col gap-1 justify-start items-start mb-3.5! w-48",
            children: [
              _jsx(
                "span",
                {
                  className: "text-sm font-medium text-(--color-title) line-clamp-1",
                  children: title,
                },
                "title"
              ),

              _jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    _jsx(
                      "div",
                      {
                        className:
                          "flex items-center justify-center w-3 h-3 rounded-full bg-emerald-600 add-to-cart",
                        children: _jsx(Check, {
                          color: "#FFF",
                          size: 8,
                          strokeWidth: 3,
                        }),
                      },
                      "icon"
                    ),
                    _jsx(
                      "span",
                      {
                        className: "text-xs text-(--color-desc)",
                        children: "Added to cart",
                      },
                      "text"
                    ),
                  ],
                },
                "status"
              ),
            ],
          },
          "content"
        ),
       _jsx(
        "div",
        {
          className:
            "w-12 py-1 cursor-pointer rounded-xs px-1 text-xs bg-(--color-btn) text-(--color-text-btn) flex items-center justify-center",
          children: _jsx(
            "span",
            {
              onClick: () => router.push("/carts"),
              children: "View",
            },
            "text"
          ),
        },
        "view-text"
      ),

      ],
    }),

    action: onView
      ? {
          label: btnText ?? "View Cart",
          onClick: onView,
        }
      : undefined,
  });
};



  const toastSuccess = (title: string, description?: string) => {
    toast.success(title, {
      className: "gap-7!",
      description: _jsxs("div", {
        className: "flex items-center justify-start gap-1.5",
        children: [
          _jsx("span", { children: description }, "text"),
        ],
      })
    });
  };

  const toastError = (title: string, description?: string) => {
    toast.error(title, {
      className: "gap-7!",
      description: _jsxs("div", {
        className: "flex items-center justify-start gap-1.5",
        children: [
          _jsx("span", { children: description }, "text"),
        ],
      })
    });
  };

  const toastWarning = (title: string, description?: string) => {
    toast.warning(title, {
      className: "gap-7!",
      description: _jsxs("div", {
        className: "flex items-center justify-start gap-1.5",
        children: [
          _jsx("span", { children: description }, "text"),
        ],
      })
    });
  };

  return {
    toastAddToCart,
    toastSuccess,
    toastError,
    toastWarning
  };
}