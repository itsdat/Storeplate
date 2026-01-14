import BaseImagePicker from "@/components/common/image/image-picker/BaseImagePicker";
import BaseInput from "@/components/common/input/BaseInput";
import { BaseInputRhf } from "@/components/common/input/BaseInputRhf";
import { BASE_FOLDER } from "@/constants/folder.constant";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { SimFormReturn } from "@/types/others/sim-rhf.types";
import { useEffect, useState } from "react";

export default function CollectionFormLayout({
  rhf,
}: {
  rhf: SimFormReturn<ICollection>;
}) {
  const { control, setValue } = rhf;
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setValue("image", images);
  }, [images]);

  return (
    <div className="flex flex-col w-full items-start justify-start gap-5">
      <BaseInputRhf
        control={control}
        required
        name="name"
        placeholder="collection name"
        label="Name"
      />

      <div className="flex items-end justify-start gap-1 w-full">
        <BaseInput
          label="Thumbnail"
          required
          placeholder="Select thumbnail"
          className="flex-1"
          value={images[0] ?? ""}
          readOnly
        />

        <div>
          <BaseImagePicker
            folderName={BASE_FOLDER.COLLECTIONS}
            onSelectImages={(images) => setImages(images)}
          />
        </div>
      </div>
    </div>
  );
}
