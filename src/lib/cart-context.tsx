import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { COUPON } from "@/lib/site";

export type CartItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  renewalPrice: number;
  quantity: number;
  image: string;
  description: string;
};

export const DEFAULT_PRODUCT: Omit<CartItem, "quantity"> = {
  id: "savior-jordani-studio-plugin",
  name: "Savior Jordâni Studio - Plugin de Retoque para Photoshop",
  sku: "SJS-PS-001",
  price: 399.90,
  renewalPrice: 99.90,
  image: "/images/plugin-ui-main.jpg",
  description: "Licença de 1 ano do plugin completo com todas as ferramentas e atualizações.",
};

type CartContextType = {
  items: CartItem[];
  addItem: (item?: Partial<Omit<CartItem, "quantity">>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "sjs_cart_v1";
const COUPON_KEY = "sjs_cart_coupon_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [ { ...DEFAULT_PRODUCT, quantity: 1 } ];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fall back to default product
    }
    return [ { ...DEFAULT_PRODUCT, quantity: 1 } ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(COUPON_KEY);
    } catch {
      return null;
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon]);

  const addItem = (item?: Partial<Omit<CartItem, "quantity">>, quantity = 1) => {
    const productToAdd = { ...DEFAULT_PRODUCT, ...item };
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productToAdd.id);
      if (existing) {
        return prev.map((i) =>
          i.id === productToAdd.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...productToAdd, quantity }];
    });
    toast.success("Produto adicionado ao carrinho", {
      description: `${productToAdd.name} (Qtd: ${quantity})`,
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        toast("Produto removido", { description: target.name });
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCouponCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Digite um código de cupom.");
      return false;
    }
    if (trimmed !== COUPON && trimmed !== "SAVE50" && trimmed !== "SAVIORVIP") {
      toast.error("Cupom inválido ou expirado.");
      return false;
    }
    setAppliedCoupon(trimmed);
    toast.success(`Cupom ${trimmed} aplicado!`, {
      description: "Desconto especial de 50% aplicado no primeiro ano.",
    });
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast("Cupom removido");
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * 0.5 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon: applyCouponCode,
        removeCoupon,
        isOpen,
        setIsOpen,
        openCart,
        closeCart,
        totalItems,
        subtotal,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
