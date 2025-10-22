<template>
  <div>
    <div class="flex justify-between mb-[25px]">
      <div>
        <p class="text-primary font-semibold text-[26px]">Sản phẩm phổ biến</p>
        <div class="absolute w-10.5 h-0.5 bg-secondary" />
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

    <div
      v-show="activeTab === 'Tất cả'"
      class="mt-4 flex justify-between items-center"
    >
      <SharedProductCard :stars="2" />
      <SharedProductCard :stars="2" />
      <SharedProductCard :stars="2" />
      <SharedProductCard :stars="2" />
      <SharedProductCard :stars="2" />
    </div>

    <div
      v-show="activeTab === 'Phòng ngủ'"
      class="mt-4 flex justify-between items-center"
    >
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
    </div>
    <div
      v-show="activeTab === 'Trang trí'"
      class="mt-4 flex justify-between items-center"
    >
      <SharedProductCard :stars="4" />
      <SharedProductCard :stars="4" />
      <SharedProductCard :stars="4" />
      <SharedProductCard :stars="4" />
      <SharedProductCard :stars="4" />
    </div>
    <div
      v-show="activeTab === 'Phòng khách'"
      class="mt-4 flex justify-between items-center"
    >
      <SharedProductCard :stars="5" />
      <SharedProductCard :stars="5" />
      <SharedProductCard :stars="5" />
      <SharedProductCard :stars="5" />
      <SharedProductCard :stars="5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      label: "Tất cả",
      value: "Tất cả",
    },
    {
      label: "Phòng ngủ",
      value: "Phòng ngủ",
    },
    {
      label: "Trang trí",
      value: "Trang trí",
    },
    {
      label: "Phòng khách",
      value: "Phòng khách",
    },
  ];

  const activeTab = ref("Tất cả");
</script>
