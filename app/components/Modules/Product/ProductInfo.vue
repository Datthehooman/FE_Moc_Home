<template>
  <div class="flex-1 flex flex-col h-[591px] relative">
    <div v-if="loadingDetail" class="text-center py-10 text-gray-500">
      Đang tải sản phẩm...
    </div>

    <div v-else-if="errorDetail" class="text-center py-10 text-red-500">
      {{ errorDetail }}
    </div>

    <div v-else-if="productDetail">

      <!-- Tên sản phẩm -->
      <h1 class="text-2xl font-bold text-gray-800">
        {{ productDetail.product_name }}
      </h1>

      <!-- Đánh giá sao -->
      <div class="flex items-center space-x-1 mt-2">
        <div class="flex items-center">
          <span v-for="i in 5" :key="i" class="text-lg"
                :class="i <= Math.round(productDetail.rating || 0) ? 'text-yellow-500' : 'text-gray-300'">
            ★
          </span>
        </div>
        <span class="text-sm text-gray-500 ml-2">
          ({{ productDetail.rating || 0 }} ⭐)
        </span>
      </div>

      <!-- Giá -->
      <div class="mt-3">
        <span v-if="productDetail.price_down < productDetail.price" class="text-gray-400 line-through text-lg">
          {{ formatPrice(productDetail.price) }}
        </span>
        <span class="text-primary font-bold text-2xl ml-2">
          {{ formatPrice(productDetail.price_down) }}
        </span>
        <span v-if="productDetail.price_down < productDetail.price" class="text-red-500 text-sm ml-2">
          Giảm {{ discountPercent }}%
        </span>
      </div>

      <!-- Mô tả -->
      <p class="text-gray-600 mt-3 leading-relaxed text-[15px]">
        {{ productDetail.description }}
      </p>

      <hr class="my-5 border-gray-300" />

      <!-- Số lượng + Màu -->
      <div class="flex items-center space-x-8 mb-6">
        <div>
          <label class="block text-sm mb-1 text-gray-700 text-[15px]">Số lượng</label>
          <div class="flex items-center space-x-3">
            <button @click="decreaseQuantity" class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold">-</button>
            <span class="text-lg font-medium w-6 text-center">{{ quantity }}</span>
            <button @click="increaseQuantity" class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold">+</button>
          </div>
        </div>

        <!-- <div v-if="productDetail.color">
          <label class="block text-sm mb-1 text-[15px] text-gray-700">Màu sắc</label>
          <div class="flex space-x-2">
            <div v-for="(color, i) in colors" :key="i"
                 class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
                 :style="{ backgroundColor: color }"
                 @click="selectedColor = color">
              <svg v-if="selectedColor === color" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-4 h-4 m-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Thông tin nhỏ -->
      <ul class="text-sm text-gray-600 space-y-3 text-[15px]">
        <li><b>Tình trạng hàng:</b> {{ productDetail.stock_quantity > 0 ? 'Sẵn sàng giao' : 'Hết hàng' }}</li>
        <li><b>Mã sản phẩm:</b> {{ productDetail.sku || 'Không có' }}</li>
        <li><b>Danh mục:</b> {{ productDetail.category_name }}</li>
        <li><b>Thương hiệu:</b> {{ productDetail.brand }}</li>
      </ul>

      <hr class="my-5 border-gray-300" />

      <!-- Nút hành động -->
      <div class="flex space-x-3 mt-6">

        <!-- Thêm giỏ hàng -->
        <button @click="handleAddToCart" class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
          <span class="absolute inset-0 flex justify-center items-center">
            <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span>
          </span>
          <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">Thêm giỏ hàng</span>
        </button>

        <!-- Mua ngay -->
        <button @click="handleBuyNow" class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500">
          <span class="absolute inset-0 flex justify-center items-center">
            <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span>
          </span>
          <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">Mua ngay</span>
        </button>
        <!-- 🎯 THÊM NÚT YÊU THÍCH -->
        <button @click="handleAddToWishlist" class="relative overflow-hidden px-5 py-3 bg-[#F7EEE9] text-[#6E4E37] rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500 border border-[#6E4E37]">
          <span class="absolute inset-0 flex justify-center items-center">
            <span class="w-1 h-1 bg-[#6E4E37] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span>
          </span>
          <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300 flex items-center gap-2">
            <UIcon name="i-heroicons-heart" class="w-5 h-5" />
            Yêu thích
          </span>
        </button>

      </div>
    </div>

    <!-- Toast thông báo thêm giỏ hàng -->
    <transition name="slide-fade">
      <div v-if="showToast" class="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Thêm giỏ hàng thành công!</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const slug = route.params.slug as string

// API
const { productDetail, loadingDetail, errorDetail, fetchProductDetail } = useProduct()
const { postWishlist } = useWishlist()
onMounted(() => fetchProductDetail(slug))


// UI
const quantity = ref(1)
const decreaseQuantity = () => { if(quantity.value>1) quantity.value-- }
const increaseQuantity = () => { quantity.value++ }

const colors = ['#6E4E37', '#C68642', '#EAD2AC', '#A98467']
const selectedColor = ref(colors[0])

const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
const discountPercent = computed(() => {
  if(!productDetail.value) return 0
  return Math.round(100 - (productDetail.value.price_down / productDetail.value.price) * 100)
})

// Cart / Checkout
const checkoutStore = useCheckoutStore()
const { addToCart } = useCart()

// Toast
const showToast = ref(false)

const handleAddToCart = async () => {
  if(!productDetail.value) return
  await addToCart(productDetail.value.product_id, quantity.value)

  // Hiển thị toast
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000) // 2s tự ẩn
}

const handleBuyNow = () => {
  if(!productDetail.value) { alert('❌ Sản phẩm không hợp lệ'); return }
  checkoutStore.setBuyNowItem({
    product_id: productDetail.value.product_id,
    product_name: productDetail.value.product_name,
    price: productDetail.value.price_down,
    quantity: quantity.value,
    color: selectedColor.value
  })
  router.push('/checkout')
}

// 🎯 HÀM THÊM VÀO YÊU THÍCH
const handleAddToWishlist = async () => {
  if (!productDetail.value) {
    alert('❌ Sản phẩm không hợp lệ')
    return
  }

  try {
    const success = await postWishlist(productDetail.value.product_id)
    
    if (success) {
      alert('✅ Đã thêm sản phẩm vào yêu thích!')
    } else {
      alert('❌ Không thể thêm vào yêu thích!')
    }
  } catch (error: any) {
    alert('❌ Lỗi khi thêm vào yêu thích: ' + (error?.message || 'Không rõ nguyên nhân'))
  }
}
</script>

<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
