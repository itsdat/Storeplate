import { CollectionApis, ProductApis } from "@/apis";
import ProductsListLayout from "@/layouts/home/products/ProductsListLayout";

export default async function ProductsListPage() {
  const productsRes = await ProductApis.findMulti();
  const collectionsRes = await CollectionApis.findMulti();
  return (
    <ProductsListLayout
      items={{
        collections: {
          data: collectionsRes.data ?? [],
          total: collectionsRes.totalItems ?? 0,
        },
        products: {
          data: productsRes.data ?? [],
          total: productsRes.totalItems ?? 0,
        },
      }}
    />
  );
}
