import { AddressApi } from "@/apis";
import CheckoutLayout from "@/layouts/home/checkout/CheckoutLayout";

export default async function CheckoutPage() {
  const res = await AddressApi.findMulti();
  return <CheckoutLayout data={res.data[0]} />;
}
