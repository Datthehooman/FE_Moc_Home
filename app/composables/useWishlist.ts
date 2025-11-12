export function useWishlist() {
  const wishlists = ref<Room[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchRooms = async (page = 1) => {
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

  fetchRooms();

  return {
    wishlists,
    isLoading,
    error,
    fetchRooms,
  };
}
