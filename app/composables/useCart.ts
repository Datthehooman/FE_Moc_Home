import { ref } from "vue";
import { useCookie } from "#app";

export const useCart = () => {
  const cart = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  // Get the ref object, don't destructure the value
  let tokenCookie = useCookie("tokenLocal");

  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

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

      toast.add({
        title: "Lỗi",
        description: error.value,
        color: "error",
      });

      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (product_id: number, quantity = 1) => {
    if (!tokenCookie.value) {
      toast.add({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để thêm vào giỏ hàng",
        color: "warning",
      });
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

      toast.add({
        title: "Thành công",
        description: "Đã thêm sản phẩm vào giỏ hàng",
        color: "green",
      });

      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Thêm giỏ hàng thất bại";

      toast.add({
        title: "Lỗi",
        description: error.value,
        color: "error",
      });

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

      toast.add({
        title: "Đã xóa",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
        color: "green",
      });

      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa sản phẩm thất bại";

      toast.add({
        title: "Lỗi",
        description: error.value,
        color: "error",
      });

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

      toast.add({
        title: "Cập nhật",
        description: "Đã cập nhật số lượng sản phẩm",
        color: "green",
      });

      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Cập nhật số lượng thất bại";

      toast.add({
        title: "Lỗi",
        description: error.value,
        color: "error",
      });

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
