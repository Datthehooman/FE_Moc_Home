<template>
  <div class="bg-[#FFFBF8] min-h-screen w-full p-4 md:p-10">
    <div class="max-w-full mx-auto flex flex-col">
      <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Đánh giá đơn hàng</h1>
          <p class="text-sm text-gray-400 mt-1">Sản phẩm đã đánh giá sẽ không xuất hiện trong danh sách này.</p>
        </div>
        <NuxtLink to="/user/orders/list" class="px-6 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition font-medium border border-gray-200">
          Quay lại đơn hàng
        </NuxtLink>
      </div>

      <div v-if="loading" class="py-20 text-center bg-white rounded-3xl shadow-sm">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A77A5D] mx-auto mb-4"></div>
        <p class="text-gray-500">Đang kiểm tra dữ liệu...</p>
      </div>

      <div v-else-if="reviewItems.length === 0" class="py-20 text-center bg-white rounded-3xl shadow-sm">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-2xl font-bold text-gray-800">Hoàn tất!</h2>
        <p class="text-gray-500 mt-2">Tất cả sản phẩm đã được đánh giá xong.</p>
        <NuxtLink to="/user/orders/list" class="mt-8 inline-block px-10 py-3 bg-[#A77A5D] text-white rounded-xl shadow-lg">Quay lại</NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="(item, index) in reviewItems" 
          :key="item.order_detail_id"
          class="bg-white rounded-3xl shadow-sm border border-gray-50 p-6 flex flex-col lg:flex-row items-center gap-10"
        >
          <div class="flex items-center gap-6 w-full lg:w-[35%]">
            <img :src="item.image" class="w-24 h-24 object-cover rounded-2xl border" />
            <div class="min-w-0">
              <h4 class="font-bold text-gray-800 text-lg truncate">{{ item.name }}</h4>
              <p class="text-xs font-bold text-gray-400 uppercase mt-1">{{ item.color || 'Mặc định' }}</p>
              <span class="inline-block mt-2 text-xs font-semibold text-[#A77A5D]">Số lượng: {{ item.quantity }}</span>
            </div>
          </div>

          <div class="w-full lg:w-[20%] flex flex-col items-center lg:border-x border-gray-100 px-4">
            <div class="flex gap-1 mb-2">
              <button 
                v-for="star in 5" :key="star"
                @click="updateRating(index, star)"
                class="text-4xl transition-transform active:scale-125"
                :class="item.rating >= star ? 'text-yellow-400' : 'text-gray-200'"
              >
                ★
              </button>
            </div>
            <p class="text-xs font-bold text-[#A77A5D] uppercase italic">{{ getRatingText(item.rating) }}</p>
          </div>

          <div class="w-full lg:flex-1">
            <textarea
              v-model="item.comment"
              rows="2"
              class="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#A77A5D]/20 outline-none transition-all shadow-inner"
              placeholder="Chia sẻ cảm nhận (tối thiểu 10 kí tự)..."
            ></textarea>
            
            <div class="flex justify-between mt-1 px-2">
              <p v-if="item.comment.trim().length < 10 && item.comment.trim().length > 0" class="text-[10px] text-red-500 font-medium">
                Cần thêm {{ 10 - item.comment.trim().length }} kí tự nữa
              </p>
              <p v-else-if="item.comment.trim().length === 0" class="text-[10px] text-gray-400">
                Vui lòng nhập đánh giá
              </p>
              <p v-else class="text-[10px] text-green-500 font-medium">Độ dài hợp lệ</p>
              
              <span class="text-[10px] text-gray-400">{{ item.comment.trim().length }}/500</span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end pb-10">
          <button
            @click="submitAll"
            :disabled="creatingReview || reviewItems.length === 0 || isInvalid"
            class="px-10 py-3 bg-[#A77A5D] text-white font-bold rounded-xl shadow-lg hover:bg-[#8e6a50] transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:shadow-none"
          >
            <div v-if="creatingReview" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span class="text-sm uppercase tracking-wider">
              {{ creatingReview ? 'Đang gửi...' : 'Gửi tất cả đánh giá' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const toast = useToast();
const { loading, creatingReview, fetchAllProductsToReview, productsToReview, createReview, fetchDetailToReview, detailToReview } = useReview();

const reviewItems = ref<any[]>([]);

const RATING_COMMENTS: Record<number, string> = {
  1: "Thất vọng! Sản phẩm/dịch vụ cần cải thiện rất nhiều.",
  2: "Không hài lòng. Vẫn còn nhiều thiếu sót cần khắc phục.",
  3: "Bình thường. Chất lượng ở mức chấp nhận được.",
  4: "Hài lòng. Sản phẩm tốt, gần như hoàn hảo.",
  5: "Tuyệt vời! Sản phẩm siu siu đẹp. Rất đáng tiền!",
};

const getRatingText = (star: number) => RATING_COMMENTS[star];

const updateRating = (index: number, star: number) => {
  reviewItems.value[index].rating = star;
  reviewItems.value[index].comment = RATING_COMMENTS[star];
};
const isInvalid = computed(() => {
  return reviewItems.value.some(item => {
    const comment = item.comment ? item.comment.trim() : '';
    return comment.length < 10; // Giới hạn tối thiểu 10 kí tự
  });
});
const submitAll = async () => {
  if (isInvalid.value) {
    toast.add({ 
      title: "Thông báo", 
      description: "Tất cả đánh giá phải đạt tối thiểu 10 ký tự.", 
      color: "warning" 
    });
    return;
  }

  try {
    creatingReview.value = true;
    for (const item of reviewItems.value) {
      await createReview({
        order_detail_id: item.order_detail_id,
        rating: item.rating,
        comment: item.comment.trim() // Xóa khoảng trắng thừa
      });
    }
    toast.add({ title: "Thành công!", color: "success" });
    router.push("/user/orders/list");
  } catch (e: any) {
    // ... logic catch cũ
  } finally {
    creatingReview.value = false;
  }
};

onMounted(async () => {
  const orderId = route.query.orderId;
  const singleId = route.query.orderDetailId;

  if (orderId) {
    await fetchAllProductsToReview(Number(orderId));
    reviewItems.value = productsToReview.value.map(p => ({
      ...p,
      rating: 5,
      comment: RATING_COMMENTS[5]
    }));
  } else if (singleId) {
    await fetchDetailToReview(Number(singleId));
    if (detailToReview.value) {
      reviewItems.value = [{
        ...detailToReview.value,
        rating: 5,
        comment: RATING_COMMENTS[5]
      }];
    }
  }
});
</script>