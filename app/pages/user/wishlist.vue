<template>
  <div class="flex justify-center min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-5 shadow mb-6">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">
              Danh sách sản phẩm yêu thích ({{ wishlistCount }})
            </h3>

            <div class="flex items-center gap-3">
              <!-- XÓA TẤT CẢ -->
              <button
                v-if="wishlists.length > 0"
                @click="removeAllWishlist"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
                :disabled="isLoading"
              >
                Xóa tất cả
              </button>

              <!-- XÓA ĐÃ CHỌN -->
              <button
                v-if="isSelecting && selectedList.length > 0"
                @click="removeSelected"
                class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                :disabled="isLoading"
              >
                Xóa {{ selectedList.length }} sản phẩm đã chọn
              </button>

              <!-- CHỌN -->
              <button
                class="px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow transition"
                @click="toggleSelectMode"
                :disabled="isLoading"
              >
                {{ isSelecting ? 'Hủy chọn' : 'Chọn sản phẩm' }}
              </button>
            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4" />

          <!-- THÔNG BÁO KHI ĐANG CHỌN -->
          <div
            v-if="isSelecting && selectedList.length > 0"
            class="mb-4 p-3 bg-blue-50 rounded-lg"
          >
            <p class="text-blue-700 text-sm">
              Đã chọn <strong>{{ selectedList.length }}</strong> sản phẩm
            </p>
          </div>

          <!-- LOADING -->
          <div v-if="isLoading" class="text-center text-gray-500 py-10">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin mx-auto mb-2" />
            Đang tải danh sách yêu thích...
          </div>

          <!-- ERROR -->
          <div v-else-if="error" class="text-center text-red-500 py-10">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 mx-auto mb-2" />
            {{ error.message || 'Không thể tải dữ liệu' }}
            <UButton
              @click="fetchWishlist"
              color="red"
              variant="ghost"
              class="mt-2"
            >
              Thử lại
            </UButton>
          </div>

          <!-- EMPTY -->
          <div v-else-if="!wishlists.length" class="text-center text-gray-500 py-10">
            <div class="flex flex-col items-center justify-center">
              <UIcon name="i-heroicons-heart" class="w-16 h-16 text-gray-300 mb-4" />
              <p class="text-lg mb-2">Chưa có sản phẩm yêu thích nào</p>
              <p class="text-sm text-gray-500 mb-4">
                Hãy thêm sản phẩm bạn yêu thích vào đây!
              </p>
              <UButton to="/ProductList" color="primary" variant="solid">
                Khám phá sản phẩm
              </UButton>
            </div>
          </div>

          <!-- LIST -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center"
          >
            <div
              v-for="item in paginatedWishlists"
              :key="item.product_id"
              class="relative"
            >
              <!-- CHECKBOX -->
              <div v-if="isSelecting" class="absolute top-3 left-3 z-30">
                <input
                  type="checkbox"
                  :checked="selectedList.includes(item)"
                  @change="toggleSelectItem(item)"
                  class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-2"
                />
              </div>

              <!-- WISHLIST ITEM -->
              <ModulesUserCartWishlist
                :item="item"
                :itemWidth="250"
                @wishlist-updated="handleWishlistUpdated"
                @view="openQuickView"
              />
            </div>
          </div>

          <!-- TRANG TRỐNG -->
          <div
            v-if="paginatedWishlists.length === 0 && wishlists.length > 0"
            class="text-center text-gray-500 py-10"
          >
            <p>Không có sản phẩm nào trên trang này</p>
            <UButton
              @click="currentPage = 1"
              color="primary"
              variant="ghost"
              class="mt-2"
            >
              Về trang đầu
            </UButton>
          </div>

          <!-- PAGINATION -->
          <ModulesUserPagination
            v-if="totalPages > 1 && paginatedWishlists.length > 0"
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => (currentPage = p)"
          />
        </section>
      </main>

      <!-- 🔥 QUICK VIEW OVERLAY (THÊM) -->
      <ModulesProductQuickViewOverlay
        :show="showQuickView"
        :product="selectedProduct"
        @close="closeQuickView"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import { ref, computed, onMounted, watch } from 'vue'
import type { Wishlist } from '~/types/wishlist'

/* ================== WISHLIST ================== */
const {
  wishlists,
  isLoading,
  error,
  fetchWishlist,
  removeMultipleFromWishlist,
  clearWishlist,
  getWishlistCount
} = useWishlist()

onMounted(() => {
  fetchWishlist()
})

/* ================== QUICK VIEW (THÊM) ================== */
const showQuickView = ref(false)
const selectedProduct = ref<any>(null)

const openQuickView = (product: any) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const closeQuickView = () => {
  showQuickView.value = false
}

/* ================== PAGINATION ================== */
const currentPage = ref(1)
const perPage = 6
const totalPages = computed(() =>
  Math.ceil(wishlists.value.length / perPage)
)

const paginatedWishlists = computed(() =>
  wishlists.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
)

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

/* ================== SELECT ================== */
const isSelecting = ref(false)
const selectedList = ref<Wishlist[]>([])

const toggleSelectMode = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedList.value = []
}

const toggleSelectItem = (item: Wishlist) => {
  const index = selectedList.value.findIndex(
    i => i.product_id === item.product_id
  )
  index > -1
    ? selectedList.value.splice(index, 1)
    : selectedList.value.push(item)
}

/* ================== ACTIONS ================== */
const handleWishlistUpdated = async () => {
  await fetchWishlist()
}

const removeSelected = async () => {
  if (!selectedList.value.length) return
  if (!confirm(`Xóa ${selectedList.value.length} sản phẩm đã chọn?`)) return

  const ids = selectedList.value.map(i => i.product_id)
  const ok = await removeMultipleFromWishlist(ids)

  const toast = useToast()
  ok
    ? toast.add({ title: `✅ Đã xóa ${ids.length} sản phẩm`, color: 'success' })
    : toast.add({ title: '❌ Xóa thất bại', color: 'warning' })

  if (ok) {
    selectedList.value = []
    isSelecting.value = false
  }
}

const removeAllWishlist = async () => {
  if (!wishlists.value.length) return
  if (!confirm('Xóa TẤT CẢ sản phẩm yêu thích?')) return

  const ok = await clearWishlist()
  const toast = useToast()

  ok
    ? toast.add({ title: '✅ Đã xóa tất cả sản phẩm', color: 'success' })
    : toast.add({ title: '❌ Xóa thất bại', color: 'warning' })
}

/* ================== WATCH ================== */
watch(
  () => wishlists.value.length,
  () => {
    if (paginatedWishlists.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  }
)

/* ================== COUNT ================== */
const wishlistCount = computed(() => getWishlistCount())
</script>
