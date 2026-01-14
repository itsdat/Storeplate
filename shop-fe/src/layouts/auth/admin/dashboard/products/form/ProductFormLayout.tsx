import BaseImagePicker from "@/components/common/image/image-picker/BaseImagePicker";
import BaseInput from "@/components/common/input/BaseInput";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { Label } from "@/components/ui/label";
import { BASE_FOLDER } from "@/constants/folder.constant";
import {
  IProduct,
} from "@/interfaces/product/product.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";

export default function ProductFormLayout({
  rhf,
}: {
  rhf: SimFormReturn<IProduct>;
}) {
  const { control, setValue, watch } = rhf;
  const [images, setImages] = useState<string[]>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const createEmptyVariant = () => ({
    id: uuid(),
    stock: 0,
    price: 0,
    discount: 0,
    images: [],
    size: "",
  });

  const createEmptySize = () => ({
    id: uuid(),
    label: "",
    value: "",
  });

  return (
    <div className="flex w-full items-start justify-start gap-5">
      <div className="w-1/2 flex flex-col items-start justify-start gap-5">
        <BaseInputRhf
          control={control}
          required
          name="name"
          placeholder="Product name"
          label="Name"
        />
        <BaseInputRhf
          control={control}
          required
          name="description"
          placeholder="Description product"
          label="Description"
        />
        <BaseInputRhf
          control={control}
          name="moreInfo"
          placeholder="More product info"
          label="More info"
        />

        <div className="w-full flex flex-col gap-3">
          <Label className=" text-(--color-title)">Sizes</Label>

          {sizeFields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="w-full flex items-center justify-between gap-3 border p-2 border-(--color-border) rounded-sm">
                <BaseInputRhf
                  control={control}
                  name={`sizes.${index}.label`}
                  label="Label"
                  required
                />
                <BaseInputRhf
                  control={control}
                  name={`sizes.${index}.value`}
                  label="Value"
                  required
                />
              </div>
              {sizeFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <Trash2 strokeWidth={1.5} size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={() => appendSize(createEmptySize() as any)}
            type="button"
            className="w-full py-2 text-sm flex items-center justify-center rounded-sm text-(--color-text-btn) bg-(--color-btn) mb-0.5 cursor-pointer"
          >
            Add New Size
          </button>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-start gap-5">
        {fields.map((field, index) => (
          <div key={field.id} className="w-full">
            <div className="flex items-center justify-between">
              <Label className="mb-2 text-(--color-text)">
                Variant {index + 1}
              </Label>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 cursor-pointer"
                >
                  <Trash2 strokeWidth={1.5} size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-col items-start justify-start gap-5 border rounded-sm p-3">
              <div className="flex gap-3 w-full">
                <BaseInputRhf
                  control={control}
                  name={`variants.${index}.price`}
                  label="Price"
                  required
                />

                <BaseInputRhf
                  control={control}
                  name={`variants.${index}.discount`}
                  label="Discount"
                />
              </div>

              <div className="flex gap-3 w-full">
                <BaseInputRhf
                  control={control}
                  name={`variants.${index}.stock`}
                  label="Stock"
                  required
                />

                <div className="flex items-end justify-start gap-1 w-full">
                  <BaseInput
                    label="List Images"
                    required
                    placeholder="Select list images"
                    className="flex-1"
                    value={`${images.length} image selected`}
                    readOnly
                  />

                  <div>
                    <BaseImagePicker
                      type="multi"
                      folderName={BASE_FOLDER.PRODUCTS}
                      onSelectImages={(images) => {
                        setValue(`variants.${index}.images` as any, images, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                        setImages(images);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => append(createEmptyVariant() as any)}
          type="button"
          className="w-full py-2 bg-(--color-btn) text-(--color-text-btn) flex items-center justify-center rounded-sm text-sm cursor-pointer"
        >
          Add New Variant
        </button>
      </div>
    </div>
  );
}
