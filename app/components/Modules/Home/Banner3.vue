<template>
  <div class="relative w-full h-[537px]">
    <img src="/Banner 3.png" class="w-full" alt="Banner 3" />
    <div class="absolute inset-0 flex justify-center top-[51px]">
      <UCarousel
        v-slot="{ item }"
        :duration="50"
        :items="items"
        dots
        :autoplay="{ delay: 2000 }"
        :ui="{
          dot: [
            'bg-transparent',
            'data-[state=active]:bg-secondary',
            'border-[2px]',
            'border-secondary',
          ],
          dots: 'bottom-7',
        }"
      >
        <div
          class="bg-transparent mx-[109px] grid grid-cols-2 gap-25.5 relative"
        >
          <div
            class="absolute size-[115px] rounded-full bg-[#f05454] right-[450px] top-1/3 -translate-y-1/2 text-white font-bold flex justify-center items-center text-center"
          >
            <div>
              <p class="text-xl">Giảm</p>
              <p class="text-4xl">45%</p>
            </div>
          </div>
          <div class="min-w-[525px]">
            <p class="text-lg font-bold text-toned uppercase mb-3.5">
              ƯU ĐÃI TUẦN NÀY
            </p>
            <p class="font-bold text-[35px] text-black mb-3">
              {{ item.product_name }}
            </p>
            <p class="font-medium text-[#808080] leading-7.5 mb-6.5">
              {{ item.description }}
            </p>
            <div class="flex items-center gap-[15px] mb-8">
              <div
                class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"
              >
                <div>
                  <p class="text-toned text-5xl">{{ days }}</p>
                  <p class="uppercase">ngày</p>
                </div>
              </div>
              <div
                class="w-30 h-25 rounded-2xl bg-white text-black font-bold flex justify-center items-center text-center"
              >
                <div>
                  <p class="text-toned text-5xl">{{ hours }}</p>
                  <p class="uppercase">giờ</p>
                </div>
              </div>
              <div
                class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"
              >
                <div>
                  <p class="text-toned text-5xl">{{ minutes }}</p>
                  <p class="uppercase">PHÚT</p>
                </div>
              </div>
              <div
                class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"
              >
                <div>
                  <p class="text-toned text-5xl">{{ seconds }}</p>
                  <p class="uppercase">GIÂY</p>
                </div>
              </div>
            </div>
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-secondary text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit cursor-pointer"
              @click="handleBuyNow(item)"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
              ></span>
              <span
                class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
              >
                <span>Mua ngay</span>
                <UIcon name="i-lucide-arrow-right"></UIcon>
              </span>
            </UButton>
          </div>
          <div class="flex items-center justify-center h-full">
            <NuxtImg
              :src="item.thumbnail"
              :alt="item.product_name"
              class="h-[500px] md:h-[550px] lg:h-[600px] object-contain"
            />
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
  const items = [
    {
      product_id: 35,
      product_name: "Bộ Bàn Ghế Giám Đốc",
      slug: "bo-ban-ghe-giam-doc",
      description: "Bộ bàn làm việc và ghế giám đốc chữ L",
      price: 15000000,
      product_price: 15000000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/SET-GD-001_main.png",
    },
    {
      product_id: 36,
      product_name: "Sofa Da 3 Chỗ (Xanh Bơ)",
      slug: "sofa-da-3-cho-xanh-bo",
      description: "Sofa da 3 chỗ màu xanh bơ",
      price: 8500000,
      product_price: 8500000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/SF-DA-XB-001_main.png",
    },
    {
      product_id: 37,
      product_name: "Bộ Bàn Ăn Tròn 4 Ghế",
      slug: "bo-ban-an-tron-4-ghe",
      description: "Bộ bàn ăn tròn gỗ 4 ghế bọc nệm",
      price: 5500000,
      product_price: 5500000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/SET-BA-001_main.png",
    },
  ];

  // countdown
  const endDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = endDate.value.getTime() - now;

    days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours.value = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
  };

  const router = useRouter();
  const { setBuyNowItem } = useCheckout();

  function handleBuyNow(item: Product) {
    setBuyNowItem({ ...item, quantity: 1 });
    router.push("/checkout");
  }

  onMounted(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    onUnmounted(() => clearInterval(timer));
  });
</script>
