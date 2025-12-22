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
              <UPopover v-if="wishlists.length > 0">
                <button
                  class="px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition disabled:opacity-50"
                  :disabled="isLoading"
                >
                  Xóa tất cả
                </button>

                <template #content="{ close }">
                  <div class="p-4 text-center w-56">
                    <p class="text-sm font-semibold mb-3 text-gray-700">Xóa sạch danh sách?</p>
                    <UButton
                      label="Xác nhận"
                      color="neutral"
                      size="xs"
                      block
                      :loading="isLoading"
                      @click="removeAllWishlist(close as any)"
                    />
                  </div>
                </template>
              </UPopover>

              <UPopover v-if="isSelecting && selectedList.length > 0">
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition disabled:opacity-50"
                  :disabled="isLoading"
                >
                  Xóa mục đã chọn ({{ selectedList.length }})
                </button>

                <template #content="{ close }">
                  <div class="p-4 text-center w-56">
                    <p class="text-sm font-semibold mb-3 text-gray-700">
                      Xóa {{ selectedList.length }} sản phẩm?
                    </p>
                    <UButton
                      label="Xác nhận xóa"
                      color="error"
                      size="xs"
                      block
                      :loading="isLoading"
                      @click="removeSelected(close as any)"
                    />
                  </div>
                </template>
              </UPopover>

              <button
                v-if="wishlists.length > 0"
                @click="isSelecting = !isSelecting"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
              >
                {{ isSelecting ? 'Hủy chọn' : 'Chọn mục' }}
              </button>
            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4" />

          <!-- THÔNG BÁO KHI ĐANG CHỌN -->
          <div v-if="isSelecting && selectedList.length > 0" class="mb-4 p-3 bg-blue-50 rounded-lg">
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
              color="error" 
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
              <p class="text-sm text-gray-500 mb-4">Hãy thêm sản phẩm bạn yêu thích vào đây!</p>
              <UButton 
                to="/ProductList" 
                color="primary" 
                variant="solid"
              >
                Khám phá sản phẩm
              </UButton>
            </div>
          </div>

          <!-- LIST -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            <div 
              v-for="item in paginatedWishlists" 
              :key="item.product_id"
              class="relative"
            >
              <!-- CHECKBOX KHI CHẾ ĐỘ CHỌN -->
              <div v-if="isSelecting" class="absolute top-3 left-3 z-30">
                <input
                  type="checkbox"
                  :checked="selectedList.includes(item)"
                  @change="toggleSelectItem(item)"
                  class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
              
              <ModulesUserCartWishlist
                :item="item"
                :itemWidth="250"
                @wishlist-updated="handleWishlistUpdated"
              />
            </div>
          </div>

          <!-- THÔNG BÁO TRANG TRỐNG -->
          <div v-if="paginatedWishlists.length === 0 && wishlists.length > 0" class="text-center text-gray-500 py-10">
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

          <!-- PHÂN TRANG -->
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
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' })

import { ref, computed, onMounted, watch } from 'vue'

// 🟢 SỬA: Dùng composable mới với hàm đã đổi tên
const { 
  wishlists, 
  isLoading, 
  error, 
  fetchWishlist, 
  removeMultipleFromWishlist, 
  clearWishlist, 
  getWishlistCount 
} = useWishlist()

// 🟢 FETCH DỮ LIỆU KHI MOUNT
onMounted(() => {
  console.log('🟢 Wishlist page mounted, fetching data...')
  fetchWishlist()
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
const selectedList = ref<Wishlist[]>([])

const toggleSelectMode = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedList.value = []
}

const toggleSelectItem = (item: Wishlist) => {
  const index = selectedList.value.findIndex(selected => selected.product_id === item.product_id)
  if (index > -1) {
    selectedList.value.splice(index, 1)
  } else {
    selectedList.value.push(item)
  }
}


const handleWishlistUpdated = async () => {
  console.log('🟢 Received wishlist-updated event, refetching data...')
 await fetchWishlist()
}


// 🟢 GIỮ NGUYÊN TÊN HÀM: Xóa các mục đã chọn
const removeSelected = async (closePopover?: any) => {
  if (selectedList.value.length === 0) return
  
  const productIds = selectedList.value.map(item => item.product_id)
  
  isLoading.value = true
  try {
    const success = await removeMultipleFromWishlist(productIds)
    if (success) {
      selectedList.value = []
      isSelecting.value = false
      // Đóng popover nếu có hàm close truyền vào
      if (closePopover) closePopover()
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

// 🟢 SỬA: Dùng hàm mới clearWishlist
const removeAllWishlist = async (closePopover?: any) => {
  if (wishlists.value.length === 0) return
  
  isLoading.value = true
  try {
    const success = await clearWishlist()
    if (success) {

      // Đóng popover nếu có hàm close truyền vào
      if (closePopover) closePopover()
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

// 🟢 THEO DÕI THAY ĐỔI CỦA WISHLISTS ĐỂ ĐIỀU CHỈNH PAGINATION
watch(
  () => wishlists.value.length,
  (newLength, oldLength) => {
    console.log('🟢 Wishlist length changed:', oldLength, '->', newLength)
    if (paginatedWishlists.value.length === 0 && currentPage.value > 1) {
      currentPage.value = Math.max(1, currentPage.value - 1)
    }
  },
  { deep: true }
)

// 🟢 COMPUTED CHO SỐ LƯỢNG WISHLIST
const wishlistCount = computed(() => getWishlistCount())
</script>