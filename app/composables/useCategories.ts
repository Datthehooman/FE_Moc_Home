export function useCategories() {
  const categories = ref<Category[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useCustomFetch(
        "http://127.0.0.1:8000/api/client/category",
        {
          method: "GET",
        }
      );

      if (fetchError.value) {
        console.log("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          console.log("404 detected, setting categories to empty array");
          categories.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      } else {
        console.log("Success, data:", data.value);
        const response = data.value as FetchCategoriesResponse;
        categories.value = response?.result?.data || [];
        error.value = null; // Clear any previous errors on success
      }
    } catch (err: any) {
      console.log("Catch error:", err);
      if (err?.statusCode === 404) {
        console.log("404 in catch, setting categories to empty array");
        categories.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };

  fetchCategories();

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
  };
}
