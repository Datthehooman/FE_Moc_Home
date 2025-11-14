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
                v-if="wishlists.length > 0 && !isSelecting"
                @click="removeAllWishlist"
                class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
              >
                Xóa tất cả
              </button>
              
              <!-- XÓA NHIỀU -->
              <button
                v-if="isSelecting && selectedProductIds.length"
                @click="removeSelected"
                class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Xóa đã chọn ({{ selectedProductIds.length }})
              </button>

              <!-- CHỌN / HỦY CHỌN -->
              <button
                class="px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow transition"
                @click="toggleSelectMode"
              >
                {{ isSelecting ? 'Hủy chọn' : 'Chọn sản phẩm' }}
              </button>

              <!-- CHỌN TẤT CẢ TRANG NÀY -->
              <button
                v-if="isSelecting"
                @click="toggleSelectAllPage"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              >
                {{ isAllPageSelected ? 'Bỏ chọn trang' : 'Chọn trang này' }}
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
              :key="item.product.product_id"
              :item="item"
              :itemWidth="250"
              @removed="handleItemRemoved"
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

// Composables
const { 
  wishlists, 
  isLoading, 
  error, 
  fetchWishlist, 
  deleteMultipleWishlist, 
  deleteAllWishlist 
} = useWishlist()

// Lấy danh sách từ API
onMounted(async () => {
  await fetchWishlist()
})

// PAGINATION
const currentPage = ref(1)
const perPage = 6
const totalPages = computed(() => Math.ceil(wishlists.value.length / perPage))
const paginatedWishlists = computed(() =>
  wishlists.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const nextPage = () => { 
  if (currentPage.value < totalPages.value) currentPage.value++ 
}
const prevPage = () => { 
  if (currentPage.value > 1) currentPage.value-- 
}

// CHỌN SẢN PHẨM
const isSelecting = ref(false)
const selectedProductIds = ref<number[]>([])

// KIỂM TRA XEM TẤT CẢ SẢN PHẨM TRONG TRANG ĐÃ ĐƯỢC CHỌN CHƯA
const isAllPageSelected = computed(() => {
  if (paginatedWishlists.value.length === 0) return false
  return paginatedWishlists.value.every(item => 
    selectedProductIds.value.includes(item.product.product_id)
  )
})

const toggleSelectMode = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedProductIds.value = []
}

// CHỌN/BỎ CHỌN TẤT CẢ TRONG TRANG HIỆN TẠI
const toggleSelectAllPage = () => {
  const pageProductIds = paginatedWishlists.value.map(item => item.product.product_id)
  
  if (isAllPageSelected.value) {
    // Bỏ chọn tất cả trong trang
    selectedProductIds.value = selectedProductIds.value.filter(
      id => !pageProductIds.includes(id)
    )
  } else {
    // Chọn tất cả trong trang (chỉ thêm những cái chưa có)
    pageProductIds.forEach(id => {
      if (!selectedProductIds.value.includes(id)) {
        selectedProductIds.value.push(id)
      }
    })
  }
}

// CHỌN/BỎ CHỌN TỪNG SẢN PHẨM
const toggleSelectProduct = (productId: number, isSelected: boolean) => {
  if (isSelected) {
    if (!selectedProductIds.value.includes(productId)) {
      selectedProductIds.value.push(productId)
    }
  } else {
    const index = selectedProductIds.value.indexOf(productId)
    if (index > -1) {
      selectedProductIds.value.splice(index, 1)
    }
  }
}

// XÓA SẢN PHẨM ĐÃ CHỌN
const removeSelected = async () => {
  if (selectedProductIds.value.length === 0) return
  
  if (confirm(`Bạn có chắc muốn xóa ${selectedProductIds.value.length} sản phẩm khỏi yêu thích?`)) {
    const success = await deleteMultipleWishlist(selectedProductIds.value)
    if (success) {
      selectedProductIds.value = []
      isSelecting.value = false
    } else {
      alert('❌ Xóa thất bại!')
    }
  }
}


// XÓA TẤT CẢ
const removeAllWishlist = async () => {
  if (wishlists.value.length === 0) return
  
  if (confirm('Bạn có chắc muốn xóa TẤT CẢ sản phẩm khỏi yêu thích?')) {
    const success = await deleteAllWishlist()
    if (!success) {
      alert('❌ Xóa thất bại!')
    }
    // ✅ KHÔNG gọi fetchWishlist() - đã xử lý trong composable
  }
}

// 🎯 EVENT HANDLER - CHỈ XỬ LÝ PAGINATION
const handleItemRemoved = (productId: number) => {
  console.log('✅ Item removed in parent, current page items:', paginatedWishlists.value.length)
  
  // Reset về trang trước nếu trang hiện tại không còn item nào
  if (paginatedWishlists.value.length === 0 && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1
  }
}

// 🎯 THEO DÕI THAY ĐỔI CỦA WISHLISTS
watch(
  () => wishlists.value.length,
  (newLength, oldLength) => {
    console.log(`🔄 Wishlist count changed: ${oldLength} → ${newLength}`)
    if (paginatedWishlists.value.length === 0 && currentPage.value > 1) {
      currentPage.value = Math.max(1, currentPage.value - 1)
    }
  }
)
</script>