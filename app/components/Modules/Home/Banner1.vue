<template>
  <div class="relative w-full lg:h-[476px] h-auto">
    <!-- Desktop Banner -->
    <img src="/Banner 1.png" class="w-full hidden lg:block" alt="Banner 1" />

    <UCarousel
      v-slot="{ item }"
      :items="items"
      dots
      loop
      arrows
      :class="['lg:absolute lg:inset-0 lg:top-[28px]', 'relative']"
      :autoplay="{ delay: 2000 }"
      :prev="{
        color: 'primary',
        icon: 'i-lucide-chevron-left',
        variant: 'soft',
        ui: {
          base: 'bg-white hover:bg-primary text-primary hover:text-white',
        },
      }"
      :next="{
        color: 'primary',
        icon: 'i-lucide-chevron-right',
        variant: 'soft',
        ui: {
          base: 'bg-white hover:bg-primary text-primary hover:text-white',
        },
      }"
      :ui="{
        viewport: 'lg:mx-[65px]',
        dot: [
          'bg-white lg:bg-white bg-primary',
          'size-2',
          'data-[state=active]:w-5',
          'data-[state=active]:h-2',
          'data-[state=active]:bg-white lg:data-[state=active]:bg-white data-[state=active]:bg-primary',
        ],
        dots: 'lg:bottom-7 bottom-4',
        arrows: 'lg:absolute lg:right-20 z-10 hidden lg:flex',
        prev: 'z-20',
        next: 'z-20',
      }"
    >
      <!-- Desktop Layout -->
      <div
        class="bg-transparent lg:grid lg:grid-cols-2 relative hidden lg:block"
      >
        <div class="absolute top-30 right-95">
          <UTooltip
            :delay-duration="0"
            :content="{ side: 'bottom', sideOffset: 45, align: 'start' }"
            :ui="{
              content: 'ring-0 p-0',
            }"
          >
            <div class="relative inline-flex">
              <div
                class="absolute inset-0 size-[40px] rounded-full bg-white animate-ping opacity-75"
              ></div>

              <div
                class="relative size-[40px] rounded-full bg-white text-primary flex justify-center items-center text-center"
              >
                <UIcon name="i-lucide-plus" class="text-2xl" />
              </div>
            </div>
            <template #content>
              <div class="flex items-center rounded-3xl bg-white p-3">
                <NuxtImg :src="item.thumbnail" class="size-[81px] mr-3" />
                <div>
                  <p class="font-bold text-[16px] mb-1">
                    {{ item.product_name }}
                  </p>
                  <p class="text-[16px]">
                    Giá:
                    <span class="text-[#FF0000] font-semibold text-[13px]"
                      >{{ item.product_price }} đ</span
                    >
                  </p>
                </div>
              </div>
            </template>
          </UTooltip>
        </div>
        <div class="pt-[65px]">
          <div
            class="h-[33px] w-fit [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%)] rounded-l-full uppercase bg-info font-bold flex items-center pl-4 pr-8.5 mb-5.5"
          >
            CHÀO MỪNG ĐẾN VỚI MỘC HOME!
          </div>
          <div class="text-[42px] font-bold text-white mb-4">
            <p>Nội thất <span class="text-info">hiện đại</span></p>
            <p>Nâng tầm không gian sống</p>
          </div>
          <p class="text-white leading-7 mb-[29px]">
            Thiết kế tinh tế, chất lượng bền bỉ, mang đến sự tiện nghi và phong
            cách cho ngôi nhà của bạn.
          </p>
          <div class="flex items-center gap-4.5">
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit cursor-pointer"
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
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-white/20 text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit cursor-pointer"
              @click="handleDetail(item?.slug)"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
              ></span>
              <span
                class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
              >
                <span>Tìm hiểu thêm</span>
                <UIcon name="i-lucide-arrow-right"></UIcon>
              </span>
            </UButton>
          </div>
        </div>
        <div class="flex items-center justify-center h-[400px]">
          <NuxtImg
            :src="item.thumbnail"
            alt="Product"
            class="h-[350px] object-contain"
          />
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden relative">
        <!-- Background Image for Mobile -->
        <div class="relative w-full min-h-[600px]">
          <NuxtImg
            src="/Banner 1.png"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Banner Mobile"
          />

          <!-- Content Overlay -->
          <div
            class="relative z-10 flex flex-col items-center text-center px-6 py-12"
          >
            <!-- Welcome Badge -->
            <div
              class="h-[33px] w-fit [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%)] rounded-l-full uppercase bg-info font-bold flex items-center pl-4 pr-8 mb-4 text-sm"
            >
              CHÀO MỪNG ĐẾN VỚI MỘC HOME!
            </div>

            <!-- Title -->
            <div class="text-[28px] sm:text-[32px] font-bold text-white mb-3">
              <p>Nội thất <span class="text-info">hiện đại</span></p>
              <p>Nâng tầm không gian sống</p>
            </div>

            <!-- Description -->
            <p class="text-white leading-6 mb-6 max-w-md text-sm sm:text-base">
              Thiết kế tinh tế, chất lượng bền bỉ, mang đến sự tiện nghi và
              phong cách cho ngôi nhà của bạn.
            </p>

            <!-- Buttons (Inline) -->
            <div class="flex items-center gap-3 mb-8 flex-wrap justify-center">
              <UButton
                size="lg"
                variant="solid"
                class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out cursor-pointer"
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
              <UButton
                size="lg"
                variant="solid"
                class="relative bg-white/20 text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out cursor-pointer"
                @click="handleDetail(item?.slug)"
              >
                <span
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
                ></span>
                <span
                  class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
                >
                  <span>Tìm hiểu thêm</span>
                  <UIcon name="i-lucide-arrow-right"></UIcon>
                </span>
              </UButton>
            </div>

            <!-- Product Image at Bottom -->
            <div class="mt-auto">
              <NuxtImg
                :src="item.thumbnail || '/image 10.png'"
                alt="Product"
                class="w-64 h-64 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
  const items = [
    {
      product_id: 27,
      product_name: "Giường Ngủ Bọc Vải Xám",
      slug: "giuong-ngu-boc-vai-xam",
      price: 6500000,
      product_price: 6500000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/GN-VX-001_main.png",
    },
    {
      product_id: 28,
      product_name: "Sofa Băng Vải Be (3 Chỗ)",
      slug: "sofa-bang-vai-be-3-cho",
      price: 7000000,
      product_price: 7000000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/SF-VB-001_main.png",
    },
    {
      product_id: 29,
      product_name: "Bàn Làm Việc Chữ L (Gaming)",
      slug: "ban-lam-viec-chu-l-gaming",
      price: 4500000,
      product_price: 4500000,
      product_sale: null,
      quantity: 1,
      thumbnail:
        "https://api.mocfurni.shop/storage/clientsite/products/images/BLV-GM-001_main.png",
    },
  ];

  const router = useRouter();
  const { setBuyNowItem } = useCheckout();

  function handleBuyNow(item: Product) {
    setBuyNowItem({ ...item, quantity: 1 });
    router.push("/checkout");
  }
  function handleDetail(slug: string) {
    router.push(`/san-pham/${slug}`);
  }
</script>
