<template>
  <section class="bg-[#FFFBF8] min-h-screen py-10 px-6">
    <h2 class="text-2xl font-bold text-[#6E4E37] mb-6 text-center">
      Danh sách yêu thích ❤️
    </h2>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center text-gray-500 py-10">
      Đang tải danh sách yêu thích...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error.message || 'Không thể tải dữ liệu' }}
    </div>

    <!-- Empty -->
    <div v-else-if="!wishlists.length" class="text-center text-gray-500 py-10">
      Chưa có sản phẩm yêu thích nào 😢
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      <ModulesUserCartWishlist
        v-for="item in wishlists"
        :key="item.product_id"
        :item="item"
        :itemWidth="250"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const { wishlists, isLoading, error, fetchWislist } = useWishlist();

onMounted(() => {
  fetchWislist();
});
</script>
