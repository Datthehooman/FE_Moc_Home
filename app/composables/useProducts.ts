export function useProducts() {
  const products = ref<Product[]>([]);
  const pagination = ref<Pagination | null>(null);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchProducts = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } =
        await useCustomFetch<ProductApiResponse>(
          `/api/client/products?page=${page}`,
          { method: "GET" }
        );

      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          products.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }

      if (data.value) {
        const response = data.value as ProductApiResponse;
        products.value = response?.result?.data || [];
        pagination.value = response?.result?.pagination || null;
        error.value = null;
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);
      if (err?.statusCode === 404) {
        products.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    } finally {
      isLoading.value = false;
    }
  };

  fetchProducts();

  return {
    products,
    pagination,
    isLoading,
    error,
    fetchProducts,
  };
}
