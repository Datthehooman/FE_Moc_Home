<template>
  <div class="relative w-full h-[555px]">
    <img src="/Banner 5.png" class="w-full" alt="Banner 3" />
    <div class="absolute top-10.5 left-1/2 -translate-x-1/2 text-center">
      <p class="font-bold text-primary leading-7 uppercase tracking-widest">
        LỜI CHỨNG THỰC
      </p>
      <p class="font-medium text-[32px]">
        Những gì khách hàng của chúng tôi <span class="text-info">nói</span>
      </p>
    </div>

    <div class="absolute inset-0 flex justify-center top-[159px]">
      <UCarousel
        v-slot="{ item }"
        :duration="150"
        :items="reviews.length > 0 ? reviews : defaultItems"
        dots
        :slides-to-scroll="2"
        :autoplay="{
          delay: 5000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }"
        :ui="{
          viewport: 'mx-18.5',
          dot: [
            'bg-primary',
            'size-2',
            'data-[state=active]:w-5',
            'data-[state=active]:h-2',
            'data-[state=active]:bg-primary',
          ],
          dots: 'bottom-9',
          container: 'gap-7.5',
          item: 'basis-[calc(25%-30px)]',
        }"
      >
        <div class="w-full h-[330px] bg-white rounded-lg p-7.5">
          <div class="flex items-center mb-8">
            <UAvatar
              :src="item.user?.avatar || '/avatar.png'"
              class="size-[65px] mr-3"
            />
            <div class="font-bold">
              <p>{{ item.user?.name || "Khách hàng" }}</p>
              <p class="text-secondary text-[13px]">Khách hàng</p>
            </div>
          </div>
          <p class="text-[13px] font-medium text-muted mb-5 line-clamp-4">
            {{
              item.comment ||
              "Nội thất ở đây vừa đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất đáng để tin tưởng và lựa chọn lâu dài."
            }}
          </p>

          <div class="flex items-center gap-1">
            <template v-for="star in 5" :key="star">
              <UIcon
                v-if="star <= Math.floor(item.rating || 5)"
                name="i-heroicons-star-solid"
                class="size-4 text-yellow-400"
              />
              <div
                v-else-if="star - 0.5 <= (item.rating || 5)"
                class="relative size-4"
              >
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
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Review {
    id: number;
    rating: number;
    comment: string;
    user?: {
      name: string;
      avatar?: string;
    };
  }

  const props = defineProps<{
    reviews: Review[];
  }>();

  const defaultItems = [
    {
      id: 1,
      rating: 5,
      comment:
        "Nội thất ở đây vừa đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô tả.",
    },
    {
      id: 2,
      rating: 5,
      comment: "Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận.",
    },
    { id: 3, rating: 5, comment: "Rất đáng để tin tưởng và lựa chọn lâu dài." },
    { id: 4, rating: 5, comment: "Sản phẩm chất lượng, dịch vụ tuyệt vời!" },
  ];
</script>
