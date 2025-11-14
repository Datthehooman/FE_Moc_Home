export function useWishlist() {
  const wishlists = ref<Wishlist[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  // 🟢 Lấy danh sách wishlist
  const fetchWishlist = async (page = 1) => {
    console.log('🔄 fetchWishlist called')
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists",
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
      }
    } catch (err: any) {
      console.error("Error fetching wishlists:", err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  // 🟡 Thêm sản phẩm vào wishlist
  const postWishlist = async (productId: number) => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists",
        {
          method: "POST",
          body: { product_id: productId },
        }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      if (data.value) {
        const response = data.value as WishlistApiResponse;
        const newItem = response?.result?.data?.[0];

        // ✅ Chỉ thêm nếu chưa tồn tại
        if (newItem && !wishlists.value.find((item) => item.product_id === newItem.product_id)) {
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

  // 🔴 Xóa 1 sản phẩm khỏi wishlist
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

      wishlists.value = wishlists.value.filter((item) => item.product_id !== productId);
      return true;
    } catch (err: any) {
      console.error("Error deleting wishlist:", err);
      error.value = err;
      return false;
    }
  };

  // 🔵 Xóa nhiều sản phẩm khỏi wishlist
  const deleteMultipleWishlist = async (productIds: number[]) => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists/remove-multiple",
        {
          method: "DELETE",
          body: { product_ids: productIds },
        }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      wishlists.value = wishlists.value.filter(
        (item) => !productIds.includes(item.product_id)
      );
      return true;
    } catch (err: any) {
      console.error("Error deleting multiple wishlists:", err);
      error.value = err;
      return false;
    }
  };

  // ⚫ Xóa toàn bộ wishlist
  const deleteAllWishlist = async () => {
    try {
      const { data, error: fetchError } = await useCustomFetch<WishlistApiResponse>(
        "http://127.0.0.1:8000/api/client/wishlists",
        { method: "DELETE" }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
        return false;
      }

      wishlists.value = [];
      return true;
    } catch (err: any) {
      console.error("Error deleting all wishlists:", err);
      error.value = err;
      return false;
    }
  };

  return {
    wishlists,
    isLoading,
    error,
    fetchWishlist,
    postWishlist,
    deleteWishlist,
    deleteMultipleWishlist,
    deleteAllWishlist,
  };
}
