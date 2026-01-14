import { CollectionApis } from "@/apis";
import CollectionsLayout from "@/layouts/auth/admin/dashboard/collections/CollectionsLayout";

export default async function CollectionPage() {
  const res = await CollectionApis.findAll();
  return (
    <CollectionsLayout items={res.data} totalItems={res.totalItems ?? 0} />
  );
}
