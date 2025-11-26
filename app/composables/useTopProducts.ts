export function useHomeProducts() {
  const topSelling = ref<Product[]>([]);
  const topRated = ref<Product[]>([]);
  const topDiscount = ref<Product[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<any>(null);

  const fetchHomeProducts = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const [sellingRes, ratedRes, discountRes] = await Promise.all([
        fetch("https://api.mocfurni.shop/api/client/product/top-selling").then(
          (r) => r.json() as Promise<ProductApiResponse>
        ),
        fetch("https://api.mocfurni.shop/api/client/product/top-rated").then(
          (r) => r.json() as Promise<ProductApiResponse>
        ),
        fetch("https://api.mocfurni.shop/api/client/product/top-discount").then(
          (r) => r.json() as Promise<ProductApiResponse>
        ),
      ]);

      topSelling.value = sellingRes.result.data;
      topRated.value = ratedRes.result.data;
      topDiscount.value = discountRes.result.data;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  fetchHomeProducts();

  return {
    topSelling,
    topRated,
    topDiscount,
    isLoading,
    error,
    fetchHomeProducts,
  };
}
