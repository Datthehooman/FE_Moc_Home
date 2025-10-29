<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between mb-[25px] relative">
      <div>
        <p class="text-primary font-semibold text-[26px]">Sản phẩm phổ biến</p>
        <div class="absolute w-10.5 h-0.5 bg-secondary bottom-0" />
      </div>

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

    <!-- Product Grid -->
    <div v-if="!products || !products.length" class="text-center py-10">
      Không có sản phẩm nào.
    </div>

    <div v-else class="mt-4 grid grid-cols-5 gap-6 items-start">
      <SharedProductCard
        v-for="product in filteredProducts.slice(0, 5)"
        :key="product.product_id"
        :title="product.product_name"
        :image="product.thumbnail"
        :price="Number(product.price).toLocaleString('vi-VN')"
        :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
        :stars="4.5"
        :badge="'Hot'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    products: Product[];
  }>();

  const activeTab = ref("Tất cả");

  const items = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "Phòng ngủ", value: "Phòng ngủ" },
    { label: "Trang trí", value: "Trang trí" },
    { label: "Phòng khách", value: "Phòng khách" },
  ];

  // 🧠 Filter logic based on category_id mapping
  const filteredProducts = computed(() => {
    if (activeTab.value === "Tất cả") return props.products;

    const categoryMap: Record<string, number[]> = {
      "Phòng ngủ": [2], // example IDs — match your tblcategories
      "Trang trí": [5],
      "Phòng khách": [4, 11],
    };

    const targetIds = categoryMap[activeTab.value] || [];
    return props.products.filter((p) => targetIds.includes(p.category_id));
  });
</script>
