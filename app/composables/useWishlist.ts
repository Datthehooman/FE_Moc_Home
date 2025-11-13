export function useWishlist() {
  const wishlists = ref<Wishlist[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchWishlist = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } =
        await useCustomFetch<WishlistApiResponse>(
          "https://api.mocfurni.shop/api/client/wishlists",
          { method: "GET" }
        );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return;
      }

      if (data.value) {
        const response = data.value as WishlistApiResponse;
        wishlists.value = response?.result.data || [];
        error.value = null;
      }
    } catch (err: any) {
      console.error("Error fetching wishlists:", err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  const postWishlist = async (productId: number) => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists",
        { method: "POST", body: { product_id: productId } }
      );

      if (fetchError.value) {
      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      // 🎯 QUAN TRỌNG: Cập nhật local state thay vì fetch lại
      if (data.value) {
        const response = data.value as WishlistApiResponse;
        const newItem = response?.result.data?.[0];
        if (newItem && !wishlists.value.find(item => item.product_id === newItem.product_id)) {
          wishlists.value.unshift(newItem);
        }
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Error posting wishlist:", err);
      error.value = err;
      return false;
    }
  };

  const deleteWishlist = async (productId: number) => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        `http://127.0.0.1:8000/api/client/wishlists/${productId}`,
        { method: "DELETE" }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      // 🎯 QUAN TRỌNG: Cập nhật local state thay vì fetch lại
      wishlists.value = wishlists.value.filter(item => item.product_id !== productId);
      return true;
    } catch (err: any) {
      console.error("Error deleting wishlist:", err);
      error.value = err;
      return false;
    }
  };

  const deleteMultipleWishlist = async (productIds: number[]) => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists/remove-multiple",
        { 
          method: "DELETE", 
          body: { product_ids: productIds }
        }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      // 🎯 QUAN TRỌNG: Cập nhật local state thay vì fetch lại
      wishlists.value = wishlists.value.filter(item => !productIds.includes(item.product_id));
      return true;
    } catch (err: any) {
      console.error("Error deleting multiple wishlists:", err);
      error.value = err;
      return false;
    }
  };

  const deleteAllWishlist = async () => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists",
        { method: "DELETE" }
      );

      if (fetchError.value) {
      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      // 🎯 QUAN TRỌNG: Cập nhật local state thay vì fetch lại
      wishlists.value = [];
      return true;
    } catch (err: any) {
      console.error("Error deleting all wishlists:", err);
      error.value = err;
      return false;
    }
  };

  // 🚫 XÓA DÒNG NÀY: KHÔNG tự động fetch khi khởi tạo
  // fetchWishlist();

  return {
    wishlists,
    isLoading,
    error,
    postWishlist,
    fetchWishlist,
    deleteWishlist,
    deleteMultipleWishlist,
    deleteAllWishlist,
  };
}
