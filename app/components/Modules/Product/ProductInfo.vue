<template>
  <div class="flex-1 flex flex-col h-[591px]">
    <div v-if="loadingDetail" class="text-center py-10 text-gray-500">
      Đang tải sản phẩm...
    </div>

    <div v-else-if="errorDetail" class="text-center py-10 text-red-500">
      {{ errorDetail }}
    </div>

    <div v-else-if="productDetail">

      <h1 class="text-2xl font-bold text-gray-800">
        {{ productDetail.product_name }}
      </h1>

      <div class="flex items-center space-x-2 mt-2">
<div class="flex items-center space-x-1 mt-2">

  <!-- Sao đánh giá động -->
  <div class="flex items-center">
    <span
      v-for="i in 5"
      :key="i"
      class="text-lg"
      :class="i <= Math.round(productDetail.rating || 0) ? 'text-yellow-500' : 'text-gray-300'"
    >
      ★
    </span>
  </div>

  <!-- Số rating -->
  <span class="text-sm text-gray-500 ml-2">
    ({{ productDetail.rating || 0 }} ⭐)
  </span>
</div>

      </div>

      <!-- GIÁ -->
      <div class="mt-3">
        <span
          v-if="productDetail.price_down < productDetail.price"
          class="text-gray-400 line-through text-lg"
        >
          {{ formatPrice(productDetail.price) }}
        </span>

        <span class="text-primary font-bold text-2xl ml-2">
          {{ formatPrice(productDetail.price_down) }}
        </span>

        <span
          v-if="productDetail.price_down < productDetail.price"
          class="text-red-500 text-sm ml-2"
        >
          Giảm {{ discountPercent }}%
        </span>
      </div>

      <p class="text-gray-600 mt-3 leading-relaxed text-[15px]">
        {{ productDetail.description }}
      </p>

      <hr class="my-5 border-gray-300" />

      <!-- SỐ LƯỢNG + MÀU -->
      <div class="flex items-center space-x-8 mb-6">
        <div>
          <label class="block text-sm mb-1 text-gray-700 text-[15px]">Số lượng</label>
          <div class="flex items-center space-x-3">
            <button
              @click="decreaseQuantity"
              class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"
            >
              -
            </button>

            <span class="text-lg font-medium w-6 text-center">{{ quantity }}</span>

            <button
              @click="increaseQuantity"
              class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"
            >
              +
            </button>
          </div>
        </div>

        <!-- MÀU (nếu API có trả màu) -->
        <div v-if="productDetail.color">
          <label class="block text-sm mb-1 text-[15px] text-gray-700">Màu sắc</label>
          <div class="flex space-x-2">
            <div
              v-for="(color, i) in colors"
              :key="i"
              class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            >
              <svg
                v-if="selectedColor === color"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute inset-0 w-4 h-4 m-auto text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- THÔNG TIN NHỎ -->
      <ul class="text-sm text-gray-600 space-y-3 text-[15px]">
        <li><b>Tình trạng hàng:</b> {{ productDetail.stock_quantity > 0 ? 'Sẵn sàng giao' : 'Hết hàng' }}</li>
        <li><b>Mã sản phẩm:</b> {{ productDetail.sku || 'Không có' }}</li>
        <li><b>Danh mục:</b> {{ productDetail.category_name }}</li>
        <li><b>Thương hiệu:</b> {{ productDetail.brand }}</li>
      </ul>

      <hr class="my-5 border-gray-300" />

      <!-- NÚT -->
    <!-- NÚT -->
<div class="flex space-x-3 mt-6">

 <!-- NÚT THÊM GIỎ HÀNG -->
<button
  @click="handleAddToCart"
  class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
>
  <span class="absolute inset-0 flex justify-center items-center">
    <span
      class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
    ></span>
  </span>
  <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">
    Thêm giỏ hàng
  </span>
</button>


  <!-- Mua ngay -->
  <button
    class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500"
  >
    <span class="absolute inset-0 flex justify-center items-center">
      <span
        class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
      ></span>
    </span>
    <span
      class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300"
    >
    <a href="/checkout">
      Mua ngay</a>
    </span>
  </button>

  <!-- Icon like -->
  <button
    class="relative overflow-hidden w-[50px] h-[50px] bg-primary rounded-lg text-white shadow flex justify-center items-center group transition-colors duration-500"
  >
    <span class="absolute inset-0 flex justify-center items-center">
      <span
        class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
      ></span>
    </span>
    <svg
      class="relative z-10 w-5 h-4 group-hover:text-white transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"></path>
    </svg>
  </button>

</div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { addToCart } = useCart()

const handleAddToCart = async () => {
  if (!productDetail.value?.product_id) {
    alert('❌ Sản phẩm không hợp lệ')
    return
  }

  try {
    const result = await addToCart(productDetail.value.product_id, quantity.value)
    if (result) alert('✅ Đã thêm vào giỏ hàng!')
    else alert('❌ Thêm giỏ hàng thất bại. Vui lòng thử lại.')
  } catch (error: any) {
    alert('❌ Lỗi khi thêm vào giỏ hàng: ' + (error?.message || 'Không rõ nguyên nhân'))
  }
}

// API
const { productDetail, loadingDetail, errorDetail, fetchProductDetail } = useProduct()
const route = useRoute()
const slug = route.params.slug as string

onMounted(() => {
  fetchProductDetail(slug)
})

// UI nhỏ
const quantity = ref(1)
const decreaseQuantity = () => { if (quantity.value > 1) quantity.value-- }
const increaseQuantity = () => { quantity.value++ }

// Màu test UI
const colors = ['#6E4E37', '#C68642', '#EAD2AC', '#A98467']
const selectedColor = ref(colors[0])

// Format giá
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

// % giảm
const discountPercent = computed(() => {
  if (!productDetail.value) return 0
  return Math.round(100 - (productDetail.value.price_down / productDetail.value.price) * 100)
})
</script>
