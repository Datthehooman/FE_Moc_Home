import { ref } from 'vue';

const useProduct = () => {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref("");
  const productDetail = ref(null);
  const loadingDetail = ref(false);
  const errorDetail = ref("");
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/client/category");
      const json = await res.json();
      categories.value = json?.result?.data || [];
    } catch (err) {
      console.error("❌ Lỗi fetch category:", err);
    }
  };
  const fetchProducts = async () => {
    loading.value = true;
    error.value = "";
    try {
      await fetchCategories();
      const res = await fetch("http://127.0.0.1:8000/api/client/products");
      if (!res.ok) throw new Error("Lỗi khi load sản phẩm");
      const json = await res.json();
      const apiProducts = json?.result?.data || [];
      products.value = apiProducts.map((p) => {
        const category = categories.value.find((c) => c.id === p.category_id) || null;
        const thumbnail = p.thumbnail || (p.images?.[0]?.full_image_url ?? "/placeholder.png");
        const images = p.images?.map((img) => ({
          full_image_url: img.full_image_url,
          alt_text: img.alt_text ?? p.product_name
        })) || [];
        return {
          product_id: p.product_id,
          product_name: p.product_name,
          slug: p.slug,
          // ✅ ĐÃ THÊM SLUG
          price: Number(p.price),
          price_down: Number(p.price_down || p.price),
          badge: p.badge,
          brand: typeof p.brand === "object" ? p.brand.brand_name : p.brand,
          images,
          rating: p.rating != null ? Number(p.rating) : 0,
          sku: p.sku ?? "N/A",
          stock_quantity: p.stock_quantity ?? 0,
          category_id: p.category_id,
          category,
          thumbnail
        };
      });
    } catch (err) {
      error.value = err.message || "Đã xảy ra lỗi khi tải dữ liệu.";
      console.error("❌ API error:", err);
    } finally {
      loading.value = false;
    }
  };
  const fetchProductDetail = async (slug) => {
    loadingDetail.value = true;
    errorDetail.value = "";
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/client/product/${slug}`);
      if (!res.ok) throw new Error("Lỗi khi load chi tiết sản phẩm");
      const json = await res.json();
      const p = json?.result?.data || json?.result;
      if (!p) throw new Error("Không tìm thấy sản phẩm");
      const category = categories.value.find((c) => c.id === p.category_id) || null;
      const thumbnail = p.thumbnail || (p.images?.[0]?.full_image_url ?? "/placeholder.png");
      const images = p.images?.map((img) => ({
        full_image_url: img.full_image_url,
        alt_text: img.alt_text ?? p.product_name
      })) || [];
      productDetail.value = {
        product_id: p.product_id,
        product_name: p.product_name,
        slug: p.slug,
        // ✅ ĐÃ THÊM SLUG CHO CHI TIẾT
        price: Number(p.price),
        price_down: Number(p.price_down || p.price),
        badge: p.badge,
        brand: typeof p.brand === "object" ? p.brand.brand_name : p.brand,
        images,
        rating: p.rating != null ? Number(p.rating) : 0,
        sku: p.sku ?? "N/A",
        stock_quantity: p.stock_quantity ?? 0,
        category_id: p.category_id,
        category,
        thumbnail,
        description: p.description,
        material: p.material,
        size: p.size,
        color: p.color,
        weight: p.weight,
        view: p.view,
        status: p.status,
        created_at: p.created_at,
        updated_at: p.updated_at
      };
    } catch (err) {
      errorDetail.value = err.message || "Lỗi khi fetch chi tiết sản phẩm";
      console.error("❌ Product detail API error:", err);
    } finally {
      loadingDetail.value = false;
    }
  };
  return {
    products,
    loading,
    error,
    fetchProducts,
    productDetail,
    loadingDetail,
    errorDetail,
    fetchProductDetail
  };
};

export { useProduct as u };
//# sourceMappingURL=useProduct-8uDT80_O.mjs.map
