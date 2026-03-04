import { createContext, useContext, useState, ReactNode } from "react";
import { storefrontFetch } from "../lib/storefront";
import { CHECKOUT_CREATE_MUTATION } from "../lib/queries";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  subtotal: number;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleCart = () => setIsOpen((prev) => !prev);
  const closeCart = () => setIsOpen(false);

  const checkout = async () => {
    if (items.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        variantId: item.id,
        quantity: item.quantity,
      }));

      const { body } = await storefrontFetch({
        query: CHECKOUT_CREATE_MUTATION,
        variables: {
          input: {
            lineItems,
          },
        },
      });

      const { checkout, checkoutUserErrors } = body.data.checkoutCreate;

      if (checkoutUserErrors.length > 0) {
        throw new Error(checkoutUserErrors[0].message);
      }

      if (checkout?.webUrl) {
        window.location.href = checkout.webUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error creating the checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        closeCart,
        subtotal,
        checkout,
        isCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
