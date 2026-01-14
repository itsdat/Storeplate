import { ProductApis } from "@/apis";
import ProductsDashboardLayout from "@/layouts/auth/admin/dashboard/products/ProductsDashboardLayout";

export default async function ProductsPage() {
  const res = await ProductApis.findAll();
  return (
    <ProductsDashboardLayout
      items={res.data ?? []}
      totalItems={res.totalItems ?? 0}
    />
  );
}
