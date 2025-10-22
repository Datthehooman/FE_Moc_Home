<template>
  <aside class="w-[250px] flex-shrink-0 space-y-6">
    <!-- TÌM KIẾM -->
    <ModulesProductSearchBox
      :model-value="searchQuery"
      @update:model-value="val => emit('update:searchQuery', val)"
    />

    <!-- DANH MỤC -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold mb-2">Danh mục</h3>
      <ul class="space-y-1">
        <li
          v-for="cat in categories"
          :key="cat.name"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="cat.name"
            :checked="selectedCategories.includes(cat.name)"
            @change="toggleCategory(cat.name)"
          />
          <span class="flex-1 cursor-pointer hover:text-primary">
            {{ cat.name }}
          </span>
          <span class="text-gray-400">({{ cat.count }})</span>
        </li>
        <li
          class="mt-2 cursor-pointer text-sm text-gray-500 hover:text-primary"
          @click="emit('update:selectedCategories', [])"
        >
          Xóa lọc danh mục
        </li>
      </ul>
    </div>

    <!-- THƯƠNG HIỆU -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold mb-2">Thương hiệu</h3>
      <ul class="space-y-1">
        <li
          v-for="brand in brands"
          :key="brand.name"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="brand.name"
            :checked="selectedBrands.includes(brand.name)"
            @change="toggleBrand(brand.name)"
          />
          <span class="flex-1 cursor-pointer hover:text-primary">
            {{ brand.name }}
          </span>
          <span class="text-gray-400">({{ brand.count }})</span>
        </li>
        <li
          class="mt-2 cursor-pointer text-sm text-gray-500 hover:text-primary"
          @click="emit('update:selectedBrands', [])"
        >
          Xóa lọc thương hiệu
        </li>
      </ul>
    </div>

    <!-- KHUYẾN MÃI -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold mb-3">Khuyến mãi</h3>
      <div class="space-y-2 text-gray-700">
        <label
          class="flex items-center space-x-2"
          v-for="sale in sales"
          :key="sale"
        >
          <input type="checkbox" />
          <span>{{ sale }}</span>
        </label>
      </div>
    </div>

    <!-- ĐÁNH GIÁ -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold mb-3">Đánh giá</h3>
      <div class="space-y-2">
        <div v-for="n in 3" :key="n" class="flex items-center space-x-2">
          <input type="checkbox" />
          <div class="flex">
            <svg
              v-for="i in 5"
              :key="i"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              :class="i <= 6 - n ? 'text-yellow-400' : 'text-gray-300'"
            >
              <path
                fill-rule="evenodd"
                d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

   <!-- MÀU SẮC -->
<div class="bg-white p-4 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold mb-3">Màu sắc</h3>
  <div class="flex space-x-3">
    <label
      v-for="color in colors"
      :key="color"
      class="relative cursor-pointer"
    >
      <!-- input ẩn -->
      <input
        type="checkbox"
        class="absolute opacity-0 peer"
      />

      <!-- vòng tròn màu -->
      <span
        :style="{ backgroundColor: color }"
        class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-gray-400 transition-transform peer-checked:scale-110"
      >
        <!-- Dấu tick Heroicon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="white"
          class="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
    </label>
  </div>
</div>


    <!-- KÍCH CỠ -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold mb-3">Kích cỡ</h3>
      <div class="space-y-2 text-gray-700">
        <label
          v-for="size in sizes"
          :key="size"
          class="flex items-center space-x-2"
        >
          <input type="checkbox" />
          <span>{{ size }}</span>
        </label>
      </div>
    </div>

    <!-- BANNER -->
    <div class="relative rounded-lg overflow-hidden h-[360px]">
      <img
        src="https://live.themewild.com/fameo/assets/img/blog/03.jpg"
        alt="banner"
        class="w-full h-full object-cover rounded-lg"
      />
      <div
        class="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center uppercase"
      >
        <div class="flex items-center gap-4 mb-2">
          <span class="h-[2px] w-10 bg-white"></span>
          <p class="text-[18px] font-semibold tracking-wide">GIẢM GIÁ 35%</p>
          <span class="h-[2px] w-10 bg-white"></span>
        </div>
        <h3 class="text-[28px] font-bold">BỘ SƯU TẬP NỘI THẤT MỚI</h3>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  searchQuery: string
  selectedCategories: string[]
  selectedBrands: string[]
}>()

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedCategories',
  'update:selectedBrands',
])

const toggleCategory = (cat: string) => {
  const newCats = props.selectedCategories.includes(cat)
    ? props.selectedCategories.filter((c) => c !== cat)
    : [...props.selectedCategories, cat]
  emit('update:selectedCategories', newCats)
}

const toggleBrand = (brand: string) => {
  const newBrands = props.selectedBrands.includes(brand)
    ? props.selectedBrands.filter((b) => b !== brand)
    : [...props.selectedBrands, brand]
  emit('update:selectedBrands', newBrands)
}

const categories = [
  { name: 'Phòng ngủ', count: 15 },
  { name: 'Phòng khách', count: 23 },
  { name: 'Phòng tắm', count: 35 },
  { name: 'Trang trí', count: 46 },
  { name: 'Văn phòng', count: 39 },
  { name: 'Nhà bếp', count: 79 },
  { name: 'Lưu trữ', count: 8 },
  { name: 'Đèn', count: 17 },
  { name: 'Sofa', count: 12 },
  { name: 'Ghế', count: 74 },
  { name: 'Ghế bành', count: 38 },
  { name: 'Bàn', count: 22 },
  { name: 'Khác', count: 25 },
]

const brands = [
  { name: 'Tovol', count: 15 },
  { name: 'Sundoy', count: 23 },
  { name: 'Sahoo Home', count: 35 },
  { name: 'Casterly', count: 46 },
  { name: 'Mainden Home', count: 39 },
  { name: 'Knroll Furniture', count: 79 },
  { name: 'Modern Enternity', count: 28 },
  { name: 'Charisha', count: 17 },
  { name: 'Audou', count: 12 },
]

const colors = ['#3B82F6', '#22C55E', '#FACC15', '#F87171', '#EF4444']
const sizes = ['Cực nhỏ', 'Nhỏ', 'Vừa', 'Lớn', 'Cực lớn']
const sales = ['Đang giảm giá', 'Còn hàng', 'Hết hàng', 'Giảm giá']
</script>
