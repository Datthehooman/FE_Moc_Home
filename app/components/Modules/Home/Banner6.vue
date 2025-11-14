<template>
  <div class="w-full h-[305px] relative mt-10 overflow-hidden rounded-2xl">
    <NuxtImg
      class="w-full h-full object-cover absolute z-0"
      src="/banner 6.png"
    />
    <div class="absolute inset-0 bg-black/40"></div>
    <div
      class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white"
    >
      <p class="text-2xl text-white mb-[13px] uppercase">
        NHẬN PHIẾU GIẢM GIÁ LÊN ĐẾN <span class="text-info">20%</span>
      </p>
      <p class="text-[15px] text-white font-medium mb-[27px]">
        Theo dõi để nhận bảng tin mới nhất
      </p>
      <UInput
        placeholder="Email của bạn"
        class="w-[630px]"
        :ui="{ trailing: 'pe-1', base: 'h-[62px] rounded-full pl-[33px]' }"
      >
        <template #trailing>
          <UButton
            size="xl"
            variant="solid"
            class="relative bg-info text-black rounded-full overflow-hidden group transition-all duration-500 ease-out py-[14px] px-[26px]"
          >
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
            ></span>
            <span
              class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
            >
              <span>Theo dõi</span>
              <UIcon name="i-lucide-send"></UIcon>
            </span>
          </UButton>
        </template>
      </UInput>
    </div>
  </div>
</template>
