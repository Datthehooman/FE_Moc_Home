<template>
  <div class="relative group h-[330px] w-full flex-shrink-0">

    <!-- CHECKBOX CHỌN SẢN PHẨM -->
    <div v-if="selectMode" class="absolute top-3 left-3 z-30">
      <input
        type="checkbox"
        class="w-5 h-5 cursor-pointer"
        :checked="selected"
        @change="$emit('toggle')"
      />
    </div>

    <!-- BOX NỀN -->
    <div
      class="absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0
      h-[180px] group-hover:h-full">
    </div>

    <!-- ICON HOVER -->
    <div
      v-if="!selectMode"
      class="absolute left-1/2 bottom-[250px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20"
    >

      <!-- 👁️ Xem -->
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
          @click="$emit('view', data)"
          class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
        >
          <UIcon name="i-heroicons-eye-solid" class="w-5 h-5 text-white" />
        </button>
      </UTooltip>

      <!-- ❌ Bỏ yêu thích -->
      <UTooltip
        :delay-duration="0"
        text="Bỏ khỏi yêu thích"
        :content="{ side: 'top', sideOffset: 1 }"
        arrow
        :ui="{
          content:
            'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
          arrow: 'fill-primary',
        }"
      >
        <button
          @click="$emit('remove', data)"
          class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-white" />
        </button>
      </UTooltip>

    </div>

    <!-- CONTENT -->
    <div class="relative z-10 p-4 flex flex-col">
      <div class="relative w-full flex justify-center mb-3">

        <!-- BADGE -->
        <span
          v-if="data.badge"
          class="absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"
          :class="{
            'bg-[#F05454]': data.badge === 'Mới',
            'bg-[#00BFFF]': data.badge === 'Hot',
            'bg-[#FBA707]': data.badge === 'Giảm 50%',
          }"
        >
          {{ data.badge }}
        </span>

        <!-- IMAGE -->
        <img
          :src="data.thumbnail"
          class="w-[180px] h-[180px] object-contain z-10 transition-transform duration-500 ease-out cursor-pointer"
        />
      </div>

      <!-- NAME -->
      <h3 class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate">
        {{ data.product_name }}
      </h3>

      <!-- RATING -->
      <div class="flex mt-1 px-2 text-left">
        <UIcon
          v-for="n in 5"
          :key="n"
          :name="data.rating >= n ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
          class="w-4 h-4"
          :class="data.rating >= n ? 'text-yellow-400' : 'text-gray-300'"
        />
      </div>

      <!-- PRICE + CART -->
      <div class="mt-2 flex items-center justify-between w-full px-2">

        <div class="text-left">
          <span v-if="data.price_old" class="line-through text-gray-400 text-[14px] block">
            {{ formatPrice(data.price_old) }}
          </span>
          <span class="text-[#E95D5D] font-semibold text-[19px] block">
            {{ formatPrice(data.price) }}
          </span>
        </div>

        <!-- 🛒 Thêm vào giỏ -->
        <UTooltip
          v-if="!selectMode"
          :delay-duration="0"
          text="Thêm vào giỏ hàng"
          :content="{ side: 'top', sideOffset: 1 }"
          arrow
          :ui="{
            content:
              'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
            arrow: 'fill-primary',
          }"
        >
          <button
            @click="$emit('add-to-cart', data)"
            class="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
          >
            <UIcon name="i-heroicons-shopping-bag-solid" class="w-5 h-5 text-white" />
            <div>{{ data.id }}</div>
          </button>
        </UTooltip>

      </div>

    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, required: true },
  selectMode: { type: Boolean, default: false },
  selected: { type: Boolean, default: false }
})

const emit = defineEmits(['view', 'remove', 'add-to-cart', 'toggle'])

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + "₫"
}
</script>
