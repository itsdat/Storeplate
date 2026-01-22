import { ReactNode, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import { IAddress } from "@/interfaces/address/address.interface";

export default function AddAddressBtn({
  trigger,
  total,
}: {
  trigger: ReactNode;
  total: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <AddAddressModal
        total={total}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
