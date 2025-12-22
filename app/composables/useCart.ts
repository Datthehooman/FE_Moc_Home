import { ref } from "vue";
import { useCookie } from "#app";

export const useCart = () => {
  const toast = useToast();
  const cart = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ================= TOKEN =================
  let tokenCookie = useCookie("tokenLocal");
  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", { path: "/", domain: ".mocfurni.shop" });
  }

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

  // ================= TOAST HELPERS =================
  const showErrorToast = (msg: string) => {
    toast.add({
      title: msg,
      icon: "heroicons:exclamation-circle",
      timeout: 3000,
      position: "bottom-right",
      style:
        "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
      iconColor: "#ffffff",
      color: "warning",
    });
  };

  const showSuccessToast = (msg: string) => {
    toast.add({
      title: msg,
      icon: "heroicons:check-circle",
      timeout: 3000,
      position: "bottom-right",
      style:
        "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
      iconColor: "#ffffff",
      color: "success",
    });
  };

  // ================= GET CART =================
  const getCart = async () => {
    if (!tokenCookie.value) return null;
    isLoading.value = true;
    error.value = null;

    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/cart",
        { headers: getAuthHeader() }
      );

      cart.value = res.result.data.items;
      return res.result.data;
    } catch (err: any) {
      error.value = err?.message || "Lỗi lấy giỏ hàng";
      showErrorToast(error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // ================= ADD TO CART =================
  const addToCart = async (product_id: number, quantity = 1) => {
    if (!tokenCookie.value) {
      showErrorToast("Vui lòng đăng nhập để thêm vào giỏ hàng");
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
      showSuccessToast("Thêm sản phẩm vào giỏ hàng thành công!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Thêm giỏ hàng thất bại";
      showErrorToast(error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (cart_id: number) => {
    if (!tokenCookie.value) return false;

    try {
      await $fetch(
        "https://api.mocfurni.shop/api/client/cart/remove-item",
        {
          method: "DELETE",
          query: { cart_id },
          headers: getAuthHeader(),
        }
      );

      await getCart();
      showSuccessToast("Đã xóa sản phẩm khỏi giỏ hàng!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa sản phẩm thất bại";
      showErrorToast(error.value);
      return false;
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (product_id: number, quantity: number) => {
    if (!tokenCookie.value) return false;

    try {
      await $fetch(
        "https://api.mocfurni.shop/api/client/cart/update-quantity",
        {
          method: "PUT",
          query: { product_id, quantity },
          headers: getAuthHeader(),
        }
      );

      await getCart();
      showSuccessToast("Cập nhật số lượng thành công!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Cập nhật số lượng thất bại";
      showErrorToast(error.value);
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
