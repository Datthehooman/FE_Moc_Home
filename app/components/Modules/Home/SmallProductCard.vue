<template>
  <div
    class="h-[140px] w-[410px] p-[11px] relative group flex items-center bg-accented rounded-2xl"
  >
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
        class="absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer -bottom-0.5 -right-0.5 border-4 border-white z-30"
        @click="handleAddToCart()"
      >
        <UIcon
          class="size-[19px] text-white"
          name="i-heroicons-shopping-bag-solid"
        />
      </div>
    </UTooltip>
    <div class="size-30 p-2.5 bg-white rounded-2xl z-10 mr-3.5 overflow-hidden">
      <NuxtImg
        :src="image || '/image 10.png'"
        class="w-full max-h-[207px] object-contain mb-[13px] mx-auto transition-transform duration-300 group-hover:scale-110"
        @click="goToDetail(slug)"
      />
    </div>
    <div>
      <p class="font-semibold text-lg">
        {{ title || "Ghế Denim đơn giản" }}
      </p>
      <div class="flex items-center gap-1 my-[9px]">
        <template v-for="star in 5" :key="star">
          <UIcon
            v-if="star <= Math.floor(stars || 0)"
            name="i-heroicons-star-solid"
            class="size-4 text-yellow-400"
          />
          <div v-else-if="star - 0.5 <= (stars || 0)" class="relative size-4">
            <UIcon
              name="i-heroicons-star"
              class="size-4 text-yellow-400 absolute"
            />
            <UIcon
              name="i-heroicons-star-solid"
              class="size-4 text-yellow-400 absolute"
              style="clip-path: inset(0 50% 0 0)"
            />
          </div>
          <UIcon
            v-else
            name="i-heroicons-star"
            class="size-4 text-yellow-400"
          />
        </template>
      </div>
      <div class="flex items-center font-semibold text-[15px]">
        <div v-if="Number(salePrice) === 0">
          <p class="mr-3">&nbsp;</p>
          <p class="text-toned">{{ price || "190.000 " }} đ</p>
        </div>
        <div v-else>
          <p class="line-through text-[#afafaf] mr-3">
            {{ price || "250.000 " }} đ
          </p>
          <p class="text-toned">{{ salePrice || "190.000 " }} đ</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
    image?: string;
    badge?: string;
    stars?: number;
    price?: string;
    salePrice?: string;
    badgeColor?: string;
    slug: string;
    id: number;
  }>();

  const { addToCart } = useCart();
  const toast = useToast();
  const router = useRouter();

  const goToDetail = (slug: string) => {
    router.push(`/san-pham/${slug}`);
  };

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
</script>
