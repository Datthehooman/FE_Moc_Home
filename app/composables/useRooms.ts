export function useRooms() {
  const rooms = ref<Room[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchRooms = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useCustomFetch<RoomApiResponse>(
        "http://127.0.0.1:8000/api/client/rooms",
        { method: "GET" }
      );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          rooms.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }

      if (data.value) {
        const response = data.value as RoomApiResponse;
        rooms.value = response?.result.data || [];
        error.value = null;
      }
    } catch (err: any) {
      console.error("Error fetching rooms:", err);
      if (err?.statusCode === 404) {
        rooms.value = [];
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
    rooms,
    isLoading,
    error,
    fetchRooms,
  };
}
