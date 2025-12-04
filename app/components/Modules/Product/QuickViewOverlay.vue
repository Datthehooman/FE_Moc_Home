<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
  >
    <div
      class="bg-white w-[750px] rounded-[15px] relative p-4 flex max-h-[90vh] overflow-y-auto"
    >
      <!-- Nút đóng -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary hover:bg-[#F05454] flex items-center justify-center text-white text-xl font-bold transition-colors z-10"
        aria-label="Đóng"
      >
        &times;
      </button>

      <!-- Ảnh sản phẩm -->
      <div class="w-1/2 flex items-center justify-center p-4">
        <img
          :src="getImageUrl(product)"
          alt="Ảnh sản phẩm"
          class="object-contain max-h-96 w-full rounded-lg"
        />
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="w-1/2 p-4 pt-10 space-y-3">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ product.product_name }}
        </h2>

        <!-- ⭐ Rating -->
        <div class="flex items-center space-x-2">
          <div class="flex">
            <svg
              v-for="n in 5"
              :key="n"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              :class="
                n <= (product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'
              "
            >
              <path
                fill-rule="evenodd"
                d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"
              />
            </svg>
            <p class="text-gray-400 text-[16px] ml-[5px]">
              ({{ product.rating || 0 }} đánh giá)
            </p>
          </div>
        </div>

        <!-- Giá -->
        <div class="flex items-baseline space-x-2 my-4">
          <p
            v-if="product.price_down"
            class="line-through text-gray-400 text-[16px]"
          >
            {{ formatPrice(product.price) }}
          </p>
          <p class="text-3xl font-bold text-primary text-[24px]">
            {{ formatPrice(product.price_down || product.price) }}
          </p>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="space-y-2 text-base">
          <p>
            <span class="text-gray-500">Thương hiệu:</span>
            <span class="font-semibold text-gray-700 ml-1">{{
              product.brand || "N/A"
            }}</span>
          </p>

          <p>
            <span class="text-gray-500">Loại:</span>
            <span class="font-bold text-gray-700 ml-1">{{
              product.category?.category_name || product.category_id || "N/A"
            }}</span>
          </p>

          <p>
            <span class="text-gray-500">Hàng có sẵn:</span>
            <span
              :class="
                product.stock_quantity > 0
                  ? 'text-primary font-bold ml-1'
                  : 'text-red-500 font-bold ml-1'
              "
            >
              {{ product.stock_quantity > 0 ? "Có sẵn" : "Hết hàng" }}
            </span>
          </p>

          <p>
            <span class="text-gray-500">Mã số:</span>
            <span class="font-semibold text-gray-700 ml-1">{{
              product.sku || "N/A"
            }}</span>
          </p>
        </div>

        <!-- Nút Thêm giỏ hàng -->
        <button
          type="button"
          @click="handleAddToCart"
          class="relative overflow-hidden px-6 py-3 bg-[#edb173] text-black font-semibold rounded-lg shadow-md group mt-4"
        >
          <span class="absolute inset-0 flex justify-center items-center">
            <span
              class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
            ></span>
          </span>

          <span
            class="relative z-10 group-hover:text-white flex items-center justify-center space-x-2 text-[16px]"
          >
            <span>Thêm giỏ hàng</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";

  interface Product {
    product_id: number;
    product_name: string;
    price: number;
    price_down?: number;
    rating?: number;
    brand?: string;
    sku?: string;
    stock_quantity: number;
    category?: { category_name: string };
    category_id?: number;
    images?: { image_url: string }[];
    thumbnail?: string;
  }

  const props = defineProps<{ show: boolean; product: Product }>();
  const emit = defineEmits<{ (e: "close"): void }>();
  const toast = useToast();

  const { addToCart } = useCart();

  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";

  const getImageUrl = (product: Product) => {
    const url = product.thumbnail || product.images?.[0]?.image_url;
    if (!url) return "/placeholder.png";
    return url.startsWith("http")
      ? url
      : `https://api.mocfurni.shop/storage/${url}`;
  };

  const handleAddToCart = async () => {
    if (!props.product.product_id) {
      toast.add({
        title: "Sản phẩm không hợp lệ",
        color: "warning",
      });
      return;
    }

    try {
      const result = await addToCart(props.product.product_id, 1);

      if (result) {
        toast.add({
          title: "Đã thêm vào giỏ hàng!",
          color: "success",
        });
      } else {
        toast.add({
          title: "Thêm giỏ hàng thất bại!",
          color: "error",
        });
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
