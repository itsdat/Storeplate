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

  const existed = cart.find((i) => i.id === item.id);

  if (existed) {
    existed.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((i) => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const updateCartQuantity = (id: string, quantity: number) => {
  if(quantity === 0){
    removeFromCart(id)
  }
  const cart = getCart()
    .map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};



