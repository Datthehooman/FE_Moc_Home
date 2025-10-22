<template>
  <div class="flex justify-center mt-6 gap-2">
    <!-- Prev -->
    <button
      @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
      :disabled="currentPage === 1"
      class="w-[39px] h-[39px] rounded-full flex items-center justify-center text-white bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Page numbers -->
    <button
      v-for="page in pagesToShow"
      :key="page + Math.random()"
      @click="$emit('update:currentPage', page)"
      v-if="page !== '...' "
      :class="[
        'w-[39px] h-[39px] rounded-full flex items-center justify-center text-white transition-colors',
        currentPage === page ? 'bg-[#6E4E37]' : 'bg-black hover:bg-gray-800'
      ]"
    >
      {{ page }}
    </button>

    <span v-for="page in pagesToShow" :key="'dots-'+page" v-if="page==='...'">...</span>

    <!-- Next -->
    <button
      @click="$emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
      :disabled="currentPage === totalPages"
      class="w-[39px] h-[39px] rounded-full flex items-center justify-center text-white bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

// Logic để hiển thị trang + ellipsis
const pagesToShow = computed(() => {
  const pages = []

  if (props.totalPages <= 5) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i)
  } else {
    // luôn có trang đầu
    pages.push(1)

    let start = Math.max(props.currentPage - 1, 2)
    let end = Math.min(props.currentPage + 1, props.totalPages - 1)

    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < props.totalPages - 1) pages.push('...')

    // luôn có trang cuối
    pages.push(props.totalPages)
  }

  return pages
})
</script>
