import { CollectionApis, ProductApis } from "@/apis";
import { IProductQuery } from "@/interfaces/product/product.interface";
import ProductsListLayout from "@/layouts/home/products/ProductsListLayout";

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: Promise<IProductQuery>;
}) {
  const query = await searchParams;
  const productsRes = await ProductApis.findMulti(query);
  const collectionsRes = await CollectionApis.findMulti();

  return (
    <ProductsListLayout
      items={{
        collections: {
          data: collectionsRes.data || [],
          total: collectionsRes.totalItems || 0,
        },
        products: {
          data: productsRes?.data || [],
          total: productsRes?.totalItems || 0,
          priceRange: productsRes?.optional?.priceRange || { min: 0, max: 0 },
        },
      }}
    />
  );
}
