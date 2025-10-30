<template>
  <div class="min-h-screen p-6 max-w-[1200px] mx-auto">
    <div v-if="loadingDetail" class="text-center py-20 text-gray-500">
      Đang tải sản phẩm...
    </div>

    <div v-else-if="errorDetail" class="text-center py-20 text-red-500">
      {{ errorDetail }}
    </div>

    <div v-else-if="productDetail" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Ảnh sản phẩm -->
      <div>
        <img
          :src="productDetail.thumbnail"
          :alt="productDetail.product_name"
          class="w-full h-auto rounded-lg shadow-md"
        />
        <div class="mt-4 flex space-x-2">
          <img
            v-for="img in productDetail.images"
            :key="img.full_image_url"
            :src="img.full_image_url"
            :alt="img.alt_text"
            class="w-20 h-20 object-cover rounded-md border"
          />
        </div>
      </div>

      <!-- Thông tin sản phẩm -->
      <div>
        <h1 class="text-2xl font-bold mb-2">{{ productDetail.product_name }}</h1>
        <p class="text-gray-500 mb-2">{{ productDetail.brand }}</p>
        <p class="text-xl text-red-600 font-semibold mb-4">
          {{ formatPrice(productDetail.price_down) }}
          <span v-if="productDetail.price_down < productDetail.price" class="line-through text-gray-400 ml-2">
            {{ formatPrice(productDetail.price) }}
          </span>
        </p>
        <p class="mb-2"><strong>Mô tả:</strong> {{ productDetail.description }}</p>
        <p class="mb-2"><strong>Chất liệu:</strong> {{ productDetail.material }}</p>
        <p class="mb-2"><strong>Kích thước:</strong> {{ productDetail.size }}</p>
        <p class="mb-2"><strong>Màu sắc:</strong> {{ productDetail.color }}</p>
        <p class="mb-2"><strong>Trọng lượng:</strong> {{ productDetail.weight }} kg</p>
        <p class="mb-2"><strong>Kho hàng:</strong> {{ productDetail.stock_quantity }}</p>
        <p class="mb-2"><strong>Đánh giá:</strong> {{ productDetail.rating }} ⭐</p>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">
      Không tìm thấy sản phẩm
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '~/composables/useProduct'

const { productDetail, loadingDetail, errorDetail, fetchProductDetail } = useProduct()
const route = useRoute()
const slug = route.params.slug as string

onMounted(() => {
  fetchProductDetail(slug)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>

<style scoped>
/* thêm style nếu muốn */
</style>
