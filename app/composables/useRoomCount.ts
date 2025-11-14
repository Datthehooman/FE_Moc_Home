export function useRoomCount(room_id = 1) {
  const roomCount = ref<Number>(0);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchRoomCount = async (room_id = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } =
        await useCustomFetch<RoomCountApiResponse>(
          "http://127.0.0.1:8000/api/client/products/room/count",
          { method: "GET", params: { room_id } }
        );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          roomCount.value = 0;
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }

      if (data.value) {
        const response = data.value as RoomCountApiResponse;
        roomCount.value = response?.result.data[0] || 0;
        error.value = null;
      }
    } catch (err: any) {
      console.error("Error fetching roomCount:", err);
      if (err?.statusCode === 404) {
        roomCount.value = 0;
        error.value = null;
      } else {
        error.value = err;
      }
    } finally {
      isLoading.value = false;
    }
  };

  fetchRoomCount(room_id);

  return {
    roomCount,
    isLoading,
    error,
    fetchRoomCount,
  };
}
