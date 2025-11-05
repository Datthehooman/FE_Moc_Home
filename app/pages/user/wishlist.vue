<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">

        <section class="bg-white rounded-xl p-5 shadow mb-6">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Danh sách sản phẩm yêu thích</h3>

            <div class="flex items-center gap-3">

              <!-- NÚT XÓA -->
              <button
                v-if="isSelecting && selectedList.length"
                @click="removeSelected"
                class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Xóa khỏi yêu thích
              </button>

              <!-- NÚT CHỌN -->
              <button
                class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
                @click="selectProduct"
              >
                <span class="relative z-10 text-[15px] transition-colors duration-300">
                  {{ isSelecting ? 'Hủy chọn' : 'Chọn sản phẩm' }}
                </span>
              </button>

            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- LIST SẢN PHẨM -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
           <ModulesUserCartWishlist 
  v-for="(item, index) in paginatedFavorites" 
  :key="index" 
  :data="item"
  :select-mode="isSelecting"
  :selected="selectedList.includes(item)"
  @toggle="toggleSelect(item)"
  @view="openOverview"
+ @remove="removeOne(item)"
/>

          </div>

          <!-- PHÂN TRANG -->
          <ModulesUserPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => currentPage = p"
          />
        </section>

        <!-- POPUP OVERVIEW -->
        <ModulesProductQuickViewOverlay
          :show="showOverview"
          :product="selectedProduct"
          @close="closeOverview"
        />

      </main>

    </div>
  </div>    
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const perPage = 6

const favoriteProducts = ref([
  { product_name: "Bình gốm nghệ thuật", price: 350000, price_old: 450000, badge: "Mới", rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/01.png", stock_quantity: 10 },
  { product_name: "Ghế gỗ tự nhiên", price: 1250000, rating: 5, badge: "Hot", thumbnail: "https://live.themewild.com/fameo/assets/img/product/02.png", stock_quantity: 5 },
  { product_name: "Bộ ly thủy tinh cao cấp", price: 220000, price_old: 350000, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/03.png", stock_quantity: 30 },
  { product_name: "Tranh treo tường phong cách Nhật", price: 780000, rating: 5, thumbnail: "https://live.themewild.com/fameo/assets/img/product/04.png", stock_quantity: 8 },
  { product_name: "Kệ gỗ decor", price: 450000, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/05.png", stock_quantity: 12 },
  { product_name: "Chậu cây mini", price: 150000, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/06.png", stock_quantity: 14 },
  { product_name: "Đèn ngủ gốm", price: 560000, rating: 5, thumbnail: "https://live.themewild.com/fameo/assets/img/product/07.png", stock_quantity: 6 },
])

const totalPages = computed(() => Math.ceil(favoriteProducts.value.length / perPage))

const paginatedFavorites = computed(() =>
  favoriteProducts.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const pagesAround = computed(() => {
  let arr = []
  let p = currentPage.value
  let t = totalPages.value
  for (let i = p - 1; i <= p + 1; i++) {
    if (i > 1 && i < t) arr.push(i)
  }
  return arr
})

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

const showOverview = ref(false)
const selectedProduct = ref(null)

const openOverview = (product) => {
  selectedProduct.value = product
  showOverview.value = true
}

const closeOverview = () => {
  showOverview.value = false
}

const isSelecting = ref(false)
const selectedList = ref([])

const selectProduct = () => {
  isSelecting.value = !isSelecting.value
  if (!isSelecting.value) selectedList.value = []
}

const toggleSelect = (product) => {
  if (selectedList.value.includes(product)) {
    selectedList.value = selectedList.value.filter(p => p !== product)
  } else {
    selectedList.value.push(product)
  }
}

const removeSelected = () => {
  favoriteProducts.value = favoriteProducts.value.filter(p => !selectedList.value.includes(p))
  selectedList.value = []
  isSelecting.value = false
}
const removeOne = (product) => {
  favoriteProducts.value = favoriteProducts.value.filter(p => p !== product)

  // Nếu sản phẩm đó đang được chọn trong chế độ chọn → cũng xóa khỏi selectedList
  selectedList.value = selectedList.value.filter(p => p !== product)
}

</script>
