export function useWishlist() {
  const wishlists = ref<Room[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchWislist = async (page = 1) => {
    isLoading.value = true;
    error.value = null;


    try {
      const { data, error: fetchError } = await useCustomFetch<RoomApiResponse>(
        "https://api.mocfurni.shop/api/client/wishlists",
        { method: "GET" }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          wishlists.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }

      if (data.value) {
        const response = data.value as RoomApiResponse;
        wishlists.value = response?.result.data || [];
        error.value = null;
      }
    } catch (err: any) {
      console.error("Error fetching wishlists:", err);
      if (err?.statusCode === 404) {
        wishlists.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    } finally {
      isLoading.value = false;
    }
  };


const   postWislist = async (productId:number) => {
    isLoading.value = true;
    error.value = null;
    try {
        const { data, error: fetchError } = await useCustomFetch<RoomApiResponse>(
        "https://api.mocfurni.shop/api/client/wishlists",
        { method: "POST", body: { product_id: productId } });
    
        if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          wishlists.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }
      if (data.value) {
        const response = data.value as RoomApiResponse;
        wishlists.value = response?.result.data || [];
        error.value = null;
      }

    } catch (err: any) {
        console.error("Error fetching wishlists:", err);
      if (err?.statusCode === 404) {
        wishlists.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    }   finally {
        isLoading.value = false;
    }
};

const deleteWishlist = async (productId:number) => {
    isLoading.value = true;
    error.value = null;

    try {
        const { data, error: fetchError } = await useCustomFetch<RoomApiResponse>(
        "https://api.mocfurni.shop/api/client/wishlists",
        { method: "DELETE", body: { product_id: productId } });
    
        if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          wishlists.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }
      if (data.value) {
        const response = data.value as RoomApiResponse;
        wishlists.value = response?.result.data || [];
        error.value = null;
      }

    } catch (err: any) {
        console.error("Error fetching wishlists:", err);
      if (err?.statusCode === 404) {
        wishlists.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    }   finally {
        isLoading.value = false;
    }
};
  fetchWislist();

  return {
    wishlists,
    isLoading,
    error,
    postWislist,
    fetchWislist,
    deleteWishlist,
  };
}
