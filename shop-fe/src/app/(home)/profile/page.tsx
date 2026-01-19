import { AuthApis } from "@/apis";
import ProfileLayout from "@/layouts/home/profile/ProfileLayout";

export default async function ProfilePage() {
  const res = await AuthApis.getMe();
  return <ProfileLayout item={res.data} />;
}
