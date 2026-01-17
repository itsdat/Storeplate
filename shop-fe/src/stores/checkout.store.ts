import { ICart } from "@/interfaces/cart/cart.interface";
import {create} from 'zustand'
import { persist } from "zustand/middleware";

interface CheckoutState {
    items: ICart[],
    setItems: (items: ICart[]) => void,
    clear: () => void
}

//##### RELOAD DISAPPEAR DATA
// export const useCheckoutStore = create<CheckoutState>((set) => ({
//     items: [],
//     setItems: (items) => set({items}),
//     clear: () => set({items: []})
// }))

//##### RELOAD NOT DISAPPEAR DATA
export const useCheckoutStore = create(
  persist<CheckoutState>(
    (set) => ({
      items: [],
      setItems: (items) => set({ items }),
      clear: () => set({ items: [] }),
    }),
    { name: "checkout-store" }
  )
);
