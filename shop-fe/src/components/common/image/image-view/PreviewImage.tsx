import { cn } from "@/lib/utils";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function PreviewImage({
  url,
  classname,
}: {
  url: string;
  classname: string;
}) {
  return (
    <PhotoProvider>
      <PhotoView src={url}>
        <img
          src={url}
          alt="image"
          className={cn(`w-full aspect-square object-cover`, classname)}
        />
      </PhotoView>
    </PhotoProvider>
  );
}
