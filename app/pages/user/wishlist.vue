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
              Danh sách sản phẩm yêu thích
            </h3>

            <div class="flex items-center gap-3">
              <!-- XÓA -->
              <button
                v-if="isSelecting && selectedList.length"
                @click="removeSelected"
                class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Xóa khỏi yêu thích
              </button>

              <!-- CHỌN -->
              <button
                class="px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow transition"
                @click="toggleSelectMode"
              >
                {{ isSelecting ? 'Hủy chọn' : 'Chọn sản phẩm' }}
              </button>
            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4" />

          <!-- LOADING -->
          <div v-if="isLoading" class="text-center text-gray-500 py-10">
            Đang tải danh sách yêu thích...
          </div>

          <!-- ERROR -->
          <div v-else-if="error" class="text-center text-red-500 py-10">
            {{ error.message || 'Không thể tải dữ liệu' }}
          </div>

          <!-- EMPTY -->
          <div v-else-if="!wishlists.length" class="text-center text-gray-500 py-10">
            Chưa có sản phẩm yêu thích nào 😢
          </div>

          <!-- LIST -->
        <!-- LIST -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center">
<ModulesUserCartWishlist
  v-for="item in paginatedWishlists"
  :key="item.product_id"
  :item="item"
  :itemWidth="250"
/>
</div>


          <!-- PHÂN TRANG -->
          <ModulesUserPagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"c
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => (currentPage = p)"
          />
        </section>

        <!-- POPUP XEM NHANH -->
        <ModulesProductQuickViewOverlay
          :show="showOverview"
          :product="selectedProduct"
          @close="closeOverview"
        />
      </main>c
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import { ref, computed, onMounted } from 'vue'
import type { Wishlist } from '~/types/wishlist'

const { wishlists, isLoading, error, fetchWislist, deleteWishlist } = useWishlist()

// Lấy danh sách từ API
onMounted(() => {
  fetchWislist()
})

// PAGINATION
const currentPage = ref(1)
const perPage = 6
const totalPages = computed(() => Math.ceil(wishlists.value.length / perPage))
const paginatedWishlists = computed(() =>
  wishlists.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)
const pagesAround = computed(() => {
  const p = currentPage.value
  const t = totalPages.value
  return Array.from({ length: 3 }, (_, i) => p - 1 + i).filter((x) => x > 1 && x < t)
})
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

// XEM NHANH
const showOverview = ref(false)
const selectedProduct = ref<Wishlist | null>(null)
const openOverview = (product: Wishlist) => {
  selectedProduct.value = product
  showOverview.value = true
}
const closeOverview = () => (showOverview.value = false)

// CHỌN SẢN PHẨM
const isSelecting = ref(false)
const selectedList = ref<Wishlist[]>([])

const toggleSelectMode = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedList.value = []
}

const toggleSelect = (product: Wishlist) => {
  const idx = selectedList.value.indexOf(product)
  if (idx !== -1) selectedList.value.splice(idx, 1)
  else selectedList.value.push(product)
}

// XÓA
const removeSelected = async () => {
  for (const item of selectedList.value) {
    await deleteWishlist(item.product_id)
  }
  selectedList.value = []
  isSelecting.value = false
  fetchWislist()
}

const removeOne = async (item: Wishlist) => {
  await deleteWishlist(item.product_id)
  selectedList.value = selectedList.value.filter((p) => p !== item)
  fetchWislist()
}
</script>
