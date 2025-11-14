import { ref } from "vue";
import { useCookie } from "#app";

export const useCart = () => {
  const cart = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const tokenCookie = useCookie("token"); // token = string

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

  const getCart = async () => {
    if (!tokenCookie.value) return null;
    isLoading.value = true;
    error.value = null;
    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/cart",
        {
          headers: getAuthHeader(),
        }
      );
      cart.value = res.result.data.items;
      return res.result.data;
    } catch (err: any) {
      error.value = err?.message || "Lỗi lấy giỏ hàng";
      alert("❌ " + error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (product_id: number, quantity = 1) => {
    if (!tokenCookie.value) {
      alert("⚠️ Vui lòng đăng nhập để thêm giỏ hàng");
      return false;
    }
    isLoading.value = true;
    error.value = null;
    try {
      await $fetch("https://api.mocfurni.shop/api/client/cart/add", {
        method: "POST",
        query: { product_id, quantity },
        headers: getAuthHeader(),
      });
      await getCart();
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Thêm giỏ hàng thất bại";
      alert("❌ " + error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const removeItem = async (cart_id: number) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(`https://api.mocfurni.shop/api/client/cart/remove-item`, {
        method: "DELETE",
        query: { cart_id },
        headers: getAuthHeader(),
      });
      await getCart();
      alert("✅ Đã xóa sản phẩm khỏi giỏ hàng!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa sản phẩm thất bại";
      alert("❌ " + error.value);
      return false;
    }
  };

  const updateQuantity = async (product_id: number, quantity: number) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(
        `https://api.mocfurni.shop/api/client/cart/update-quantity`,
        {
          method: "PUT",
          query: { product_id, quantity },
          headers: getAuthHeader(),
        }
      );
      await getCart();
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Cập nhật số lượng thất bại";
      alert("❌ " + error.value);
      return false;
    }
  };

  return {
    cart,
    getCart,
    addToCart,
    removeItem,
    updateQuantity,
    isLoading,
    error,
  };
};
