<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
  >
    <div class="bg-white w-[750px] rounded-[15px] relative p-4 flex">
      <!-- Nút đóng -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary hover:bg-[#F05454] flex items-center justify-center text-white text-xl font-bold transition-colors z-10"
        aria-label="Đóng"
      >
        &times;
      </button>

      <!-- Ảnh sản phẩm -->
      <div class="w-1/2 flex items-center justify-center p-4">
        <img :src="product.image" alt="" class="object-contain max-h-96 w-full rounded-lg" />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="w-1/2 p-4 pt-10 space-y-3">
        <h2 class="text-2xl font-bold text-gray-800">{{ product.name }}</h2>

        <div class="flex items-center space-x-2">
          <div class="flex">
            <svg
              v-for="n in 5"
              :key="n"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              :class="n <= product.star ? 'text-yellow-400' : 'text-gray-300'"
            >
              <path
                fill-rule="evenodd"
                d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"
              />
            </svg>
            <p class="text-gray-400 text-[16px] ml-[5px]">(4 người đánh giá)</p>
          </div>
        </div>

        <div class="flex items-baseline space-x-2 my-4">
          <p class="line-through text-gray-400 text-[16px]">{{ product.oldPrice }}</p>
          <p class="text-3xl font-bold text-primary text-[24px]">{{ product.price }}</p>
        </div>

        <div class="space-y-2 text-base">
          <p><span class="text-gray-500">Thương hiệu:</span> <span class="font-semibold text-gray-700 ml-1">Ricordi</span></p>
          <p><span class="text-gray-500">Loại:</span> <span class="font-bold text-gray-700 ml-1">Phòng khách</span></p>
          <p><span class="text-gray-500">Hàng có sẵn:</span> <span class="font-bold text-primary ml-1">Có sẵn</span></p>
          <p><span class="text-gray-500">Mã số:</span> <span class="font-semibold text-gray-700 ml-1">789FGSA</span></p>
        </div>

        <button
          class="relative overflow-hidden mt-3 px-6 py-3 bg-[#EDB173] text-black font-semibold rounded-lg shadow-md flex justify-center items-center group"
        >
          <span class="absolute inset-0 flex justify-center items-center">
            <span
              class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
            ></span>
          </span>
          <span class="relative group-hover:text-white text-[16px] font-semibold">
            Thêm giỏ hàng
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Product {
  name: string
  image: string
  oldPrice: string
  price: string
  star: number
}

const props = defineProps<{
  show: boolean
  product: Product
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
