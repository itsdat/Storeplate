import { CartApis } from "@/apis";
import CartsLayout from "@/layouts/home/carts/CartsLayout";

export default async function CartsPage() {
  try {
    const res = await CartApis.findOneById();

    // chưa đăng nhập hoặc token invalid
    if (!res || res.statusCode === 401) {
      return <CartsLayout />;
    }

    return <CartsLayout items={res.data ?? []} total={res.totalItems ?? 0} />;
  } catch (error) {
    console.error("Fetch cart error:", error);

    // fallback an toàn
    return <CartsLayout />;
  }
}
