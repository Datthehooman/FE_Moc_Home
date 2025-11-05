<template>
  <div class="w-[411px] h-135">
    <div class="w-full h-70 rounded-xl overflow-hidden relative mb-[9px]">
      <NuxtImg src="/blog 1.png" class="w-full object-cover z-0" />
      <div
        class="h-[43px] bg-info rounded-tl-4xl rounded-br-xl absolute bottom-0 right-0 z-20 items-center flex justify-center text-center text-sm font-medium pl-[15px] pr-[5px]"
      >
        <UIcon name="i-lucide-calendar-days" /> Tháng 08, 2025
      </div>
    </div>
    <div class="flex items-center leading-[27px] text-[15px] mb-[15px]">
      <div class="flex items-center mr-6">
        <UIcon
          class="text-primary size-[17px] mr-2"
          name="i-lucide-circle-user-round"
        />
        Bởi Tiến Quân
      </div>
      <div class="flex items-center">
        <UIcon
          class="text-primary size-[17px] mr-2"
          name="i-lucide-messages-square"
        />
        3.5k Bình luận
      </div>
    </div>
    <div class="h-[1px] bg-[#ebebeb] mb-3"></div>
    <p class="text-xl font-medium mb-[11px]">
      Xu hướng nội thất hiện đại 2025: Tối giản nhưng đầy tiện nghi
    </p>
    <p class="font-medium mb-3 text-muted">
      Nội thất năm 2025 chú trọng sự tối giản, tinh tế cùng vật liệu thân thiện
      môi trường, mang lại không gian sống thoải mái và hiện đại.
    </p>
    <UButton
      size="xl"
      variant="solid"
      class="relative bg-info text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit h-12 mb-7"
    >
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
      ></span>
      <span
        class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
      >
        <span>Xem thêm</span>
        <UIcon name="i-lucide-arrow-right"></UIcon>
      </span>
    </UButton>
  </div>
</template>
<script setup lang="ts"></script>
