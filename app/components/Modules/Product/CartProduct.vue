<template>
  <div
    class="relative group h-[330px] flex-shrink-0"
    :style="{ width: itemWidth + 'px' }"
  >
    <!-- BOX NỀN DƯỚI -->
    <div
      class="absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0"
      :class="['h-[180px] group-hover:h-full shadow-sm group-hover:shadow-md']"
    ></div>

    <!-- NỘI DUNG -->
    <div class="relative z-10 p-4 flex flex-col">
      <div class="relative w-full flex justify-center mb-3">
        <!-- BADGE -->
        <span
          v-if="item.badge && item.badge.trim() !== ''"
          class="absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"
          :class="{
            'bg-[#F05454]': item.badge === 'Mới',
            'bg-[#00BFFF]': item.badge === 'Hot',
            'bg-[#FBA707]': item.badge === 'Giảm 50%',
          }"
        >
          {{ item.badge }}
        </span>

        <!-- 🖼️ HÌNH ẢNH -->
        <img
          :src="resolvedThumbnail"
          :alt="item.product_name"
          @click="goToDetail"
          class="w-[180px] h-[180px] object-contain relative z-10 transition-transform duration-500 ease-out cursor-pointer"
          @error="onImageError"
        />

        <!-- ICON HOVER -->
        <div
          class="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20"
        >
          <!-- 👁️ Xem sản phẩm -->
          <UTooltip text="Xem sản phẩm">
            <button
              @click="$emit('view', item)"
              class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
            >
              <UIcon name="i-heroicons-eye-solid" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>

          <!-- ❤️ Yêu thích -->
          <UTooltip text="Thêm yêu thích">
            <button
              @click="handleAddToWishlist"
              class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
            >
              <UIcon name="i-heroicons-heart" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>
        </div>
      </div>

      <!-- TÊN -->
      <h3
        class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate"
      >
        {{ item.product_name }}
      </h3>

      <!-- ⭐ RATING -->
      <div class="flex mt-1 px-2 text-left">
        <UIcon
          v-for="n in 5"
          :key="n"
          :name="
            Number(item.rating ?? 0) >= n
              ? 'i-heroicons-star-solid'
              : 'i-heroicons-star'
          "
          class="w-4 h-4"
          :class="
            Number(item.rating ?? 0) >= n ? 'text-yellow-400' : 'text-gray-300'
          "
        />
      </div>

      <!-- 💰 GIÁ -->
      <div class="mt-2 flex items-center justify-between w-full px-2">
        <div class="text-left">
          <span
            v-if="item.badge === 'Giảm 50%' && item.price_down"
            class="line-through text-gray-400 text-[14px] block"
          >
            {{ formatPrice(item.price) }}
          </span>
          <span class="text-[#E95D5D] font-semibold text-[19px] block">
            {{ formatPrice(item.price_down || item.price) }}
          </span>
        </div>

        <!-- 🛒 GIỎ HÀNG -->
        <UTooltip text="Thêm giỏ hàng">
          <button
            @click="handleAddToCart"
            class="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
          >
            <UIcon
              name="i-heroicons-shopping-bag-solid"
              class="w-5 h-5 text-white"
            />
          </button>
        </UTooltip>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "~/composables/useCart";
import { useWishlist } from "~/composables/useWishlist";

const props = defineProps<{
  item: any;
  itemWidth: number;
}>();
const emit = defineEmits(["view"]);
const router = useRouter();
const { addToCart } = useCart();
const { addToWishlist, isInWishlist } = useWishlist();
const toast = useToast();
const errorImage = ref(false);

const resolvedThumbnail = computed(() => {
  if (props.item.thumbnail?.startsWith("http")) return props.item.thumbnail;
  if (props.item.images?.length && props.item.images[0].image_url) {
    const path = props.item.images[0].image_url.replace(/^\/+/, "");
    return `https://api.mocfurni.shop/storage/${path}`;
  }
});

const onImageError = () => {
  errorImage.value = true;
};

const formatPrice = (price: number | undefined) =>
  price ? price.toLocaleString("vi-VN") + "₫" : "";

let hasViewed = false;
const goToDetail = () => {
  if (!hasViewed) hasViewed = true;
  router.push(`/san-pham/${props.item.slug}`);
};

const handleAddToCart = async () => {
  if (!props.item.product_id) {
    toast.add({ title: "❌ Sản phẩm không hợp lệ", color: "error" });
    return;
  }
  try {
    const result = await addToCart(props.item.product_id, 1);
   
  } catch (error: any) {
    toast.add({
      title: "❌ Lỗi khi thêm vào giỏ hàng: " + (error?.message || "Không rõ nguyên nhân"),
      color: "error",
    });
  }
};

const handleAddToWishlist = async () => {
  if (!props.item.product_id) {
    // toast.add({ title: "❌ Sản phẩm không hợp lệ", color: "error" });
    return;
  }

  try {
    if (isInWishlist(props.item.product_id)) {
      // toast.add({ title: "ℹ️ Sản phẩm đã có trong yêu thích!", color: "info" });
      return;
    }
    const success = await addToWishlist(props.item.product_id);
    toast.add({
      // title: success ? "✅ Đã thêm sản phẩm vào yêu thích!" : "❌ Không thể thêm vào yêu thích!",
      // color: success ? "success" : "error",
    });
  } catch (error: any) {
    toast.add({
      // title: "❌ Lỗi khi thêm vào yêu thích: " + (error?.message || "Không rõ nguyên nhân"),
      // color: "error",
    });
  }
};
</script>
