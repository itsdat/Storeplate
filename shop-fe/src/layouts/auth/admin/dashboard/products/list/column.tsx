import BasePopoverAction from "@/components/common/popover/BasePopoverAction";
import { AdvancedColumn } from "@/components/common/table/BaseTable";
import BaseTag from "@/components/common/tags/BaseTag";
import { STATUS_COLORS } from "@/constants/status-color.constant";
import {
  IProduct,
  IProductImage,
  IProductVariant,
} from "@/interfaces/product/product.interface";
import { getProductAction } from "./action";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BaseMiniTable from "@/components/common/table/BaseMiniTable";
import { getImageLink } from "@/utils/getImageLink.utils";
import PreviewImage from "@/components/common/image/image-view/PreviewImage";

export const getProductColumn = ({
  onEditProduct,
  onDeleteProduct,
  onRestoreProduct,
}: {
  onEditProduct: (item: IProduct) => void;
  onDeleteProduct: (item: IProduct) => void;
  onRestoreProduct: (item: IProduct) => void;
}): AdvancedColumn<IProduct>[] => {
  return [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Variants",
      key: "variants",
      render: (record: IProduct) => (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={`font-normal py-0 hover:no-underline focus:ring-0!`}
            >
              {record.variants.length} product
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-10 gap-5 pt-3">
              <div className="p-2 bg-(--color-foreground)">
                <BaseMiniTable
                  showIndex={false}
                  columns={[
                    {
                      label: "Thumbnail",
                      key: "image",
                      render: (record: IProductVariant) => (
                        <PreviewImage
                          url={getImageLink(record.images[0])}
                          classname="w-10"
                        />
                      ),
                    },
                    { label: "Stock", key: "stock" },
                    { label: "Price", key: "price" },
                    { label: "Discount", key: "discount" },
                  ]}
                  data={record.variants}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      label: "Description",
      key: "description",
      render: (record: IProduct) => (
        <p className="truncate max-w-50" title={record.description}>
          {record.description}
        </p>
      ),
    },
    {
      label: "Status",
      key: "isActive",
      render: (record: IProduct) => (
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
      render: (record: IProduct) => (
        <BasePopoverAction
          actions={getProductAction({
            onEditProduct: () => onEditProduct(record),
            record,
            onDeleteProduct: () => onDeleteProduct(record),
            onRestoreProduct: () => onRestoreProduct(record),
          })}
        />
      ),
    },
  ];
};
