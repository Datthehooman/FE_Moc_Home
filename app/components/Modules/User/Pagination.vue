<template>
  <div v-if="totalPages > 1" class="flex justify-center mt-5 gap-2">

    <!-- Prev -->
    <button 
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-[#6E4E37]'"
    >
      ‹
    </button>

    <!-- Loop all pages -->
    <button
      v-for="page in pages"
      :key="page"
      @click="$emit('go', page)"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === page ? 'bg-[#6E4E37]' : 'bg-black hover:bg-[#6E4E37]'"
    >
      {{ page }}
    </button>

    <!-- Next -->
    <button 
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-[#6E4E37]'"
    >
      ›
    </button>

  </div>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  pagesAround: { type: Number, default: 2 }
})

// Tạo list số trang hiển thị
const pages = computed(() => {
  const arr = []

  const start = Math.max(1, props.currentPage - props.pagesAround)
  const end = Math.min(props.totalPages, props.currentPage + props.pagesAround)

  for (let p = start; p <= end; p++) {
    arr.push(p)
  }

  return arr
})
</script>
