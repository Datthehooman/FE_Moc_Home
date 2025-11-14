<template>
  <div class="w-full h-[320px] relative mt-10 overflow-hidden rounded-2xl">
    <NuxtImg
      class="w-full h-full object-cover absolute z-0"
      src="/banner 2.png"
    />
    <div
      class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white"
    >
      <p class="text-2xl tracking-widest mb-5">Bộ sưu tập lớn</p>
      <p class="text-3xl font-semibold mb-6">GIẢM GIÁ LỚN LÊN ĐẾN 40%</p>
      <div class="flex flex-col items-center gap-1.5 mb-7">
        <div class="h-[1px] w-[169px] bg-white" />
        <p class="text-lg">Chỉ có tại cửa hàng outlet của chúng tôi</p>
        <div class="h-[1px] w-[169px] bg-white" />
      </div>
      <UButton
        size="xl"
        variant="solid"
        class="relative bg-info text-black rounded-4xl overflow-hidden group transition-all duration-500 hover:rounded-md ease-out cursor-pointer"
        @click="handleBuyNow(product)"
      >
        <span
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
        ></span>
        <span
          class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
        >
          <span>Mua Ngay</span>
          <UIcon name="i-lucide-arrow-right"></UIcon>
        </span>
      </UButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  const product = {
    product_id: 22,
    product_name: "Ghế Bành Vải Xanh",
    price: 2500000,
    product_price: 2500000,
    product_sale: 1900000,
    quantity: 1,
    thumbnail:
      "https://api.mocfurni.shop/storage/clientsite/products/images/GB-VX-001_main.png",
  };

  const router = useRouter();
  const { setBuyNowItem } = useCheckout();

  function handleBuyNow(item: Product) {
    setBuyNowItem({ ...item, quantity: 1 });
    router.push("/checkout");
  }
</script>
