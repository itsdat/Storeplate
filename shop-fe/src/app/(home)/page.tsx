import { CollectionApis, ProductApis } from "@/apis";
import HomeLayout from "@/layouts/home/home/HomeLayout";

export default async function Home() {
  const collectionsRes = await CollectionApis.findMulti();
  const productRes = await ProductApis.findMulti();
  return (
    <HomeLayout
      items={{
        collections: {
          data: collectionsRes.data ?? [],
          total: collectionsRes.totalItems ?? 0,
        },
        products: {
          data: productRes?.data ?? [],
          total: productRes?.totalItems ?? 0,
        },
      }}
    />
  );
}
