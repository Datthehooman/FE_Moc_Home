<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between mb-[25px] relative">
      <div>
        <p class="text-primary font-semibold text-[26px]">Sản phẩm phổ biến</p>
        <div class="absolute w-10.5 h-0.5 bg-secondary bottom-0" />
      </div>

      <!-- Dynamic Tabs -->
      <UTabs
        v-model="activeTab"
        :items="items"
        :content="false"
        variant="link"
        :ui="{
          trigger:
            'text-black font-semibold text-lg data-[state=active]:text-primary data-[state=inactive]:text-black p-0 mr-8',
          label: 'hover:text-primary',
          indicator: 'h-[1px] rounded-none bottom-0',
          list: '!border-0',
        }"
      />
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      Đang tải sản phẩm...
    </div>

    <!-- Product Grid -->
    <div v-else-if="!displayProducts.length" class="text-center py-10">
      Không có sản phẩm nào.
    </div>

    <div v-else class="mt-4 grid grid-cols-5 gap-6 items-start">
      <SharedProductCard
        v-for="product in displayProducts.slice(0, 5)"
        :key="product.product_id"
        :id="product.product_id"
        :title="product.product_name"
        :image="product.thumbnail"
        :price="Number(product.price).toLocaleString('vi-VN')"
        :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
        :stars="product.rating"
        :badge="product.badge"
        :view="product.view"
        :brand="product.brand"
        :room_id="product.category_id"
        :status="product.status"
        :sku="product.sku"
        :slug="product.slug"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // 🔹 Tabs
  const { rooms, fetchRooms } = useRooms();
  const activeTab = ref("Tất cả");

  // 🔹 Room products
  const {
    roomProducts,
    isLoading: isRoomLoading,
    fetchRoomProducts,
  } = useRoomProducts(0);

  // 🔹 All products for "Tất cả"
  const {
    products: allProducts,
    isLoading: isAllLoading,
    fetchProducts,
  } = useProducts();

  // 🔹 Tabs list
  const items = computed(() => {
    const base = [{ label: "Tất cả", value: "Tất cả" }];
    const roomItems =
      rooms.value?.map((room) => ({
        label: room.room_name,
        value: room.id.toString(),
      })) || [];
    return [...base, ...roomItems];
  });

  // 🔹 Determine which products to display
  const displayProducts = computed(() => {
    return activeTab.value === "Tất cả"
      ? allProducts.value
      : roomProducts.value;
  });

  // 🔁 Watch tab change
  watch(activeTab, async (val) => {
    if (val === "Tất cả") {
      // All products already fetched
    } else {
      const roomId = Number(val);
      if (roomId) await fetchRoomProducts(roomId);
    }
  });

  // 🚀 On mount, fetch rooms & all products
  onMounted(async () => {
    await fetchRooms();
    await fetchProducts(); // load all products initially
  });
</script>
