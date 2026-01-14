import { IPopupAction } from "@/components/common/dropdown/BaseDropdown";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { EditIcon, RefreshCcw, Trash2 } from "lucide-react";

export const getCollectionAction = ({
  onEditCollection,
  onDeleteCollection,
  record,
  onRestoreCollection,
}: {
  onEditCollection: (item: ICollection) => void;
  onDeleteCollection: (item: ICollection) => void;
  onRestoreCollection: (item: ICollection) => void;
  record: ICollection;
}): IPopupAction[] => [
  {
    label: "Edit",
    icon: (
      <EditIcon
        strokeWidth={1.5}
        className="size-5"
        color="var(--color-text)"
      />
    ),
    onClick: () => onEditCollection(record),
  },
  {
    label: "Restore",
    icon: (
      <RefreshCcw
        strokeWidth={1.5}
        className="size-5"
        color="var(--color-text)"
      />
    ),
    onClick: () => onRestoreCollection(record),
    hidden: record.isActive,
  },
  {
    label: "Detele",
    icon: <Trash2 strokeWidth={1.5} className="size-5" color="#fb2c36" />,
    onClick: () => onDeleteCollection(record),
    danger: true,
    hidden: !record.isActive,
  },
];
