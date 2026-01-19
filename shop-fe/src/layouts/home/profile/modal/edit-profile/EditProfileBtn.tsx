import { ReactNode, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { IUser } from "@/interfaces/user/user.interface";

export default function EditProfileBtn({
  trigger,
  item,
}: {
  trigger: ReactNode;
  item: IUser;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <EditProfileModal
        item={item}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
