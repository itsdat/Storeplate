import BaseDrawer from "@/components/common/drawer/BaseDrawer";

export default function AdminProfileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseDrawer open={open} onClose={onClose} side="right">
      <div></div>
    </BaseDrawer>
  );
}
