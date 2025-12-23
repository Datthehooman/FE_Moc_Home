<template>
  <aside class="w-[250px] flex-shrink-0 space-y-6">
    <!-- TÌM KIẾM -->
    <ModulesProductSearchBox
      :model-value="searchQuery"
      @update:model-value="$emit('update:searchQuery', $event)"
    />

    <!-- DANH MỤC -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold mb-2">Danh mục</h3>
      <ul class="space-y-1">
        <li
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-center gap-2"
        >
          <input
            :id="'cat-' + cat.id"
            type="checkbox"
            :checked="selectedCategories.includes(String(cat.id))"
            @change="toggleCategory(String(cat.id))"
          />

          <label
            :for="'cat-' + cat.id"
            class="flex-1 cursor-pointer hover:text-primary"
          >
            {{ cat.category_name }}
          </label>
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
            :id="'brand-' + brand.name"
            type="checkbox"
            :checked="selectedBrands.includes(brand.name)"
            @change="toggleBrand(brand.name)"
          />

          <label
            :for="'brand-' + brand.name"
            class="flex-1 cursor-pointer hover:text-primary"
          >
            {{ brand.name }}
          </label>

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

    <!-- ĐÁNH GIÁ -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <h3 class="font-semibold mb-3">Đánh giá</h3>

      <div class="space-y-2">
        <div
          v-for="r in ['5','4','3','2','1']"
          :key="r"
          class="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="selectedRatings.includes(r)"
            @change="toggleRating(r)"
          />

          <div class="flex">
            <svg
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="i <= Number(r) ? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"
              />
            </svg>
          </div>

          <span class="text-sm text-gray-500">từ {{ r }} sao</span>
        </div>

        <p
          class="mt-2 cursor-pointer text-sm text-gray-500 hover:text-primary"
          @click="emit('update:selectedRatings', [])"
        >
          Xóa lọc đánh giá
        </p>
      </div>
    </div>

    <!-- BANNER -->
    <div class="relative rounded-lg overflow-hidden h-[360px]">
      <img
        src="https://live.themewild.com/fameo/assets/img/blog/03.jpg"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center uppercase"
      >
        <p class="text-lg font-semibold">GIẢM GIÁ 35%</p>
        <h3 class="text-2xl font-bold">BỘ SƯU TẬP NỘI THẤT MỚI</h3>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

/* ================= PROPS & EMITS ================= */
const props = defineProps<{
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRatings: string[];
}>();

const emit = defineEmits([
  "update:searchQuery",
  "update:selectedCategories",
  "update:selectedBrands",
  "update:selectedRatings",
]);

/* ================= TOGGLE ================= */
const toggleCategory = (id: string) => {
  const newData = props.selectedCategories.includes(id)
    ? props.selectedCategories.filter(c => c !== id)
    : [...props.selectedCategories, id];

  emit("update:selectedCategories", newData);
};

const toggleBrand = (brand: string) => {
  const newData = props.selectedBrands.includes(brand)
    ? props.selectedBrands.filter(b => b !== brand)
    : [...props.selectedBrands, brand];

  emit("update:selectedBrands", newData);
};

const toggleRating = (rating: string) => {
  const newData = props.selectedRatings.includes(rating)
    ? props.selectedRatings.filter(r => r !== rating)
    : [...props.selectedRatings, rating];

  emit("update:selectedRatings", newData);
};

/* ================= DATA ================= */
const categories = ref<{ id: number; category_name: string }[]>([]);
const brands = ref<{ name: string; count: number }[]>([]);

/* ================= API ================= */
const fetchCategories = async () => {
  try {
    const res = await fetch("https://api.mocfurni.shop/api/client/category");
    const json = await res.json();
    categories.value = json?.result?.data || [];
  } catch (err) {
    console.error("❌ Lỗi fetch category:", err);
  }
};

const fetchBrandsFromProducts = async () => {
  try {
    const res = await fetch("https://api.mocfurni.shop/api/client/products");
    const json = await res.json();
    const products = json?.result?.data || [];

    const brandMap: Record<string, number> = {};
    products.forEach((p: any) => {
      if (p.brand) {
        brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
      }
    });

    brands.value = Object.entries(brandMap).map(([name, count]) => ({
      name,
      count,
    }));
  } catch (err) {
    console.error("❌ Lỗi fetch brands:", err);
  }
};

/* ================= LIFECYCLE ================= */
onMounted(() => {
  fetchCategories();
  fetchBrandsFromProducts();
});
</script>
