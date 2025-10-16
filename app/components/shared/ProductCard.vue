<template>
  <div
    class="h-[367px] p-5 relative group"
    :class="big ? 'w-[419px]' : 'w-[247px]'"
  >
    <div
      class="absolute bg-accented w-full h-[235px] bottom-0 left-0 rounded-2xl transition-all duration-500 ease-out group-hover:h-full"
    />
    <UBadge
      variant="soft"
      class="absolute text-white bg-red-500 font-bold top-4 right-6 z-20 w-20 h-6 flex justify-center text-center items-center rounded-4xl"
      :label="badge || 'mới'"
    />
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 z-20 flex gap-2">
      <UTooltip
        :delay-duration="0"
        text="Xem sản phẩm"
        :content="{ side: 'top', sideOffset: 1 }"
        arrow
        :ui="{
          content:
            'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
          arrow: 'fill-primary',
        }"
      >
        <div
          class="bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        >
          <UIcon class="size-[19px] text-white" name="i-heroicons-eye-solid" />
        </div>
      </UTooltip>
      <UTooltip
        :delay-duration="0"
        text="Thêm yêu thích"
        :content="{ side: 'top', sideOffset: 1 }"
        arrow
        :ui="{
          content:
            'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
          arrow: 'fill-primary',
        }"
      >
        <div
          class="bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        >
          <UIcon class="size-[19px] text-white" name="i-heroicons-heart" />
        </div>
      </UTooltip>
    </div>

    <!-- Fixed shopping bag button -->
    <UTooltip
      :delay-duration="0"
      text="Thêm giỏ hàng"
      :content="{ side: 'top', sideOffset: 1 }"
      arrow
      :ui="{
        content:
          'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
        arrow: 'fill-primary',
      }"
    >
      <div
        class="absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer bottom-5 right-5 z-20"
      >
        <UIcon
          class="size-[19px] text-white"
          name="i-heroicons-shopping-bag-solid"
        />
      </div>
    </UTooltip>
    <div class="relative z-10">
      <NuxtImg
        :src="image || '/image 10.png'"
        class="w-full max-h-[207px] object-contain mb-[13px] mx-auto"
      />
      <p class="font-semibold text-[17px]">
        {{ title || "Ghế Denim đơn giản" }}
      </p>
      <div class="flex items-center gap-1 my-[9px]">
        <template v-for="star in 5" :key="star">
          <UIcon
            v-if="star <= Math.floor(stars || 0)"
            name="i-heroicons-star-solid"
            class="size-4 text-yellow-400"
          />
          <div v-else-if="star - 0.5 <= (stars || 0)" class="relative size-4">
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
      <p class="line-through text-muted text-sm mb-1">
        {{ price || "250.000 " }} đ&nbsp;
      </p>
      <p class="text-toned text-[19px] font-medium">
        {{ salePrice || "190.000 " }} đ
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    big?: boolean;
    title?: string;
    image?: string;
    badge?: string;
    stars?: number;
    price?: string;
    salePrice?: string;
    badgeColor?: string;
  }>();
</script>
