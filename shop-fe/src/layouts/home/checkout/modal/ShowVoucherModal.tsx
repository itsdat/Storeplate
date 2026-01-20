import { VoucherApis } from "@/apis";
import BaseInput from "@/components/common/input/BaseInput";
import BaseModal from "@/components/common/modal/BaseModal";
import TagSale from "@/components/feature/tag/TagSale";
import { IVoucher } from "@/interfaces/voucher/voucher.interface";
import { useEffect, useState } from "react";

export default function ShowVoucherModal({
  totalTemp,
  onApply,
  currentVoucher,
}: {
  totalTemp: number;
  onApply: (voucher: IVoucher) => void;
  currentVoucher?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);

  useEffect(() => {
    if (open) {
      async function initalItem() {
        const res = await VoucherApis.findMulti();
        setVouchers(res.data);
      }
      initalItem();
    }
  }, [open]);

  const getDiscountValue = (v: IVoucher) =>
    Math.min((totalTemp * v.discountPercentage) / 100, v.maxDiscount);

  const maxDiscountValue = Math.max(
    ...vouchers.map((v) => getDiscountValue(v)),
  );

  const sortedVouchers = [...vouchers].sort((a, b) => {
    const discountA = getDiscountValue(a);
    const discountB = getDiscountValue(b);

    // Voucher giảm nhiều tiền hơn lên trước
    if (discountA !== discountB) {
      return discountB - discountA;
    }

    // Nếu bằng nhau → ưu tiên còn lượt
    return a.usedCount - b.usedCount;
  });

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-3 w-30 py-1.75 bg-(--color-btn) text-sm rounded-[3px] text-(--color-text-btn) cursor-pointer"
      >
        Your vouchers
      </button>
      <BaseModal
        title="Your Vouchers"
        description="Select a voucher to apply"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">
          {vouchers.length === 0 && (
            <p className="text-sm text-(--color-desc) text-center">
              No vouchers available
            </p>
          )}

          {sortedVouchers.map((voucher) => (
            <VoucherCard
              isActive={currentVoucher === voucher.id}
              isRecommended={getDiscountValue(voucher) === maxDiscountValue}
              totalTemp={totalTemp}
              key={voucher.id}
              voucher={voucher}
              onApply={(v) => {
                onApply(v);
                setOpen(false);
              }}
            />
          ))}
        </div>
      </BaseModal>
    </div>
  );
}

function VoucherCard({
  voucher,
  onApply,
  totalTemp,
  isRecommended = false,
  isActive = false,
}: {
  voucher: IVoucher;
  onApply: (voucher: IVoucher) => void;
  totalTemp: number;
  isRecommended: boolean;
  isActive: boolean;
}) {
  //   const isDisabled = !voucher.isActive || voucher.usedCount >= voucher.limit;
  const isDisabled =
    totalTemp < voucher.minOrderTotal || voucher.usedCount >= voucher.limit;

  return (
    <div
      className={`${isActive ? "border-(--color-btn)" : ""} relative flex items-center justify-between gap-4 rounded-[3px] border border-(--color-border) p-4 transition
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-(--color-btn)"
        }
      `}
      onClick={() => {
        if (!isDisabled) {
          onApply(voucher);
        }
      }}
    >
      {!isDisabled && isRecommended && (
        <div className="absolute right-1 top-1 text-xs text-green-600 font-medium capitalize">
          Recommended
        </div>
      )}

      {/* LEFT – DISCOUNT */}
      <div className="flex items-center gap-7">
        <TagSale value={voucher.discountPercentage} />

        <div className="space-y-1">
          <p className="font-medium text-lg">
            <span className="uppercase">{voucher.code}</span>
          </p>
          <p className="text-xs text-(--color-desc)">
            Min order £{voucher.minOrderTotal}
          </p>
          <p className="text-xs text-(--color-desc)">
            Max discount £{voucher.maxDiscount}
          </p>
        </div>
      </div>

      {/* RIGHT – STATUS */}
      <div className="text-right space-y-1">
        <p className="text-xs text-(--color-desc)">
          Used {voucher.usedCount}/{voucher.limit}
        </p>

        {!isDisabled ? (
          <span
            className={`font-medium px-3 py-1 ${isActive ? "bg-(--color-btn) text-(--color-text-btn) border border-(--color-btn)" : "border border-(--color-btn)"} text-xs flex items-center justify-center rounded-xs`}
          >
            {isActive ? "Used" : "Apply"}
          </span>
        ) : (
          <span className="text-xs text-red-500">Unavailable</span>
        )}
      </div>

      {/* Ribbon hết lượt */}
      {voucher.usedCount >= voucher.limit && (
        <span className="absolute -top-2 -right-2 rounded bg-red-500 px-2 py-0.5 text-xs text-white">
          Used up
        </span>
      )}
    </div>
  );
}
