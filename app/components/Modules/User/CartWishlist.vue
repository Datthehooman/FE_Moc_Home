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
      <div v-if="isSelecting" class="absolute top-2 left-2 z-30">
        <input
          type="checkbox"
          :checked="isSelected"
          @change="toggleSelect"
          class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      

      </div>
      <div class="relative w-full flex justify-center mb-3">
        <!-- BADGE -->
        <span
          v-if="
            item.product.badge &&
            item.product.badge.trim() !== '' &&
            item.product.badge !== 'Giảm 50%'
          "
          class="absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"
          :class="{
            'bg-[#F05454]': item.product.badge === 'Mới',
            'bg-[#00BFFF]': item.product.badge === 'Hot',
            'bg-[#6E4E37]': !['Mới', 'Hot'].includes(item.product.badge),
          }"
        >
          {{ item.product.badge }}
        </span>

        <!-- 🖼️ HÌNH ẢNH -->
        <img
          :src="resolvedThumbnail"
          :alt="item.product.product_name"
          @click="goToDetail"
          class="w-[180px] h-[180px] object-contain relative z-10 transition-transform duration-500 ease-out cursor-pointer group-hover:scale-105"
          @error="onImageError"
        />

        <!-- ICON HOVER -->
        <div
          class="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20"
        >
          <!-- 👁️ Xem sản phẩm -->
          <UTooltip text="Xem sản phẩm">
            <button
              @click="goToDetail"
              class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
            >
              <UIcon name="i-heroicons-eye-solid" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>

          <!-- ❌ Xóa yêu thích -->
          <UTooltip text="Xóa yêu thích">
            <button
              @click="removeFromWishlist"
              class="w-[38px] h-[38px] rounded-full bg-red-500 flex justify-center items-center text-white shadow-md hover:bg-red-600 transition"
            >
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5 text-white" />
            </button>
          </UTooltip>
        </div>
      </div>

      <!-- TÊN -->
      <h3
        class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate"
      >
        {{ item.product.product_name }}
      </h3>

      <!-- ⭐ RATING -->
      <div class="flex mt-1 px-2 text-left">
        <UIcon
          v-for="n in 5"
          :key="n"
          :name="
            Number(item.product.rating ?? 0) >= n
              ? 'i-heroicons-star-solid'
              : 'i-heroicons-star'
          "
          class="w-4 h-4"
          :class="
            Number(item.product.rating ?? 0) >= n
              ? 'text-yellow-400'
              : 'text-gray-300'
          "
        />
      </div>

      <!-- 💰 GIÁ + 🛒 GIỎ HÀNG -->
      <div class="mt-2 flex items-center justify-between w-full px-2">
        <div class="text-left">
          <span class="text-[#E95D5D] font-semibold text-[19px] block">
            {{ formatPrice(item.product.price_down ?? item.product.price) }}
          </span>
        </div>

        <!-- 🛒 GIỎ HÀNG -->
        <UTooltip text="Thêm giỏ hàng">
          <button
            @click="addToCartHandler"
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlist } from '~/composables/useWishlist'
import { useCart } from '~/composables/useCart'


const props = defineProps<{ item: any; itemWidth: number }>()
const emit = defineEmits<{
  removed: [productId: number]
  toggle: [productId: number, isSelected: boolean]
}>()
const router = useRouter()
const { addToCart } = useCart()
const { deleteWishlist } = useWishlist()

const errorImage = ref(false)

  const resolvedThumbnail = computed(() => {
    if (errorImage.value) return "/placeholder.png";
    const product = props.item.product;
    if (product.thumbnail?.startsWith("http")) return product.thumbnail;
    if (product.images?.length && product.images[0].image_url)
      return `http://127.0.0.1:8000/storage/${product.images[0].image_url}`;
    return "/placeholder.png";
  });

  const onImageError = () => {
    errorImage.value = true;
  };

  const formatPrice = (price: number | string | undefined) => {
    if (!price) return "";
    const numericPrice = typeof price === "number" ? price : parseFloat(price);
    return (
      numericPrice.toLocaleString("vi-VN", { minimumFractionDigits: 0 }) + "₫"
    );
  };

  const goToDetail = () => {
    router.push(`/san-pham/${props.item.product.slug}`);
  };

  const addToCartHandler = async () => {
    const productId = props.item.product.product_id;
    if (!productId) return alert("❌ Sản phẩm không hợp lệ");

    try {
      const res = await addToCart(productId, 1);
      if (res) alert("✅ Đã thêm vào giỏ hàng!");
      else alert("❌ Thêm giỏ hàng thất bại.");
    } catch (e: any) {
      alert("❌ Lỗi: " + (e?.message || "Không rõ"));
    }
  };



const removeFromWishlist = async () => {
  if (!confirm('Bạn có chắc muốn xoá sản phẩm này khỏi yêu thích?')) {
    return;
  }

  const productId = props.item.product.product_id;
  
  try {
    console.log('🗑️ Attempting to remove product:', productId);
    
    const ok = await deleteWishlist(productId);
    
    if (ok) {
      // 🟢 Phát emit để thông báo cho component cha
      emit('removed', productId);
      
      // ✅ Hiển thị thông báo thành công
      alert('✅ Đã xóa sản phẩm khỏi yêu thích!');
      
      console.log('✅ Successfully removed product from wishlist');
    } else {
      // ❌ Xử lý khi xóa thất bại
      const errorMsg = 'Không thể xóa sản phẩm. Vui lòng thử lại.';
      alert(`❌ ${errorMsg}`);
      console.error('❌ Failed to remove product from wishlist');
    }
  } catch (error: any) {
    // 🚨 Xử lý lỗi
    console.error('🚨 Error in removeFromWishlist:', error);
    
    let errorMessage = '❌ Lỗi khi xóa sản phẩm!';
    
    if (error?.status === 401) {
      errorMessage = '❌ Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      // Có thể redirect đến login page
      router.push('/login');
    } else if (error?.message) {
      errorMessage = `❌ Lỗi: ${error.message}`;
    }
    
    alert(errorMessage);
  }
};
// THÊM HÀM XỬ LÝ CHỌN SẢN PHẨM
const toggleSelect = () => {
  const productId = props.item.product.product_id;
  emit('toggle', productId, !props.isSelected);
};
</script>
