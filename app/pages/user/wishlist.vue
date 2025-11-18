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
              <!-- XÓA TẤT CẢ -->
              <button
                v-if="wishlists.length > 0"
                @click="removeAllWishlist"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
              >
                Xóa tất cả
              </button>
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center">
            <ModulesUserCartWishlist
              v-for="item in paginatedWishlists"
              :key="item.product_id"
              :item="item"
              :itemWidth="250"
              @wishlist-updated="handleWishlistUpdated"
              @view="handleViewProduct"
            />
          </div>

          <!-- PHÂN TRANG -->
          <ModulesUserPagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => (currentPage = p)"
          />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' })

import { ref, computed, onMounted, watch } from 'vue'
import type { Wishlist } from '~/types/wishlist'

// Composables
const { wishlists, isLoading, error, fetchWishlist, deleteMultipleWishlist, deleteAllWishlist } = useWishlist()

// Lấy danh sách từ API - CHỈ GỌI 1 LẦN
onMounted(() => {
  fetchWishlist()
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

const nextPage = () => { 
  if (currentPage.value < totalPages.value) currentPage.value++ 
}
const prevPage = () => { 
  if (currentPage.value > 1) currentPage.value-- 
}

// CHỌN SẢN PHẨM
const isSelecting = ref(false)
const selectedList = ref<Wishlist[]>([])

const toggleSelectMode = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedList.value = []
}

// XÓA SẢN PHẨM
const removeSelected = async () => {
  if (selectedList.value.length === 0) return
  
  if (confirm(`Bạn có chắc muốn xóa ${selectedList.value.length} sản phẩm khỏi yêu thích?`)) {
    const productIds = selectedList.value.map(item => item.product_id)
    
    const success = await deleteMultipleWishlist(productIds)
    if (success) {
      selectedList.value = []
      isSelecting.value = false
      alert(`✅ Đã xóa ${productIds.length} sản phẩm khỏi yêu thích!`)
    }
  }
}

// XÓA TẤT CẢ
const removeAllWishlist = async () => {
  if (wishlists.value.length === 0) return
  
  if (confirm('Bạn có chắc muốn xóa TẤT CẢ sản phẩm khỏi yêu thích?')) {
    const success = await deleteAllWishlist()
    if (success) {
      alert('✅ Đã xóa tất cả sản phẩm khỏi yêu thích!')
    }
  }
}

// 🎯 EVENT HANDLERS - Chỉ fetch lại khi cần thiết
const handleWishlistUpdated = () => {
  // Không cần làm gì vì state đã được cập nhật tự động
  console.log('Wishlist updated')
}

// 🎯 WATCHERS - Reset pagination khi cần
watch(
  () => wishlists.value.length,
  (newLength, oldLength) => {
    if (paginatedWishlists.value.length === 0 && currentPage.value > 1) {
      currentPage.value = 1
    }
  }
)


</script>