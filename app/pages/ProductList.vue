<template>
  <div class="bg-[#FFFBF8]">
    <div class="min-h-screen p-6 max-w-[85%] mx-auto">
<div class="max-w-[1200px] mx-auto flex gap-6">
  <!-- SIDEBAR -->
<aside class="w-[250px] flex-shrink-0 sticky top-24 self-start h-[calc(100vh-96px)] overflow-y-auto scrollbar-none">
  <ModulesProductSidebar
    v-model:searchQuery="searchQuery"
    v-model:selectedCategories="selectedCategories"
    v-model:selectedBrands="selectedBrands"
  />
</aside>
        <!-- PRODUCT GRID -->
        <div class="flex-1">
          <!-- Sort -->
          <ModulesProductSort v-model="sortOption" />

          <!-- Grid sản phẩm -->
          <div
            v-if="!loading && paginatedProducts.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center items-stretch"
          >
            <ModulesProductCartProduct
              v-for="product in paginatedProducts"
              :key="product.product_id"
              :item="product"
              class="w-full max-w-[350px]"
              @view="openQuickView(product)"
            />
          </div>

          <!-- Loading -->
          <div v-else-if="loading" class="text-center py-20 text-gray-500">
            Đang tải sản phẩm...
          </div>

          <!-- Empty -->
          <div v-else class="text-center py-20 text-gray-400">
            Không có sản phẩm nào phù hợp
          </div>

          <!-- Pagination -->
          <ModulesProductModulesPagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="currentPage = $event"
          />
        </div>
      </div>

      <!-- Quick View Overlay -->
      <ModulesProductQuickViewOverlay
        :show="showQuickView"
        :product="selectedProduct"
        @close="closeQuickView"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, watch, onMounted } from "vue";
  import { useProduct } from "~/composables/useProduct";
  import { useRoomProducts } from "~/composables/useRoomProducts";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const roomId = Number(route.query.room_id);

  // If route has room_id → useRoomProducts, otherwise useProduct
  const { products, loading, fetchProducts } = useProduct();
  const {
    roomProducts,
    isLoading: roomLoading,
    fetchRoomProducts,
  } = useRoomProducts(roomId);

  const isRoomPage = computed(() => !!roomId);

  // These are shared reactive states
  const searchQuery = ref<string>((route.query.search as string) || "");
  const selectedCategories = ref<string[]>([]);
  const selectedBrands = ref<string[]>([]);
  const sortOption = ref("Mặc định");
  const currentPage = ref(1);
  const itemsPerPage = 18;

  const parsePrice = (price: number | string) =>
    Number(String(price).replace(/\D/g, ""));

  // Choose correct product source
  const allProducts = computed(() =>
    isRoomPage.value ? roomProducts.value : products.value
  );

  // --- Filter + Sort ---
  const filteredProducts = computed(() => {
    let result = allProducts.value || [];

    if (searchQuery.value.trim()) {
      const keyword = searchQuery.value.toLowerCase();
      result = result.filter((p) =>
        p.product_name.toLowerCase().includes(keyword)
      );
    }

    if (selectedBrands.value.length) {
      result = result.filter((p) =>
        selectedBrands.value.includes(p.brand ?? "")
      );
    }

    if (selectedCategories.value.length) {
      result = result.filter((p) =>
        selectedCategories.value.includes(String(p.category_id))
      );
    }

    if (sortOption.value === "Tên A-Z") {
      result = [...result].sort((a, b) =>
        a.product_name.localeCompare(b.product_name, "vi", {
          sensitivity: "base",
        })
      );
    } else if (sortOption.value === "Tên Z-A") {
      result = [...result].sort((a, b) =>
        b.product_name.localeCompare(a.product_name, "vi", {
          sensitivity: "base",
        })
      );
    } else if (sortOption.value === "Giá tăng dần") {
      result = [...result].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    } else if (sortOption.value === "Giá giảm dần") {
      result = [...result].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    return result;
  });

  // --- Pagination ---
  const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage)
  );
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredProducts.value.slice(start, start + itemsPerPage);
  });

  // --- Quick view ---
  const showQuickView = ref(false);
  const selectedProduct = ref<any>(null);
  const openQuickView = (product: any) => {
    selectedProduct.value = product;
    showQuickView.value = true;
  };
  const closeQuickView = () => (showQuickView.value = false);

  // --- Watch searchQuery ---
  let timeout: any = null;
  watch(
    searchQuery,
    (keyword) => {
      if (isRoomPage.value) return; // skip if viewing room products

      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        currentPage.value = 1;
        loading.value = true;
        try {
          let url = "https://api.mocfurni.shop/api/client/products";
          if (keyword) {
            url = `http://api.mocfurni.shop/api/client/product-search?keyword=${encodeURIComponent(
              keyword
            )}`;
          }
          const res = await fetch(url);
          const json = await res.json();
          const list = json?.result?.data || [];

          products.value = list.map((p: any) => ({
            ...p,
            price: Number(p.price),
            price_down: p.price_down ? Number(p.price_down) : undefined,
            thumbnail:
              p.thumbnail ??
              (p.images?.[0]?.image_url
                ? `https://api.mocfurni.shop/storage/${p.images[0].image_url}`
                : "/placeholder.png"),
          }));
        } catch (err) {
          console.error("❌ Lỗi search sản phẩm:", err);
          products.value = [];
        } finally {
          loading.value = false;
        }
      }, 300);
    },
    { immediate: true }
  );

  // --- Load once ---
  onMounted(() => {
    if (isRoomPage.value) fetchRoomProducts(roomId);
    else if (!searchQuery.value) fetchProducts();
  });
</script>
<style scoped>
/* Ẩn scrollbar nhưng vẫn scroll được */
.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.scrollbar-none {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;     /* Firefox */
}

</style>