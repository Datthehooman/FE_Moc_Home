export function useRoomProducts(roomId: number) {
  const roomProducts = ref<RoomProduct[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchRoomProducts = async (roomId: number) => {
    if (!roomId) return;

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } =
        await useCustomFetch<RoomProductApiResponse>(
          `https://api.mocfurni.shop/api/client/products/room?room_id=${roomId}`,
          {
            method: "GET",
          }
        );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        error.value =
          fetchError.value.statusCode === 404 ? null : fetchError.value;
        roomProducts.value = [];
        return;
      }

      if (data.value) {
        const response = data.value as RoomProductApiResponse;
        // extract just product objects for convenience
        roomProducts.value =
          response?.result?.data?.map((item) => item.product) || [];
      }
    } catch (err: any) {
      console.error("Error fetching room products:", err);
      error.value = err?.statusCode === 404 ? null : err;
      roomProducts.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  fetchRoomProducts(roomId);

  return {
    roomProducts,
    isLoading,
    error,
    fetchRoomProducts,
  };
}
