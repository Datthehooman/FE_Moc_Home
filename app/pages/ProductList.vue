<template>
  <div class="bg-[#FFFBF8] min-h-screen p-6 max-w-[85%] mx-auto">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <ModulesProductCartProduct
            v-for="(product, i) in paginatedProducts"
            :key="i"
            :product="product"
            :itemWidth="itemWidth"
            @view="openQuickView(product)"
          />
        </div>

        <!-- Pagination -->
       <ModulesProductPagination
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  name: string
  image: string
  oldPrice: string
  price: string
  badge: string
  star: number
  category?: string
  brand?: string
}

// FULL products array
const products = ref<Product[]>([
  { name: 'Ghế Denim đơn giản', image: 'https://live.themewild.com/fameo/assets/img/product/01.png', oldPrice: '250.000 đ', price: '190.000 đ', badge: 'Mới', star: 5, category: 'Ghế', brand: 'Tovol' },
  { name: 'Ghế gỗ cao cấp', image: 'https://live.themewild.com/fameo/assets/img/product/02.png', oldPrice: '310.000 đ', price: '250.000 đ', badge: 'Hot', star: 4, category: 'Ghế', brand: 'Sundoy' },
  { name: 'Ghế sofa mini', image: 'https://live.themewild.com/fameo/assets/img/product/03.png', oldPrice: '270.000 đ', price: '210.000 đ', badge: 'Hot', star: 3, category: 'Sofa', brand: 'Sahoo Home' },
  { name: 'Ghế đọc sách', image: 'https://live.themewild.com/fameo/assets/img/product/04.png', oldPrice: '290.000 đ', price: '220.000 đ', badge: 'Giảm 50%', star: 2, category: 'Ghế', brand: 'Casterly' },
  { name: 'Ghế thư giãn', image: 'https://live.themewild.com/fameo/assets/img/product/05.png', oldPrice: '260.000 đ', price: '200.000 đ', badge: 'Mới', star: 1, category: 'Ghế', brand: 'Mainden Home' },
  { name: 'Ghế phòng khách', image: 'https://live.themewild.com/fameo/assets/img/product/06.png', oldPrice: '300.000 đ', price: '240.000 đ', badge: 'Hot', star: 5, category: 'Ghế', brand: 'Knroll Furniture' },
  { name: 'Sofa nệm êm ái', image: 'https://live.themewild.com/fameo/assets/img/product/07.png', oldPrice: '480.000 đ', price: '390.000 đ', badge: 'Giảm 20%', star: 4, category: 'Sofa', brand: 'Tovol' },
  { name: 'Sofa góc hiện đại', image: 'https://live.themewild.com/fameo/assets/img/product/08.png', oldPrice: '550.000 đ', price: '440.000 đ', badge: 'Hot', star: 5, category: 'Sofa', brand: 'Sundoy' },
  { name: 'Bàn cafe gỗ tròn', image: 'https://live.themewild.com/fameo/assets/img/product/09.png', oldPrice: '220.000 đ', price: '180.000 đ', badge: 'Mới', star: 3, category: 'Bàn', brand: 'Casterly' },
  { name: 'Bàn ăn 4 ghế', image: 'https://live.themewild.com/fameo/assets/img/product/10.png', oldPrice: '450.000 đ', price: '370.000 đ', badge: 'Giảm 10%', star: 4, category: 'Bàn', brand: 'Mainden Home' },
  { name: 'Tủ sách nhỏ gọn', image: 'https://live.themewild.com/fameo/assets/img/product/11.png', oldPrice: '280.000 đ', price: '240.000 đ', badge: 'Hot', star: 3, category: 'Tủ', brand: 'Knroll Furniture' },
  { name: 'Tủ quần áo lớn', image: 'https://live.themewild.com/fameo/assets/img/product/12.png', oldPrice: '700.000 đ', price: '560.000 đ', badge: 'Giảm 20%', star: 5, category: 'Tủ', brand: 'Sahoo Home' },
  { name: 'Kệ tivi gỗ tự nhiên', image: 'https://live.themewild.com/fameo/assets/img/product/13.png', oldPrice: '380.000 đ', price: '310.000 đ', badge: 'Mới', star: 4, category: 'Kệ', brand: 'Tovol' },
  { name: 'Kệ trang trí phòng khách', image: 'https://live.themewild.com/fameo/assets/img/product/14.png', oldPrice: '320.000 đ', price: '280.000 đ', badge: 'Hot', star: 5, category: 'Kệ', brand: 'Sundoy' },
  { name: 'Đèn bàn đọc sách', image: 'https://live.themewild.com/fameo/assets/img/product/15.png', oldPrice: '180.000 đ', price: '130.000 đ', badge: 'Mới', star: 4, category: 'Đèn', brand: 'Casterly' },
  { name: 'Đèn ngủ kiểu Nhật', image: 'https://live.themewild.com/fameo/assets/img/product/16.png', oldPrice: '220.000 đ', price: '170.000 đ', badge: 'Giảm 15%', star: 5, category: 'Đèn', brand: 'Mainden Home' },
  { name: 'Gương tròn treo tường', image: 'https://live.themewild.com/fameo/assets/img/product/17.png', oldPrice: '150.000 đ', price: '120.000 đ', badge: 'Hot', star: 3, category: 'Trang trí', brand: 'Knroll Furniture' },
  { name: 'Thảm trải sàn cao cấp', image: 'https://live.themewild.com/fameo/assets/img/product/18.png', oldPrice: '260.000 đ', price: '210.000 đ', badge: 'Mới', star: 5, category: 'Trang trí', brand: 'Sahoo Home' },
  { name: 'Kệ giày gỗ', image: 'https://live.themewild.com/fameo/assets/img/product/19.png', oldPrice: '200.000 đ', price: '170.000 đ', badge: 'Hot', star: 4, category: 'Kệ', brand: 'Tovol' },
  { name: 'Bàn làm việc nhỏ gọn', image: 'https://live.themewild.com/fameo/assets/img/product/20.png', oldPrice: '350.000 đ', price: '290.000 đ', badge: 'Giảm 15%', star: 5, category: 'Bàn', brand: 'Sundoy' },
  { name: 'Ghế xoay văn phòng', image: 'https://live.themewild.com/fameo/assets/img/product/21.png', oldPrice: '400.000 đ', price: '330.000 đ', badge: 'Hot', star: 4, category: 'Ghế', brand: 'Mainden Home' },
])

// State lọc + sort
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const sortOption = ref('Mặc định')

// Phân trang
const currentPage = ref(1)
const itemsPerPage = 6
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

// Chuyển giá sang số
const parsePrice = (priceStr: string) => Number(priceStr.replace(/\D/g, ''))

// Computed lọc & sort
const filteredProducts = computed(() => {
  let result = products.value
  if (sortOption.value === 'Tên A-Z')
    result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }))
  else if (sortOption.value === 'Tên Z-A')
    result = [...result].sort((a, b) => b.name.localeCompare(a.name, 'vi', { sensitivity: 'base' }))
  else if (sortOption.value === 'Giá tăng dần')
    result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
  else if (sortOption.value === 'Giá giảm dần')
    result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  return result
})

// Computed phân trang
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Xem sản phẩm
const viewProduct = (product: Product) => {
  console.log('Xem sản phẩm', product)
}

// Overlay Quick View
const showQuickView = ref(false)
const selectedProduct = ref<Product>({
  name: '',
  image: '',
  oldPrice: '',
  price: '',
  badge: '',
  star: 0,
  category: '',
  brand: '',
})


const openQuickView = (product: Product) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const closeQuickView = () => {
  showQuickView.value = false
}
</script>
