<template>
  <div class="relative w-full h-[476px]">
    <img src="/Banner 1.png" class="w-full" alt="Banner 1" />
    <UCarousel
      v-slot="{ item }"
      :items="items"
      dots
      loop
      arrows
      class="absolute inset-0 top-[28px]"
      :autoplay="{ delay: 2000 }"
      :prev="{
        color: 'primary',
        icon: 'i-lucide-chevron-left',
        variant: 'soft',
        ui: {
          base: 'bg-white hover:bg-primary text-primary hover:text-white',
        },
      }"
      :next="{
        color: 'primary',
        icon: 'i-lucide-chevron-right',
        variant: 'soft',
        ui: {
          base: 'bg-white hover:bg-primary text-primary hover:text-white',
        },
      }"
      :ui="{
        viewport: 'mx-[65px]',
        dot: [
          'bg-white',
          'size-2',
          'data-[state=active]:w-5',
          'data-[state=active]:h-2',
          'data-[state=active]:bg-white',
        ],
        dots: 'bottom-7',
        arrows: 'absolute right-20 z-10', // Add padding to arrows container
        prev: 'z-20',
        next: ' z-20',
      }"
    >
      <div class="bg-transparent grid grid-cols-2 relative">
        <div
          class="absolute size-[40px] rounded-full bg-white top-30 right-[380px] text-primary flex justify-center items-center text-center"
        >
          <UIcon name="i-lucide-plus" class="text-2xl" />
        </div>
        <div class="pt-[65px]">
          <div
            class="h-[33px] w-fit [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%)] rounded-l-full uppercase bg-info font-bold flex items-center pl-4 pr-8.5 mb-5.5"
          >
            CHÀO MỪNG ĐẾN VỚI MỘC HOME!
          </div>
          <div class="text-[42px] font-bold text-white mb-4">
            <p>Nội thất <span class="text-info">hiện đại</span></p>
            <p>Nâng tầm không gian sống</p>
          </div>
          <p class="text-white leading-7 mb-[29px]">
            Thiết kế tinh tế, chất lượng bền bỉ, mang đến sự tiện nghi và phong
            cách cho ngôi nhà của bạn.
          </p>
          <div class="flex items-center gap-4.5">
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
              ></span>
              <span
                class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
              >
                <span>Mua ngay</span>
                <UIcon name="i-lucide-arrow-right"></UIcon>
              </span>
            </UButton>
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-white/20 text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
              ></span>
              <span
                class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
              >
                <span>Mua ngay</span>
                <UIcon name="i-lucide-arrow-right"></UIcon>
              </span>
            </UButton>
          </div>
        </div>
        <div class="h-full pl-[164px]">
          <NuxtImg src="/image 10.png" alt="blue arm chair" class="w-full" />
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
  const items = [
    { title: "Slide 1", description: "First slide content" },
    { title: "Slide 2", description: "Second slide content" },
    { title: "Slide 3", description: "Third slide content" },
  ];
</script>
