import { ref } from 'vue';
import { m as useCookie } from './server.mjs';

const useCart = () => {
  const cart = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const tokenCookie = useCookie("token");
  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`
  });
  const getCart = async () => {
    if (!tokenCookie.value) return null;
    isLoading.value = true;
    error.value = null;
    try {
      const res = await $fetch("http://127.0.0.1:8000/api/client/cart", {
        headers: getAuthHeader()
      });
      cart.value = res.result.data.items;
      return res.result.data;
    } catch (err) {
      error.value = err?.message || "Lỗi lấy giỏ hàng";
      alert("❌ " + error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const addToCart = async (product_id, quantity = 1) => {
    if (!tokenCookie.value) {
      alert("⚠️ Vui lòng đăng nhập để thêm giỏ hàng");
      return false;
    }
    isLoading.value = true;
    error.value = null;
    try {
      await $fetch("http://127.0.0.1:8000/api/client/cart/add", {
        method: "POST",
        query: { product_id, quantity },
        headers: getAuthHeader()
      });
      await getCart();
      return true;
    } catch (err) {
      error.value = err?.data?.message || "Thêm giỏ hàng thất bại";
      alert("❌ " + error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const removeItem = async (cart_id) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(`http://127.0.0.1:8000/api/client/cart/remove-item`, {
        method: "DELETE",
        query: { cart_id },
        headers: getAuthHeader()
      });
      await getCart();
      alert("✅ Đã xóa sản phẩm khỏi giỏ hàng!");
      return true;
    } catch (err) {
      error.value = err?.data?.message || "Xóa sản phẩm thất bại";
      alert("❌ " + error.value);
      return false;
    }
  };
  const updateQuantity = async (product_id, quantity) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(`http://127.0.0.1:8000/api/client/cart/update-quantity`, {
        method: "PUT",
        query: { product_id, quantity },
        headers: getAuthHeader()
      });
      await getCart();
      return true;
    } catch (err) {
      error.value = err?.data?.message || "Cập nhật số lượng thất bại";
      alert("❌ " + error.value);
      return false;
    }
  };
  return { cart, getCart, addToCart, removeItem, updateQuantity, isLoading, error };
};

export { useCart as u };
//# sourceMappingURL=useCart-zVwK7fEI.mjs.map
