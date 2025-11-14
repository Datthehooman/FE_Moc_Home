<!-- components/SearchBox.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-3 text-gray-700">Tìm kiếm</h3>
    <input
      type="text"
      v-model="modelValue"
      placeholder="Nhập tên sản phẩm..."
      class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-[#A77A5D]/30 focus:border-[#A77A5D] outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const modelValue = defineModel()
const emit = defineEmits(['update:modelValue'])

// Debounce để chờ 300ms sau khi gõ mới emit
let timeout: any = null
watch(modelValue, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('update:modelValue', val)
  }, 300)
})
</script>
