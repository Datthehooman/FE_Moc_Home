<template>
  <div class="flex justify-center mt-5 gap-2">

    <!-- Prev -->
    <button 
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-[#6E4E37]'"
    >
      ‹
    </button>

    <!-- Page 1 -->
    <button
      @click="$emit('go', 1)"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === 1 ? 'bg-[#6E4E37]' : 'bg-black hover:bg-[#6E4E37]'"
    >
      1
    </button>

    <span v-if="currentPage > 3" class="text-gray-500">...</span>

    <!-- Pages around -->
    <button
      v-for="p in pagesAround"
      :key="p"
      @click="$emit('go', p)"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === p ? 'bg-[#6E4E37]' : 'bg-black hover:bg-[#6E4E37]'"
    >
      {{ p }}
    </button>

    <span v-if="currentPage < totalPages - 2" class="text-gray-500">...</span>

    <!-- Last page -->
    <button
      v-if="totalPages > 1"
      @click="$emit('go', totalPages)"
      class="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"
      :class="currentPage === totalPages ? 'bg-[#6E4E37]' : 'bg-black hover:bg-[#6E4E37]'"
    >
      {{ totalPages }}
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
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  pagesAround: Array
})
</script>
