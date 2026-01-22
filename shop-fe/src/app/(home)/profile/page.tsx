import { AddressApi, AuthApis } from "@/apis";
import ProfileLayout from "@/layouts/home/profile/ProfileLayout";

export default async function ProfilePage() {
  const userRes = await AuthApis.getMe();
  const addressRes = await AddressApi.findMulti();
  return (
    <ProfileLayout
      items={{
        userData: userRes.data,
        addresses: {
          data: addressRes.data,
          total: Number(addressRes.totalItems),
        },
      }}
    />
  );
}
