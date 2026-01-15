import { ICart } from "@/interfaces/cart/cart.interface";

export const getCart = (): ICart[] => {
  if (typeof window === "undefined") return [];

  try {
    const cart = localStorage.getItem("cart");
    return cart ? (JSON.parse(cart) as ICart[]) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

export const addToCart = (item: ICart) => {
  const cart = getCart();

  const existed = cart.find((i) => i.id === item.id && i.size.value === item.size.value);

  if (existed) {
    existed.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id: string, size: string) => {
   const cart = getCart().filter(
    (i) => !(i.id === id && i.size.value === size)
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const updateCartQuantity = (id: string, quantity: number, size: string) => {
  if(quantity === 0){
    removeFromCart(id, size)
  }
  const cart = getCart()
    .map((item) =>
      item.id === id && item.size.value === size ? { ...item, quantity: quantity } : item
    );

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};



