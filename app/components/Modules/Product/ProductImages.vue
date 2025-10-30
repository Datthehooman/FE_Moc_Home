<template>
  <div class="flex flex-col ">
    <!-- TEMPLATE: ảnh chính -->
    <div
      class="relative w-[520px] h-[473px] border border-black/50 rounded-xl flex justify-center items-center overflow-hidden group"
    >
      <!-- LEAVING IMAGE -->
      <img
        v-if="animating"
        :src="images[currentIndex]"
        alt="leaving"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.55,0.08,0.68,0.53)]"
        :class="{
          'translate-x-0': !incomingAtCenter,
          '-translate-x-full opacity-0': direction === 'left' && incomingAtCenter,
          'translate-x-full opacity-0': direction === 'right' && incomingAtCenter
        }"
      />

      <!-- INCOMING IMAGE -->
      <img
        v-if="nextIndex !== null"
        :src="images[nextIndex]"
        alt="incoming"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.55,1)]"
        :class="{
          'translate-x-full opacity-0': direction === 'left' && !incomingAtCenter,
          '-translate-x-full opacity-0': direction === 'right' && !incomingAtCenter,
          'translate-x-0 opacity-100': incomingAtCenter
        }"
      />

      <!-- STATIC -->
      <img
        v-if="!animating && nextIndex === null"
        :src="images[currentIndex]"
        alt="current"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 translate-x-0 opacity-100"
      />

      <!-- Nút trái -->
      <button
        @click="goPrev"
        class="absolute left-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary"
        aria-label="previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Nút phải -->
      <button
        @click="goNext"
        class="absolute right-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary"
        aria-label="next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- ẢNH PHỤ -->
    <div class="flex justify-start mt-4 space-x-3 w-[520px]">
      <div
        v-for="(img, i) in images"
        :key="i"
        @click="changeImage(i)"
        :class="[
          'w-[118px] h-[118px] border rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200',
          currentIndex === i ? 'border-[#6E4E37]' : 'border-black/50 hover:border-[#edb173]'
        ]"
      >
        <img :src="img" class="w-[90px] h-[90px] object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '~/composables/useProduct'

const { productDetail, fetchProductDetail } = useProduct()
const route = useRoute()
const slug = route.params.slug as string

// MẢNG ẢNH DÙNG CHO SLIDER
const images = ref<string[]>([])

onMounted(() => {
  fetchProductDetail(slug)
})

// Khi dữ liệu sản phẩm trả về → lấy ảnh vào slider
watch(
  () => productDetail.value,
  (val) => {
    if (!val) return

    const arr: string[] = []

    if (val.thumbnail) arr.push(val.thumbnail)
    if (val.images?.length) arr.push(...val.images.map(img => img.full_image_url))

    images.value = arr
    currentIndex.value = 0 // reset ảnh khi load xong
  },
  { immediate: true }
)



// ================== SLIDER ==================
const currentIndex = ref(0)
const nextIndex = ref<number | null>(null)
const animating = ref(false)
const direction = ref<'left' | 'right'>('left')
const incomingAtCenter = ref(false)

const startAnimation = (targetIndex: number) => {
  animating.value = true
  nextIndex.value = targetIndex
  incomingAtCenter.value = false
  setTimeout(() => (incomingAtCenter.value = true), 20)
  setTimeout(() => {
    currentIndex.value = targetIndex
    animating.value = false
    nextIndex.value = null
    incomingAtCenter.value = false
  }, 520)
}

const goNext = () => {
  if (animating.value || images.value.length <= 1) return
  direction.value = 'left'
  startAnimation((currentIndex.value + 1) % images.value.length)
}

const goPrev = () => {
  if (animating.value || images.value.length <= 1) return
  direction.value = 'right'
  startAnimation((currentIndex.value - 1 + images.value.length) % images.value.length)
}

const changeImage = (i: number) => {
  if (animating.value || i === currentIndex.value) return
  direction.value = i > currentIndex.value ? 'left' : 'right'
  startAnimation(i)
}
</script>