// useWishlist.ts
import { ref } from "vue";
import { useCookie } from "#app";

export const useWishlist = () => {
  const toast = useToast();
  const wishlists = useState<any[]>('wishlists_data', () => []);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ================= TOKEN =================
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
    });
  };

  // ================= FETCH WISHLIST =================
  const fetchWishlist = async () => {
    if (!tokenCookie.value) return null;
    isLoading.value = true;
    error.value = null;

    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/wishlists",
        { headers: getAuthHeader() }
      );

      wishlists.value = res.result.data;
      return res.result.data;
    } catch (err: any) {
      error.value = err?.message || "Lỗi lấy danh sách yêu thích";
      showErrorToast(error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // ================= ADD TO WISHLIST =================
  const addToWishlist = async (product_id: number) => {
    if (!tokenCookie.value) {
      showErrorToast("Vui lòng đăng nhập để thêm vào yêu thích");
      return false;
    }

    // 🔥 CHẶN TẠI ĐÂY: Nếu đã có trong mảng local thì không gọi API nữa
    if (isInWishlist(product_id)) {
      toast.add({ title: "Sản phẩm đã có trong yêu thích!", color: "info" });
      return false;
    }

    isLoading.value = true;
    try {
      await $fetch("https://api.mocfurni.shop/api/client/wishlists", {
        method: "POST",
        body: { product_id },
        headers: getAuthHeader(),
      });

      await fetchWishlist(); // Cập nhật lại danh sách mới nhất
      showSuccessToast("Thêm vào danh sách yêu thích thành công!");
      return true;
    } catch (err: any) {
      // Nếu Server trả về lỗi "đã tồn tại" (tùy vào API của bạn)
      error.value = err?.data?.message || "Thêm vào yêu thích thất bại";
      showErrorToast(error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // ================= REMOVE ONE =================
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

      await fetchWishlist();
      showSuccessToast("Đã xóa khỏi yêu thích!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa khỏi yêu thích thất bại";
      showErrorToast(error.value);
      return false;
    }
  };

  // ================= REMOVE MULTIPLE =================
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

      await fetchWishlist();
      showSuccessToast("Đã xóa nhiều sản phẩm khỏi yêu thích!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa nhiều sản phẩm thất bại";
      showErrorToast(error.value);
      return false;
    }
  };

  // ================= CLEAR ALL =================
  const clearWishlist = async () => {
    if (!tokenCookie.value) return false;

    try {
      await $fetch("https://api.mocfurni.shop/api/client/wishlists", {
        method: "DELETE",
        headers: getAuthHeader(),
      });

      await fetchWishlist();
      showSuccessToast("Đã xóa toàn bộ danh sách yêu thích!");
      return true;
    } catch (err: any) {
      error.value = err?.data?.message || "Xóa toàn bộ yêu thích thất bại";
      showErrorToast(error.value);
      return false;
    }
  };

  // ================= HELPERS =================
  const isInWishlist = (product_id: number): boolean => {
    return wishlists.value.some((item) => item.product_id === product_id);
  };

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
