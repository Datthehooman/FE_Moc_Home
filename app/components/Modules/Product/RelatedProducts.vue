<template>
  <div class="max-w-[100%] mx-auto px-4 relative mt-10">
    <ModulesProductTitle title="Sản phẩm liên quan" />

    <!-- DANH SÁCH SẢN PHẨM -->
    <div class="relative" ref="containerRef">
      <!-- Nút trái -->
      <button
        @click="prevSlide"
        class="absolute left-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition shadow-lg"
      >
        ‹
      </button>

      <!-- KHUNG TRƯỢT -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out gap-[20px]"
          :style="{
            transform: `translateX(-${relatedIndex * (itemWidth + gap)}px)`,
          }"
        >
          <ModulesProductCartProduct
            v-for="(product, i) in products"
            :key="i"
            :product="product"
            :itemWidth="itemWidth"
            @view="viewProduct"
          />
        </div>
      </div>

      <!-- Nút phải -->
      <button
        @click="nextSlide"
        class="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition"
      >
        ›
      </button>
    </div>

    <!-- Overlay xem nhanh sản phẩm -->
    <ModulesProductQuickViewOverlay
      :show="showOverlay"
      :product="currentProduct"
      @close="showOverlay = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface Product {
  name: string
  image: string
  oldPrice: string
  price: string
  badge?: string
  star: number
}

// Sản phẩm mẫu
const relatedProducts: Product[] = [
  { name: 'Ghế Denim đơn giản', image: 'https://live.themewild.com/fameo/assets/img/product/01.png', oldPrice: '250.000 đ', price: '190.000 đ', badge: 'Mới', star: 5 },
  { name: 'Ghế gỗ cao cấp', image: 'https://live.themewild.com/fameo/assets/img/product/02.png', oldPrice: '310.000 đ', price: '250.000 đ', badge: 'Hot', star: 4 },
  { name: 'Ghế sofa mini', image: 'https://live.themewild.com/fameo/assets/img/product/03.png', oldPrice: '270.000 đ', price: '210.000 đ', badge: 'Hot', star: 3 },
  { name: 'Ghế đọc sách', image: 'https://live.themewild.com/fameo/assets/img/product/04.png', oldPrice: '290.000 đ', price: '220.000 đ', badge: 'Giảm 50%', star: 2 },
  { name: 'Ghế thư giãn', image: 'https://live.themewild.com/fameo/assets/img/product/05.png', oldPrice: '260.000 đ', price: '200.000 đ', badge: 'Mới', star: 1 },
  { name: 'Ghế phòng khách', image: 'https://live.themewild.com/fameo/assets/img/product/06.png', oldPrice: '300.000 đ', price: '240.000 đ', badge: 'Hot', star: 5 },
  { name: 'Ghế bọc da sang trọng', image: 'https://live.themewild.com/fameo/assets/img/product/07.png', oldPrice: '350.000 đ', price: '290.000 đ', badge: 'Mới', star: 5 },
]

// Dùng luôn sản phẩm mẫu
const products = ref<Product[]>(relatedProducts)

// Slider
const relatedIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const itemWidth = ref(0)
const visibleCount = ref(5)
const gap = 20

const updateItemWidth = () => {
  if (!containerRef.value) return
  const containerWidth = containerRef.value.clientWidth

  if (containerWidth < 640) visibleCount.value = 1
  else if (containerWidth < 1024) visibleCount.value = 3
  else visibleCount.value = 5

  itemWidth.value = (containerWidth - (visibleCount.value - 1) * gap) / visibleCount.value
}

onMounted(async () => {
  await nextTick()
  updateItemWidth()
  window.addEventListener('resize', updateItemWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemWidth)
})

const nextSlide = () => {
  relatedIndex.value = Math.min(
    relatedIndex.value + 1,
    Math.max(0, products.value.length - visibleCount.value)
  )
}
const prevSlide = () => {
  relatedIndex.value = Math.max(relatedIndex.value - 1, 0)
}

// Overlay xem nhanh
const showOverlay = ref(false)
const currentProduct = ref<Product>({
  image: '',
  name: '',
  oldPrice: '',
  price: '',
  star: 0,
  badge: '',
})

const viewProduct = (product: Product) => {
  currentProduct.value = { ...product }
  showOverlay.value = true
}
</script>
