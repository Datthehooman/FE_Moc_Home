<template>
  <div
    class="h-[300px] sm:h-[367px] p-3 sm:p-5 relative group"
    :class="big ? 'w-full sm:w-[419px]' : 'w-full sm:w-[247px]'"
  >
    <!-- Rest of your component stays the same, just update fixed sizes -->
    <div
      class="absolute bg-accented w-full h-[200px] sm:h-[235px] bottom-0 left-0 rounded-2xl transition-all duration-500 ease-out group-hover:h-full"
    />

    <UBadge
      v-if="badge !== null"
      variant="soft"
      class="absolute text-white bg-red-500 font-bold top-2 sm:top-4 right-3 sm:right-6 z-20 w-16 sm:w-20 h-5 sm:h-6 flex justify-center text-center items-center rounded-4xl text-xs"
      :label="badge || 'mới'"
    />

    <!-- Action buttons -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2"
    >
      <!-- Eye icon tooltip -->
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
        <div
          class="bg-primary size-8 sm:size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          @click="isModalOpen = true"
        >
          <UIcon
            class="size-4 sm:size-[19px] text-white"
            name="i-heroicons-eye-solid"
          />
        </div>
      </UTooltip>

      <!-- Heart icon tooltip -->
      <UTooltip
        :delay-duration="0"
        text="Thêm yêu thích"
        :content="{ side: 'top', sideOffset: 1 }"
        arrow
        :ui="{
          content:
            'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
          arrow: 'fill-primary',
        }"
      >
        <div
          class="bg-primary size-8 sm:size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          @click="handleAddToWishlist(id)"
        >
          <UIcon
            class="size-4 sm:size-[19px] text-white"
            name="i-heroicons-heart"
          />
        </div>
      </UTooltip>
    </div>

    <!-- Shopping bag button -->
    <UTooltip
      :delay-duration="0"
      text="Thêm giỏ hàng"
      :content="{ side: 'top', sideOffset: 1 }"
      arrow
      :ui="{
        content:
          'bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0',
        arrow: 'fill-primary',
      }"
    >
      <div
        class="absolute bg-primary size-8 sm:size-10 flex justify-center items-center rounded-full cursor-pointer bottom-3 sm:bottom-5 right-3 sm:right-5 z-20"
        @click="handleAddToCart()"
      >
        <UIcon
          class="size-4 sm:size-[19px] text-white"
          name="i-heroicons-shopping-bag-solid"
        />
      </div>
    </UTooltip>

    <!-- Product content -->
    <div class="relative z-10">
      <div
        class="w-full h-[150px] sm:h-[207px] mb-2 sm:mb-[13px] mx-auto flex justify-center items-center"
      >
        <NuxtImg
          :src="image || '/image 10.png'"
          class="w-full max-h-[150px] sm:max-h-[207px] object-contain cursor-pointer"
          @click="goToDetail(slug)"
        />
      </div>

      <p class="font-semibold text-sm sm:text-[17px] truncate">
        {{ title || "Ghế Denim đơn giản" }}
      </p>

      <!-- Star rating -->
      <div class="flex items-center gap-1 my-1 sm:my-[9px]">
        <template v-for="star in 5" :key="star">
          <UIcon
            v-if="star <= Math.floor(Number(stars) || 0)"
            name="i-heroicons-star-solid"
            class="size-3 sm:size-4 text-yellow-400"
          />
          <div
            v-else-if="star - 0.5 <= (Number(stars) || 0)"
            class="relative size-3 sm:size-4"
          >
            <UIcon
              name="i-heroicons-star"
              class="size-3 sm:size-4 text-yellow-400 absolute"
            />
            <UIcon
              name="i-heroicons-star-solid"
              class="size-3 sm:size-4 text-yellow-400 absolute"
              style="clip-path: inset(0 50% 0 0)"
            />
          </div>
          <UIcon
            v-else
            name="i-heroicons-star"
            class="size-3 sm:size-4 text-yellow-400"
          />
        </template>
      </div>

      <!-- Price -->
      <div v-if="Number(salePrice) === 0">
        <p class="text-xs sm:text-sm mb-1">&nbsp;</p>
        <p class="text-toned text-base sm:text-[19px] font-medium">
          {{ price || "190.000 " }} đ
        </p>
      </div>
      <div v-else>
        <p class="line-through text-muted text-xs sm:text-sm mb-1">
          {{ price || "250.000 " }} đ&nbsp;
        </p>
        <p class="text-toned text-base sm:text-[19px] font-medium">
          {{ salePrice || "190.000 " }} đ
        </p>
      </div>
    </div>

    <!-- Modal (keep as is) -->
    <UModal
      v-model:open="isModalOpen"
      :ui="{
        content: 'max-w-[750px] divide-y-0 rounded-2xl',
        body: 'p-0 !pb-[29px] sm:p-0 overflow-hidden',
        header: 'p-0',
      }"
      :close="{
        color: 'primary',
        variant: 'solid',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
          <!-- Left Column - Image -->
          <div class="pl-7.5 pr-5.5 flex items-center justify-center">
            <NuxtImg
              :src="image || '/image 10.png'"
              class="w-full h-full max-h-[500px] object-contain rounded-lg"
            />
          </div>

          <!-- Right Column - Product Details -->
          <div class="flex flex-col gap-3">
            <!-- Product Title -->
            <h3 class="text-xl font-bold">
              {{ title || "Ghế Denim đơn giản" }}
            </h3>

            <!-- Rating -->
            <div class="flex items-center gap-1">
              <template v-for="star in 5" :key="star">
                <UIcon
                  v-if="star <= Math.floor(Number(stars) || 0)"
                  name="i-heroicons-star-solid"
                  class="size-5 text-yellow-400"
                />
                <div
                  v-else-if="star - 0.5 <= (Number(stars) || 0)"
                  class="relative size-5"
                >
                  <UIcon
                    name="i-heroicons-star"
                    class="size-5 text-yellow-400 absolute"
                  />
                  <UIcon
                    name="i-heroicons-star-solid"
                    class="size-5 text-yellow-400 absolute"
                    style="clip-path: inset(0 50% 0 0)"
                  />
                </div>
                <UIcon
                  v-else
                  name="i-heroicons-star"
                  class="size-5 text-yellow-400"
                />
              </template>
              <span class="text-muted ml-2"
                >({{ view }} người đã đánh giá)</span
              >
            </div>

            <!-- Price -->
            <div v-if="Number(salePrice) === 0" class="flex items-center">
              <p class="text-primary text-[19px] font-bold">
                {{ price || "190.000 " }} đ
              </p>
            </div>
            <div v-else class="flex items-center">
              <p class="line-through text-muted text-[19px] mr-[13px]">
                {{ price || "250.000 " }} đ&nbsp;
              </p>
              <p class="text-toned text-[19px] font-bold">
                {{ salePrice || "190.000 " }} đ
              </p>
            </div>
            <p class="text-muted text-sm">
              Thương hiệu:<span class="font-bold">{{ " " + brand }}</span>
            </p>
            <p class="text-muted text-sm">
              Loại:<span class="font-bold">{{ " " + room_id }}</span>
            </p>
            <p class="text-muted text-sm">
              Hàng có sẵn:<span class="font-bold">{{
                status ? " Có sẵn" : " Hết hàng"
              }}</span>
            </p>
            <p class="text-muted text-sm">Mã số:{{ " " + sku }}</p>
            <UButton
              size="xl"
              variant="solid"
              class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit cursor-pointer"
              @click="handleAddToCart()"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
              ></span>
              <span
                class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
              >
                <span>Thêm giỏ hàng</span>
                <UIcon name="i-lucide-arrow-right"></UIcon>
              </span>
            </UButton>
          </div>
        </div>
      </template>
      <!-- Modal content stays the same -->
    </UModal>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    big?: boolean;
    title?: string;
    image?: string;
    badge?: string;
    stars?: string;
    price?: string;
    salePrice?: string;
    badgeColor?: string;
    id: number;
    view: number;
    brand: string;
    sku: string;
    room_id: number;
    status: number;
    slug: string;
  }>();

  // 🟢 SỬA: Dùng hàm mới từ useWishlist
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const toast = useToast();
  const router = useRouter();

  const goToDetail = (slug: string) => {
    router.push(`/san-pham/${slug}`);
  };

  // Modal state
  const isModalOpen = ref(false);

  const handleAddToCart = async () => {
    if (!props.id) {
      toast.add({ title: "Sản phẩm không hợp lệ", color: "error" });
      return;
    }

    try {
      const result = await addToCart(props.id, 1);
      if (result) {
        toast.add({ title: "Đã thêm vào giỏ hàng!", color: "success" });
      } else {
        toast.add({ title: "Thêm giỏ hàng thất bại!", color: "error" });
      }
    } catch (error: any) {
      toast.add({
        title:
          "Lỗi khi thêm vào giỏ hàng: " +
          (error?.message || "Không rõ nguyên nhân"),
        color: "error",
      });
    }
  };

  // 🟢 SỬA: Dùng hàm mới addToWishlist
  const handleAddToWishlist = async (productId: number) => {
    try {
      // 🟢 KIỂM TRA NẾU ĐÃ CÓ TRONG WISHLIST
      if (isInWishlist(productId)) {
        toast.add({
          title: "✅ Sản phẩm đã có trong yêu thích!",
          color: "info",
        });
        return;
      }

      const success = await addToWishlist(productId);
    } catch (error) {
      console.log(error);
    }
  };
</script>
