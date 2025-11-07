<template>
  <div class="bg-[#FFFBF8]">
    <div class="min-h-screen p-6 max-w-[85%] mx-auto">
      <div class="max-w-[1200px] mx-auto flex gap-6">
        <!-- SIDEBAR -->
        <ModulesProductSidebar
          v-model:searchQuery="searchQuery"
          v-model:selectedCategories="selectedCategories"
          v-model:selectedBrands="selectedBrands"
        />

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
import { ref, computed, watch, onMounted } from 'vue'
import { useProduct } from '~/composables/useProduct'
import { useRoute, useRouter } from 'vue-router'

// === Hàm bỏ dấu tiếng Việt ===
const normalizeText = (str: string) => {
  return str
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")       
    ?.replace(/đ/g, "d")
    ?.replace(/Đ/g, "D")
    ?.replace(/[^a-zA-Z0-9 ]/g, "")       
    ?.replace(/\s+/g, " ")               
    ?.trim()
    ?.toLowerCase() || ""
}


const { products, loading, fetchProducts } = useProduct()

// --- Route và router để nhận query từ header ---
const route = useRoute()
const router = useRouter()
const searchQuery = ref<string>((route.query.search as string) || '')

// --- Filter / Sort ---
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const sortOption = ref('Mặc định')
const currentPage = ref(1)
const itemsPerPage = 18

const parsePrice = (price: number | string) => Number(String(price).replace(/\D/g, ''))

const filteredProducts = computed(() => {
  let result = products.value || []

  // Lọc theo keyword (Không dấu)
  if (searchQuery.value.trim()) {
    const keyword = normalizeText(searchQuery.value)
    result = result.filter(p =>
      normalizeText(p.product_name).includes(keyword)
    )
  }

  // Lọc theo thương hiệu
  if (selectedBrands.value.length) {
    result = result.filter(p => selectedBrands.value.includes(p.brand ?? ''))
  }

  // Lọc theo danh mục
  if (selectedCategories.value.length) {
    result = result.filter(p => selectedCategories.value.includes(String(p.category_id)))
  }

  // Sắp xếp
  if (sortOption.value === 'Tên A-Z') {
    result = [...result].sort((a, b) =>
      a.product_name.localeCompare(b.product_name, 'vi', { sensitivity: 'base' })
    )
  } else if (sortOption.value === 'Tên Z-A') {
    result = [...result].sort((a, b) =>
      b.product_name.localeCompare(a.product_name, 'vi', { sensitivity: 'base' })
    )
  } else if (sortOption.value === 'Giá tăng dần') {
    result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
  } else if (sortOption.value === 'Giá giảm dần') {
    result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  }

  return result
})

// --- Phân trang ---
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

// --- Quick view ---
const showQuickView = ref(false)
const selectedProduct = ref<any>(null)
const openQuickView = (product: any) => { selectedProduct.value = product; showQuickView.value = true }
const closeQuickView = () => (showQuickView.value = false)

// --- Watch query route từ header ---
watch(
  () => route.query.search,
  (keyword) => {
    searchQuery.value = (keyword as string) || ''
  },
  { immediate: true }
)

// --- Watch searchQuery gọi API search (convert keyword → không dấu) ---
let timeout: any = null
watch(searchQuery, (keyword) => {
  clearTimeout(timeout)
  timeout = setTimeout(async () => {
    currentPage.value = 1

    // ✅ đặt đây và đúng indent
    const normalized = normalizeText(keyword)

    // ✅ nếu chuỗi rỗng thì mới gọi lại tất cả
    if (!normalized || normalized.length < 1) {
      await fetchProducts()
      return
    }

    loading.value = true
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/client/product-search?keyword=${encodeURIComponent(normalized)}`
      )

      const json = await res.json()
      const list = json?.result?.data || []

      products.value = list.map((p: any) => ({
        ...p,
        price: Number(p.price),
        price_down: p.price_down ? Number(p.price_down) : undefined,
        thumbnail: p.thumbnail
          ? p.thumbnail
          : p.images?.[0]?.image_url
            ? `http://127.0.0.1:8000/storage/${p.images[0].image_url}`
            : '/placeholder.png'
      }))
    } catch (err) {
      console.error('❌ Lỗi search sản phẩm:', err)
      products.value = []
    } finally {
      loading.value = false
    }
  }, 300)
})


// --- Load lần đầu ---
onMounted(() => {
  fetchProducts()
})
</script>
