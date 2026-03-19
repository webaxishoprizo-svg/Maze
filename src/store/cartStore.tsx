import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { storefrontFetch } from "../lib/storefront";
import { CART_CREATE_MUTATION } from "../lib/queries";
import { toast } from "@/hooks/use-toast";

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
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  subtotal: number;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "maze_cart_items";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (newItem: Omit<CartItem, "quantity">, qty: number = 1) => {
    // SECURITY: Ensure we are using ProductVariant IDs, not Product IDs
    if (newItem.id.includes("/Product/") && !newItem.id.includes("/ProductVariant/")) {
      console.warn("Cart: Detected Product ID instead of Variant ID. Checkout might fail.", newItem.id);
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: qty }];
    });

    toast({
      description: "Added to cart",
      duration: 2000,
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
      const { body } = await storefrontFetch({
        query: CART_CREATE_MUTATION,
        variables: {
          input: {
            lines: items.map((item) => ({
              merchandiseId: item.id,
              quantity: item.quantity,
            })),
          },
        },
      });

      const responseData = body.data?.cartCreate;

      if (!responseData) {
        throw new Error("No response from Shopify cart service.");
      }

      const { cart, userErrors } = responseData;

      if (userErrors && userErrors.length > 0) {
        const errorMsg = userErrors[0].message;
        console.error("Shopify Cart Error:", errorMsg);
        throw new Error(errorMsg);
      }

      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      } else {
        throw new Error("Checkout URL was not generated.");
      }
    } catch (error: any) {
      console.error("Checkout process failed:", error);
      alert(`Checkout Error: ${error.message || "Please check your connectivity and try again."}`);
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
