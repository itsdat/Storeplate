import { useEffect, useState } from "react";
import BaseModal from "../../modal/BaseModal";
import { ImageOff, ImagePlus, Upload } from "lucide-react";
import { UploadApis } from "@/apis";
import { IUpload } from "@/interfaces/upload/upload.interface";
import { getImageLink } from "@/utils/getImageLink.utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/others/useToast.hook";
import { BASE_FOLDER } from "@/constants/folder.constant";

export default function BaseImagePicker({
  folderName,
  onSelectImages,
  type = "single",
}: {
  folderName: string;
  onSelectImages?: (keys: string[]) => void;
  type?: "single" | "multi";
}) {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imagesList, setImagesList] = useState<IUpload[]>([]);
  const { toastSuccess, toastWarning, toastError } = useToast();
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTempFile(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (openModal) {
      setLoading(true);
      async function fetchImage() {
        const res = await UploadApis.findMulti(folderName);
        setImagesList(res.data);
      }
      fetchImage();
      setLoading(false);
    }
  }, [openModal, loading]);

  const handleUpload = async () => {
    try {
      if ((tempFile?.size as any) > 1 * 1024 * 1024) {
        toastWarning("Warning", "File size must be less than 1MB");
        return;
      }
      const res = await UploadApis.create(tempFile!, folderName);
      if (res) {
        toastSuccess("Success", "Image uploaded successfull");
      }
      setPreview("");
      setTempFile(null);
      setLoading(true);
    } catch (error: any) {
      toastError("Error", error.message);
    }
  };

  const handleSelected = (key: string) => {
    setSelectedKeys(
      (prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key) // bỏ chọn
          : [...prev, key] // chọn
    );
  };

  const handleDeleteMulti = async () => {
    try {
      const res = await UploadApis.deteleMulti(selectedKeys);
      if (res.statusCode === 200) {
        toastSuccess(
          "Success",
          `Deleted ${selectedKeys.length} image successfull`
        );
      }
      setSelectedKeys([]);
      setLoading(true);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  const handleChoosenImage = () => {
    if (type === "single" && selectedKeys.length > 1) {
      toastWarning("Warning", "You are only allowed to choose one photo.");
      return;
    }

    const mappedKeys = selectedKeys.map((key) =>
      key.startsWith("/") ? key : `/${key}`
    );

    onSelectImages?.(mappedKeys);
    setSelectedKeys([]);
    setOpenModal(false);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="w-8.5 h-8.5 aspect-square flex items-center justify-center rounded-sm text-(--color-text-btn) bg-(--color-btn) mb-0.5"
      >
        <ImagePlus strokeWidth={1.5} size={20} />
      </button>

      <h1>{selectedKeys[0]}</h1>

      <BaseModal
        width="4xl"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-full flex gap-5">
          {imagesList && imagesList.length > 0 ? (
            <div className="w-full grid grid-cols-4 gap-2 items-start content-start h-105 overflow-y-auto">
              {imagesList.map((item) => (
                <div key={item.key} className="w-full relative">
                  <label htmlFor={item.key}>
                    <img
                      src={getImageLink(item.url)}
                      alt="image"
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                    <Checkbox
                      onClick={() => handleSelected(item.key)}
                      id={item.key}
                      className="absolute top-2 left-2 bg-white"
                    />
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-(--color-title)">
              <ImageOff strokeWidth={1.5} size={30} />
              <p className="mt-2">No photos have been uploaded yet.</p>
            </div>
          )}

          <div className="w-1/3 p-2">
            <label
              htmlFor="upload"
              className="w-full aspect-square border border-dashed border-blue-500 rounded-sm flex items-center justify-center hover:bg-blue-50 cursor-pointer"
            >
              <Upload
                size={18}
                strokeWidth={1.5}
                color="var(--color-blue-500)"
              />

              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
              />
            </label>
            <div className="mt-5 w-full flex items-start justify-start overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-1/3 aspect-square object-cover bg-(--color-foreground) p-1 rounded-[3px]"
                />
              ) : (
                <span className="text-sm text-(--color-text) text-center">
                  No image selected
                </span>
              )}
            </div>

            {preview && (
              <button
                onClick={handleUpload}
                className="px-2 py-2 bg-(--color-btn) text-(--color-text-btn) text-sm mt-5 w-full rounded-[3px] cursor-pointer"
              >
                Upload
              </button>
            )}
          </div>
        </div>
        {selectedKeys && selectedKeys.length > 0 && (
          <div className="mt-5 w-full flex items-center justify-center gap-3">
            <button
              className="w-fit px-5 py-1.5 text-sm bg-red-500 text-white rounded-[3px]"
              onClick={handleDeleteMulti}
            >
              Delete
            </button>
            <button
              onClick={handleChoosenImage}
              className="w-fit px-5 py-1.5 text-sm bg-(--color-btn) text-(--color-text-btn) rounded-[3px]"
            >
              Select
            </button>
          </div>
        )}
      </BaseModal>
    </div>
  );
}
