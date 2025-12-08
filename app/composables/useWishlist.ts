// useWishlist.ts
import { ref } from "vue";
import { useCookie } from "#app";
  const toast = useToast()

export const useWishlist = () => {
  const wishlists = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
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

  // 🟢 Lấy danh sách wishlist
  const fetchWishlist = async () => {
    if (!tokenCookie.value) return null;
    isLoading.value = true;
    error.value = null;
    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/wishlists",
        {
          headers: getAuthHeader(),
        }
      );
      wishlists.value = res.result.data;
      return res.result.data;
    } catch (err: any) {
      error.value = err?.message || "Lỗi lấy danh sách yêu thích";
      console.error("❌ Error fetching wishlist:", error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // 🟢 Thêm sản phẩm vào wishlist
  const addToWishlist = async (product_id: number) => {
  if (!tokenCookie.value) {
    toast.add({
      title: "Vui lòng đăng nhập để thêm vào yêu thích",
      icon: "heroicons:exclamation-circle",
      timeout: 3000,
      position: "bottom-right",
      style: "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
      color: "error",
      iconColor: "#ffffff",
    });
    return false;
  }
  isLoading.value = true;
  error.value = null;
  try {
    await $fetch("https://api.mocfurni.shop/api/client/wishlists", {
      method: "POST",
      body: { product_id },
      headers: getAuthHeader(),
    });
    await fetchWishlist(); // Fetch lại danh sách
    toast.add({
      title: "Thêm vào danh sách yêu thích thành công!",
      icon: "heroicons:check-circle",
      timeout: 3000,
      position: "bottom-right",
      style: "color:white; font-weight:600;  box-shadow:0 4px 10px rgba(0,0,0,0.2);",
      iconColor: "#ffffff",
      color: "success",

    });
    return true;
  } catch (err: any) {
    error.value = err?.data?.message || "Thêm vào yêu thích thất bại";
    toast.add({
      title: "❌ " + error.value,
      icon: "heroicons:exclamation-circle",
      timeout: 3000,
      position: "bottom-right",
      style: "color:white; font-weight:600; ox-shadow:0 4px 10px rgba(0,0,0,0.2);",
      iconColor: "#ffffff",
      color: "error",
    });
    return false;
  } finally {
    isLoading.value = false;
  }
};


  // 🔴 Xóa sản phẩm khỏi wishlist
  const removeFromWishlist = async (product_id: number) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(
        `https://api.mocfurni.shop/api/client/wishlists/${product_id}`,
        {
          method: "DELETE",
          headers: getAuthHeader(),
        }
      );
      await fetchWishlist(); // Fetch lại danh sách
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa khỏi yêu thích thất bại";
      console.error("❌ Error removing from wishlist:", error.value);
      return false;
    }
  };

  // 🔴 Xóa nhiều sản phẩm khỏi wishlist
  const removeMultipleFromWishlist = async (product_ids: number[]) => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch(
        "https://api.mocfurni.shop/api/client/wishlists/remove-multiple",
        {
          method: "DELETE",
          body: { product_ids },
          headers: getAuthHeader(),
        }
      );
      await fetchWishlist(); // Fetch lại danh sách
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa nhiều sản phẩm thất bại";
      console.error("❌ Error removing multiple from wishlist:", error.value);
      return false;
    }
  };

  // 🔴 Xóa toàn bộ wishlist
  const clearWishlist = async () => {
    if (!tokenCookie.value) return false;
    try {
      await $fetch("https://api.mocfurni.shop/api/client/wishlists", {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      await fetchWishlist(); // Fetch lại danh sách
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa toàn bộ yêu thích thất bại";
      console.error("❌ Error clearing wishlist:", error.value);
      return false;
    }
  };

  // 🟢 Kiểm tra sản phẩm có trong wishlist không
  const isInWishlist = (product_id: number): boolean => {
    return wishlists.value.some((item) => item.product_id === product_id);
  };

  // 🟢 Lấy số lượng wishlist
  const getWishlistCount = () => {
    return wishlists.value.length;
  };

  return {
    wishlists,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    removeMultipleFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    isLoading,
    error,
  };
};
