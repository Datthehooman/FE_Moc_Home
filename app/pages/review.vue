<template>
  <div class="bg-gray-50 min-h-screen w-full">
    <div class="review-container w-full bg-white shadow-sm min-h-screen flex flex-col">
      <div class="bg-[#AC8972] text-white p-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <span class="font-bold uppercase tracking-wider text-sm">Đánh giá sản phẩm</span>
        </div>

        <NuxtLink
          to="/user/orders/list"
          class="px-3 py-1.5 bg-[#FEE1C7] rounded text-black font-medium shadow-sm hover:bg-[#FCD8B9] transition text-xs flex-shrink-0"
        >
          &larr; Quay lại đơn hàng
        </NuxtLink>
      </div>

      <div v-if="loading" class="flex-grow flex items-center justify-center p-10 text-gray-500">
        <p class="text-lg">Đang tải thông tin sản phẩm...</p>
      </div>

      <div v-else-if="error" class="flex-grow flex items-center justify-center p-10 text-red-600">
        <p class="text-base text-gray-600 font-medium">Bạn đã đánh giá sản phẩm này rồi!</p>
      </div>

      <div v-else-if="detailToReview" class="p-4 sm:p-8 max-w-7xl mx-auto w-full flex-grow">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
            <div class="sticky top-8">
              <div class="w-full aspect-square max-w-[250px] mx-auto bg-white flex items-center justify-center rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-4">
                <img
                  v-if="detailToReview.image"
                  :src="detailToReview.image"
                  :alt="detailToReview.name"
                  class="object-cover w-full h-full"
                />
                <span v-else class="text-sm text-gray-400">Không ảnh sản phẩm</span>
              </div>
              <div class="text-center lg:text-left">
                <h3 class="font-bold text-2xl text-gray-800 mb-3 leading-tight">
                  {{ detailToReview.name }}
                </h3>
                
                <div class="space-y-2 text-lg text-gray-600">
                  <p>
                    Màu sắc: 
                    <span class="font-semibold text-gray-900">{{ detailToReview.color ?? "N/A" }}</span>
                  </p>
                  <p>
                    Số lượng: 
                    <span class="font-semibold text-gray-900">{{ detailToReview.quantity }}</span>
                  </p>
                  
                  <p class="font-bold text-red-600 text-2xl mt-4">
                    Giá: {{ detailToReview.price }} ₫
                  </p>
                  
                  <p class="text-xm text-gray-400 mt-6 uppercase tracking-wider">
                    Mã đơn: #{{ detailToReview.order_code }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2">
            <form @submit.prevent="submitReview" class="space-y-6">
              <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <label class="block text-gray-800 text-sm font-bold mb-4 uppercase tracking-wide">
                  Chất lượng sản phẩm <span class="text-red-500">*</span>
                </label>
                <div class="flex items-center space-x-2 mb-4">
                  <span
                    v-for="star in 5"
                    :key="star"
                    @click="reviewForm.rating = star"
                    :class="[
                      'cursor-pointer transition-transform hover:scale-110',
                      reviewForm.rating >= star ? 'text-yellow-400' : 'text-gray-300',
                    ]"
                  >
                    <svg class="w-10 h-10 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </span>
                </div>
                <p v-if="reviewForm.rating > 0" class="text-sm font-medium text-[#AC8972] italic">
                  "{{ ratingComment }}"
                </p>
              </div>

              <div>
                <label for="comment" class="block text-gray-800 text-sm font-bold mb-3 uppercase tracking-wide">
                  Ý kiến chi tiết <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  v-model="reviewForm.comment"
                  rows="6"
                  class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#AC8972] focus:border-transparent outline-none transition text-base shadow-sm"
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                  maxlength="500"
                ></textarea>
                <p class="text-[11px] text-gray-400 mt-2 text-right">
                  Ký tự: {{ reviewForm.comment.trim().length }}/500
                </p>
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="!isFormValid || creatingReview"
                  :class="[
                    'px-8 py-2.5 rounded-lg text-white font-bold text-sm transition-all duration-200 shadow-md',
                    isFormValid && !creatingReview
                      ? 'bg-[#AC8972] hover:bg-[#8e7362] active:scale-95'
                      : 'bg-gray-300 cursor-not-allowed',
                  ]"
                >
                  <span v-if="creatingReview">Đang gửi...</span>
                  <span v-else>GỬI ĐÁNH GIÁ</span>
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });

  import { useRoute, useRouter } from "vue-router";
  import { onMounted, ref, computed } from "vue";
  import { useReview } from "~/composables/useReview";
  // Giả định có composable/plugin toast, ở đây dùng alert() để mô phỏng.

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  // --- State ---
  const orderDetailId = ref<number | null>(null);
  const reviewForm = ref({
    rating: 0, // 1 đến 5
    comment: "",
    order_detail_id: 0,
  });

  const {
    loading,
    error,
    detailToReview,
    createReview,
    creatingReview,
    fetchDetailToReview,
  } = useReview();

  // --- Data for Rating Comments (Nhận xét mặc định) ---
  const RATING_COMMENTS: Record<number, string> = {
    1: "Thất vọng! Sản phẩm/dịch vụ cần cải thiện rất nhiều.",
    2: "Không hài lòng. Vẫn còn nhiều thiếu sót cần khắc phục.",
    3: "Bình thường. Chất lượng ở mức chấp nhận được.",
    4: "Hài lòng. Sản phẩm tốt, gần như hoàn hảo.",
    5: "Tuyệt vời! Sản phẩm vượt qué đẹp. Rất đáng tiền!",
  };

  // --- Computed ---
  const isFormValid = computed(() => {
    // Form hợp lệ khi rating > 0 và comment phải có ít nhất 5 ký tự
    return (
      reviewForm.value.rating > 0 && reviewForm.value.comment.trim().length >= 5
    );
  });

  const ratingComment = computed(() => {
    return (
      RATING_COMMENTS[reviewForm.value.rating] ||
      "Hãy chọn số sao để chúng tôi hiểu mức độ hài lòng của bạn."
    );
  });

  // --- Methods ---

  // Xử lý gửi đánh giá
  const submitReview = async () => {
    if (!isFormValid.value || !orderDetailId.value) return; //

    // Giả định bạn cần lấy Order ID gốc từ detailToReview để quay lại trang chi tiết đơn hàng
    // Nhưng vì detailToReview chỉ có order_code, chúng ta sẽ quay về list để đơn giản.
    // Nếu bạn muốn quay về trang chi tiết đơn hàng, bạn cần biết ID của đơn hàng gốc (không phải orderDetailId)
    // Hiện tại, ta quay về list đơn hàng:

    try {
      await createReview({
        order_detail_id: orderDetailId.value, //
        rating: reviewForm.value.rating, //
        comment: reviewForm.value.comment.trim(), //
      });

      // 🔥 CẢI TIẾN: Thay vì chuyển về trang chủ ('/'), ta chuyển về trang list đơn hàng
      // và thêm query parameter để báo hiệu đánh giá thành công.
      toast.add({
        title: "Đánh giá đã được gửi thành công! 🎉 Cảm ơn bạn!",
        color: "success",
      });

      // Chuyển hướng về list đơn hàng và thêm flag 'refresh'
      router.push({
        path: "/user/orders/list",
        query: { refresh: "true" },
      });
    } catch (e: any) {
      console.error("Lỗi khi gửi đánh giá:", e); //
      toast.add({
        title: `Lỗi: ${e.message}`,
        color: "error",
      });
    }
  };

  // Lấy dữ liệu khi component được mount
  onMounted(async () => {
    // 🔥 SỬA: Chỉ lấy ID từ query parameter (orderDetailId) vì route là tĩnh /review
    const idParam = route.query.orderDetailId;

    if (idParam) {
      // Đảm bảo xử lý đúng kiểu dữ liệu (từ string sang number)
      const id = Array.isArray(idParam)
        ? parseInt(idParam[0] as string)
        : parseInt(idParam as string);

      if (!isNaN(id) && id > 0) {
        orderDetailId.value = id;
        reviewForm.value.order_detail_id = id;

        // Gọi API để lấy chi tiết sản phẩm cần đánh giá
        await fetchDetailToReview(id);
      } else {
        error.value = "ID chi tiết đơn hàng không hợp lệ (không phải số).";
        loading.value = false;
      }
    } else {
      error.value =
        "Thiếu ID chi tiết đơn hàng để đánh giá. Vui lòng quay lại trang chi tiết đơn hàng.";
      loading.value = false;
    }
  });
</script>

<style scoped>
  /* Không cần phần <style> tùy chỉnh vì đã dùng Tailwind CSS class chi tiết hơn */
  .review-container {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
