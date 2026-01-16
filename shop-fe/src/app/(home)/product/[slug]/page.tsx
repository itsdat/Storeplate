import { ProductApis } from "@/apis";
import ProductDetailLayout from "@/layouts/home/details/ProductDetailLayout";

export default async function ProductDetail({ params }: any) {
  const param = {
    ...(await params),
  };
  const res = await ProductApis.findOneBySlug(param.slug);
  
  return <ProductDetailLayout item={res.data!} />;
}
