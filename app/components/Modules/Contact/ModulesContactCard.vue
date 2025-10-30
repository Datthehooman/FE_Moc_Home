<template>
  <div
    class="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform w-full"
  >
    <div class="bg-[#6E4E37] w-24 h-24 flex items-center justify-center rounded-full">
      <div v-html="iconSvg" class="w-12 h-12"></div>
    </div>
    <h3 class="font-semibold break-words w-full">{{ title }}</h3>
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

// Bộ icon line đồng bộ ✅ (stroke màu trắng, stroke-width 3 cho đậm vừa)
const icons = {
  home: `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" stroke="white" stroke-width="1" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-9 9 9v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11z"/>
</svg>
  `,
  phone: `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" stroke="white" stroke-width="1" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92V21a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 1 4.18 2 2 0 0 1 3 2h4.09a2 2 0 0 1 2 1.72c.12.81.36 1.6.71 2.34a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.12-.36a2 2 0 0 1 2.11-.45c.74.35 1.53.59 2.34.71a2 2 0 0 1 1.72 2z"/>
    </svg>
  `,
  envelope: `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" stroke="white" stroke-width="1" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <polyline points="3,7 12,13 21,7"/>
    </svg>
  `,
  clock: `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" stroke="white" stroke-width="1" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `
}

// chọn icon tương ứng
const iconSvg = computed(() => icons[props.icon] || icons.home)
</script>
