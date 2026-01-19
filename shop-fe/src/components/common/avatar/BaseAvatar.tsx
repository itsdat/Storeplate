import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials.utils";

export default function BaseAvatar({
  url,
  size = 35,
  name,
}: {
  url?: string;
  size?: number;
  name?: string;
}) {
  return (
    <Avatar
      className="bg-(--color-primary)"
      style={{ width: size, height: size }}
    >
      <AvatarImage src={url || ""} alt="avatar" className="object-cover" />
      <AvatarFallback className="scale-[0.99] bg-(--color-btn) text-(--color-text-btn) font-medium">
        {!name || name?.trim() === "" ? (
          "SP"
        ) : (
          <p className="text-(--color-text-btn) font-medium">{getInitials(name)}</p>
        )}
      </AvatarFallback>
    </Avatar>
  );
}
