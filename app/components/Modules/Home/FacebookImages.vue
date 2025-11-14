<template>
  <div>
    <p class="font-semibold text-[30px] mb-[29px] text-center">
      Facebook <span class="text-primary">@MộcHome</span>
    </p>
    <UCarousel
      v-slot="{ item }"
      :items="items"
      :slides-to-scroll="1"
      :autoplay="{ delay: 2000 }"
      :ui="{
        container: 'gap-[10px]',
        item: 'basis-[calc(20%-10px)]',
      }"
    >
      <div class="size-[250px] rounded-xl overflow-hidden relative group">
        <NuxtImg
          src="/blog 1.png"
          class="w-full h-full object-cover relative z-0"
        />

        <div
          class="absolute inset-0 -translate-x-full bg-black/25 group-hover:translate-x-0 transition-transform duration-500 z-10"
        ></div>

        <div
          class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div
            class="size-[40px] rounded-full bg-primary text-primary overflow-hidden relative"
          >
            <UIcon
              name="i-uil-facebook-f"
              class="size-10 text-white absolute -bottom-1 left-0.5"
            />
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>
<script setup lang="ts">
  const items = [
    "https://picsum.photos/468/468?random=1",
    "https://picsum.photos/468/468?random=2",
    "https://picsum.photos/468/468?random=3",
    "https://picsum.photos/468/468?random=4",
    "https://picsum.photos/468/468?random=5",
    "https://picsum.photos/468/468?random=6",
    "https://picsum.photos/468/468?random=1",
    "https://picsum.photos/468/468?random=2",
    "https://picsum.photos/468/468?random=3",
    "https://picsum.photos/468/468?random=4",
    "https://picsum.photos/468/468?random=5",
    "https://picsum.photos/468/468?random=6",
  ];
</script>
