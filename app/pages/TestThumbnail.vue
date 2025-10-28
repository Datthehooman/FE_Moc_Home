<template>
  <div class="p-6 bg-[#f9fafb] min-h-screen">
    <h2 class="text-2xl font-bold mb-6">🧩 Test hiển thị thumbnail từ API</h2>

    <div v-if="loading">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(p, index) in products"
        :key="index"
        class="bg-white rounded-xl p-4 shadow flex flex-col items-center text-center"
      >
        <img
          :src="p.thumbnail"
          :alt="p.product_name"
          class="w-[120px] h-[120px] object-cover rounded-md border"
          @error="onImageError($event)"
        />
        <p class="mt-2 font-semibold">{{ p.product_name }}</p>
        <p class="text-xs text-gray-500 break-all">{{ p.thumbnail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const products = ref<any[]>([])
const loading = ref(true)
const error = ref('')

const onImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=No+Image'
}

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/client/products')
    if (!res.ok) throw new Error(`Lỗi khi gọi API: ${res.status}`)
    const data = await res.json()

    console.log('🔍 API response:', data)

    // ✅ Dựa theo cấu trúc thực tế của API
    products.value = data?.result?.data || data?.data || []
  } catch (err: any) {
    error.value = err.message
    console.error('❌ Lỗi:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
body {
  font-family: sans-serif;
}
</style>
