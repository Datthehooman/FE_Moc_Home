<template>
  <div
    class="relative group h-[330px] flex-shrink-0"
    :style="{ width: itemWidth + 'px' }"
  >
    <!-- BOX NỀN DƯỚI -->
    <div
      class="absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0"
      :class="['h-[180px] group-hover:h-full shadow-sm group-hover:shadow-md']"
    ></div>

    <!-- NỘI DUNG -->
    <div class="relative z-10 p-4 flex flex-col">
      <div class="relative w-full flex justify-center mb-3">
<span
  v-if="product.badge && product.badge.trim() !== ''"
  class="absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"
  :class="{
    'bg-[#F05454]': product.badge === 'Mới',
    'bg-[#00BFFF]': product.badge === 'Hot',
    'bg-[#FBA707]': product.badge === 'Giảm 50%',
  }"
>
  {{ product.badge }}
</span>



        <img
          :src="product.image"
          alt=""
          class="w-[180px] h-[180px] object-contain relative z-10 transition-transform duration-500"
        />

        <!-- ICON HOVER -->
        <div
          class="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20"
        >
          <!-- Xem sản phẩm -->
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
            <button
              @click="$emit('view', product)"
              class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
            >
              <UIcon name="i-heroicons-eye-solid" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>

          <!-- Yêu thích -->
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
            <button
              class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
            >
              <UIcon name="i-heroicons-heart" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>
        </div>
      </div>

      <!-- TÊN + SAO + GIÁ -->
      <h3 class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug">
        {{ product.name }}
      </h3>

      <div class="flex mt-1 px-2 text-left">
        <UIcon
          v-for="n in 5"
          :key="n"
          :name="n <= product.star ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
          class="w-4 h-4"
          :class="n <= product.star ? 'text-yellow-400' : 'text-gray-300'"
        />
      </div>

      <div class="mt-2 flex items-center justify-between w-full px-2">
        <div class="text-left">
          <span class="line-through text-gray-400 text-[14px] block">{{ product.oldPrice }}</span>
          <span class="text-[#E95D5D] font-semibold text-[19px] block">
            {{ product.price }}
          </span>
        </div>

        <!-- Giỏ hàng -->
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
          <button
            class="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
          >
            <UIcon
              name="i-heroicons-shopping-bag-solid"
              class="w-5 h-5 text-white"
            />
          </button>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  product: {
    name: string
    image: string
    oldPrice: string
    price: string
    badge?: string
    star: number
  }
  itemWidth: number
}>()

defineEmits(['view'])
</script>
