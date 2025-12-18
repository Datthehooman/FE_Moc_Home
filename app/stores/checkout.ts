import { defineStore } from "pinia";
import { ref } from "vue";

export const useCheckoutStore = defineStore("checkout", () => {
  const buyNowItem = ref<any>(null);
  const cartItems = ref<any[]>([]);
  const checkoutMode = ref<"cart" | "buy-now">("cart");

  // ✅ THÊM: lưu bill preview
  const invoicePreview = ref<any>(null);

  const setBuyNowItem = (item: any) => {
    buyNowItem.value = item;
    cartItems.value = [];
    checkoutMode.value = "buy-now";
  };

  const setCartItems = (items: any[]) => {
    cartItems.value = [...items];
    checkoutMode.value = "cart";
  };

  // ✅ THÊM: set bill preview
  const setInvoicePreview = (data: any) => {
    invoicePreview.value = data;
  };

  const clearCheckout = () => {
    buyNowItem.value = null;
    cartItems.value = [];
    checkoutMode.value = "cart";

    // ✅ THÊM: clear bill
    invoicePreview.value = null;
  };

  return {
    buyNowItem,
    cartItems,
    checkoutMode,

    // ✅ expose thêm
    invoicePreview,
    setInvoicePreview,

    setBuyNowItem,
    setCartItems,
    clearCheckout,
  };
});
