<template>
  <div
    class="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform w-full"
  >
    <!-- ICON -->
    <div class="bg-[#6E4E37] w-24 h-24 flex items-center justify-center rounded-full">
      <UIcon
        :name="icon"
        class="w-12 h-12 text-white"
      />
    </div>

    <!-- TITLE -->
    <h3 class="font-semibold break-words w-full">{{ title }}</h3>

    <!-- TEXT -->
    <p class="text-sm text-gray-600 whitespace-pre-line break-words w-full">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,  
  title: String,
  text: String,
})
</script>
