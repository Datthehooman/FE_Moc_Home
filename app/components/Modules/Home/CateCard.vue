<template>
  <div>
    <div
      class="flex flex-col items-center text-center w-[190px] h-[260px] border border-success rounded-4xl justify-center cursor-pointer hover:border-primary transition-colors duration-300 ease-out group"
    >
      <div
        class="bg-success w-[165px] h-[165px] flex items-center justify-center rounded-full overflow-hidden"
      >
        <NuxtImg
          :src="image || '/image 17.png'"
          class="w-[70px] h-[70px] object-contain transition-transform duration-300 ease-out group-hover:scale-125"
          :alt="title || 'Phòng ngủ'"
        />
      </div>
      <p
        class="font-bold transition-colors duration-300 ease-out group-hover:text-primary"
      >
        {{ title || "Phòng ngủ" }}
      </p>
      <p class="text-sm text-dimmed">{{ quantity || 30 }} sản phẩm</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    image?: string;
    title?: string;
    quantity?: number;
  }>();
</script>
