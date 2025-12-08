<template>
  <div class="relative w-full h-[555px]">
    <img src="/Banner 5.png" class="w-full" alt="Banner 3" />
    <div class="absolute top-10.5 left-1/2 -translate-x-1/2 text-center">
      <p class="font-bold text-primary leading-7 uppercase tracking-widest">
        LỜI CHỨNG THỰC
      </p>
      <p class="font-medium text-[32px]">
        Những gì khách hàng của chúng tôi <span class="text-info">nói</span>
      </p>
    </div>

    <div class="absolute inset-0 flex justify-center top-[159px]">
      <UCarousel
        v-slot="{ item }"
        :duration="50"
        :items="items"
        dots
        :slides-to-scroll="2"
        :autoplay="{ delay: 2000 }"
        :ui="{
          viewport: 'mx-18.5',
          dot: [
            'bg-primary',
            'size-2',
            'data-[state=active]:w-5',
            'data-[state=active]:h-2',
            'data-[state=active]:bg-primary',
          ],
          dots: 'bottom-9',
          container: 'gap-7.5', // Add gap between items
          item: 'basis-[calc(25%-30px)]', // Adjust basis to account for gap
        }"
      >
        <div class="w-full h-[330px] bg-white rounded-lg p-7.5">
          <div class="flex items-center mb-8">
            <UAvatar src="/avatar.png" class="size-[65px] mr-3" />
            <div class="font-bold">
              <p>Lê Phùng Tiến Quân</p>
              <p class="text-secondary text-[13px]">Khách hàng</p>
            </div>
          </div>
          <p class="text-[13px] font-medium text-muted mb-5">
            Nội thất ở đây vừa đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô
            tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất đáng để
            tin tưởng và lựa chọn lâu dài.
          </p>

          <div class="flex items-center gap-1">
            <template v-for="star in 5" :key="star">
              <UIcon
                v-if="star <= Math.floor(stars || 0)"
                name="i-heroicons-star-solid"
                class="size-4 text-yellow-400"
              />
              <div
                v-else-if="star - 0.5 <= (stars || 0)"
                class="relative size-4"
              >
                <UIcon
                  name="i-heroicons-star"
                  class="size-4 text-yellow-400 absolute"
                />
                <UIcon
                  name="i-heroicons-star-solid"
                  class="size-4 text-yellow-400 absolute"
                  style="clip-path: inset(0 50% 0 0)"
                />
              </div>
              <UIcon
                v-else
                name="i-heroicons-star"
                class="size-4 text-yellow-400"
              />
            </template>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
  const items = [
    { id: 1, title: "Card 1", content: "..." },
    { id: 2, title: "Card 2", content: "..." },
    { id: 3, title: "Card 3", content: "..." },
    { id: 4, title: "Card 4", content: "..." },
    { id: 5, title: "Card 5", content: "..." },
    { id: 6, title: "Card 6", content: "..." },
  ];
  const stars = ref(5);
</script>
