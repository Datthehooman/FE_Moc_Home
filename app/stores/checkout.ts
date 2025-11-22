export const useCheckoutStore = defineStore("checkout", () => {
  const user = ref<any>(null);

  const buyNowItem = ref<any>(null);
  const cartItems = ref<any[]>([]);
  const checkoutMode = ref<"cart" | "buy-now">("cart");

  const setUser = (u: any) => {
    user.value = u;
  };

  const setBuyNowItem = (item: any) => {
    buyNowItem.value = item;
    cartItems.value = [];
    checkoutMode.value = "buy-now";
  };

  const setCartItems = (items: any[]) => {
    cartItems.value = [...items];
    checkoutMode.value = "cart";
  };

  const clearCheckout = () => {
    buyNowItem.value = null;
    cartItems.value = [];
    checkoutMode.value = "cart";
    user.value = null;
  };

  return {
    user,
    buyNowItem,
    cartItems,
    checkoutMode,
    setUser,
    setBuyNowItem,
    setCartItems,
    clearCheckout,
  };
});
