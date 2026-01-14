import { CollectionApis } from "@/apis";
import HomeLayout from "@/layouts/home/home/HomeLayout";

export default async function Home() {
  const collectionsRes = await CollectionApis.findMulti();
  return (
    <HomeLayout
      items={{
        collections: {
          data: collectionsRes.data ?? [],
          total: collectionsRes.totalItems ?? 0,
        },
      }}
    />
  );
}
