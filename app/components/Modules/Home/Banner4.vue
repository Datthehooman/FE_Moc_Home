<template>
  <div class="w-full h-[306px] relative mt-10 flex justify-center items-end">
    <NuxtImg
      class="w-full h-full object-cover absolute z-0"
      src="/banner 4.png"
    />
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
