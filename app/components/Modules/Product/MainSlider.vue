<template>
  <div class="flex flex-col items-center">
    <div class="relative w-[520px] h-[473px] border border-black/50 rounded-xl flex justify-center items-center overflow-hidden group">
      <!-- LEAVING IMAGE -->
      <img
        v-if="animating"
        :src="images[currentIndex]"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500"
        :class="{
          'translate-x-0': !incomingAtCenter,
          '-translate-x-full opacity-0': direction === 'left' && incomingAtCenter,
          'translate-x-full opacity-0': direction === 'right' && incomingAtCenter,
        }"
      />
      <!-- INCOMING IMAGE -->
      <img
        v-if="nextIndex !== null"
        :src="images[nextIndex]"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500"
        :class="{
          'translate-x-full opacity-0': direction === 'left' && !incomingAtCenter,
          '-translate-x-full opacity-0': direction === 'right' && !incomingAtCenter,
          'translate-x-0 opacity-100': incomingAtCenter,
        }"
      />
      <!-- STATIC IMAGE -->
      <img
        v-if="!animating && nextIndex === null"
        :src="images[currentIndex]"
        class="absolute w-[400px] h-[400px] object-contain transition-transform translate-x-0 opacity-100"
      />

      <!-- BUTTONS -->
      <button @click="goPrev" class="absolute left-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button @click="goNext" class="absolute right-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- THUMBNAILS -->
    <div class="flex justify-start mt-4 space-x-3 w-[520px]">
      <div
        v-for="(img, i) in images"
        :key="i"
        @click="changeImage(i)"
        :class="[
          'w-[118px] h-[118px] border rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200',
          currentIndex === i ? 'border-[#6E4E37]' : 'border-black/50 hover:border-[#edb173]',
        ]"
      >
        <img :src="img" class="w-[90px] h-[90px] object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainSlider } from '~/composables/useMainSlider'

const images = [
  'https://live.themewild.com/fameo/assets/img/product/01.png',
  'https://live.themewild.com/fameo/assets/img/product/02.png',
  'https://live.themewild.com/fameo/assets/img/product/03.png',
  'https://live.themewild.com/fameo/assets/img/product/04.png',
]

const {
  currentIndex,
  nextIndex,
  animating,
  direction,
  incomingAtCenter,
  goNext,
  goPrev,
  changeImage,
} = useMainSlider(images)
</script>
