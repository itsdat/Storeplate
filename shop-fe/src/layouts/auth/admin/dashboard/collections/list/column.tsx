import BasePopoverAction from "@/components/common/popover/BasePopoverAction";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { getCollectionAction } from "./action";
import { AdvancedColumn } from "@/components/common/table/BaseTable";
import { getImageLink } from "@/utils/getImageLink.utils";
import BaseTag from "@/components/common/tags/BaseTag";
import { STATUS_COLORS } from "@/constants/status-color.constant";
import PreviewImage from "@/components/common/image/image-view/PreviewImage";

export const getCollectionColumn = ({
  onEditCollection,
  onDeleteCollection,
  onRestoreCollection,
}: {
  onEditCollection: (item: ICollection) => void;
  onDeleteCollection: (item: ICollection) => void;
  onRestoreCollection: (item: ICollection) => void;
}): AdvancedColumn<ICollection>[] => {
  return [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Image",
      key: "image",
      render: (record: ICollection) => (
        <PreviewImage url={getImageLink(record.image)} classname="w-10" />
      ),
    },
    {
      label: "Status",
      key: "isActive",
      render: (record: ICollection) => (
        <BaseTag
          color={
            record.isActive ? STATUS_COLORS.ACTIVE : STATUS_COLORS.INACTIVE
          }
        >
          {record.isActive ? "active" : "inactive"}
        </BaseTag>
      ),
    },
    {
      label: "Actions",
      key: "action",
      render: (record: ICollection) => (
        <BasePopoverAction
          actions={getCollectionAction({
            onEditCollection: () => onEditCollection(record),
            record,
            onDeleteCollection: () => onDeleteCollection(record),
            onRestoreCollection: () => onRestoreCollection(record),
          })}
        />
      ),
    },
  ];
};
