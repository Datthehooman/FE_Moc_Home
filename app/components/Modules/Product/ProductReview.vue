// ProductReview.vue

<template>
    <div class="bg-[#FFFBF8] flex justify-center mb-10">
    <div class="max-w-[85%] w-full">

    <div class="flex border-b border-gray-300 space-x-8">
      <button
        @click="tab = 'mota'"
        :class="[
          'pb-3 text-lg font-semibold transition-all duration-300',
          tab === 'mota'
            ? 'text-[#6E4E37] border-b-2 border-[#6E4E37]'
            : 'text-gray-500 hover:text-[#6E4E37]',
        ]"
      >
        Mô tả
      </button>
      <button
        @click="tab = 'danhgia'"
        :class="[
          'pb-3 text-lg font-semibold transition-all duration-300',
          tab === 'danhgia'
            ? 'text-[#6E4E37] border-b-2 border-[#6E4E37]'
            : 'text-gray-500 hover:text-[#6E4E37]',
        ]"
      >
        Đánh giá ({{ reviews.length.toString().padStart(2, '0') }})
      </button>
    </div>

    <transition
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
      mode="out-in"
    >
      <div :key="tab" class="mt-6 text-gray-700 leading-relaxed">
        <div v-if="tab === 'mota'">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="mb-6">
                <h3 class="font-bold text-[18px] text-[#6E4E37] mb-3">Mô tả sản phẩm</h3>
                <p class="text-gray-700 leading-relaxed text-[17px]">
                    <span v-if="loadingDetail">Đang tải mô tả...</span>
                    <span v-else>{{ productDetail?.description || 'Không có mô tả chi tiết.' }}</span>
                </p>
            </div>

            <div class="border-t border-gray-200 my-6 opacity-60"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="font-bold text-lg text-[#6E4E37] mb-3">Thông tin sản phẩm</h3>
                <ul class="text-[15px] space-y-3">
                  <li class="flex items-start">
                    <span class="font-semibold text-gray-800 min-w-[120px]">Tình trạng:</span>
                    <span v-if="loadingDetail" class="font-medium text-gray-500">Đang tải...</span>
                    <span v-else :class="[
                      'font-medium px-2 py-1 rounded-full text-sm',
                      productDetail?.stock_quantity > 0 
                        ? 'text-green-600 bg-green-50' 
                        : 'text-red-600 bg-red-50'
                    ]">
                      {{ productDetail?.stock_quantity > 0 ? 'Sẵn sàng giao' : 'Hết hàng' }}
                    </span>
                  </li>
                  <li class="flex items-start">
                    <span class="font-semibold text-gray-800 min-w-[120px]">Mã sản phẩm:</span>
                    <span v-if="loadingDetail" class="font-medium text-gray-500">Đang tải...</span>
                    <span v-else class="font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded">
                      {{ productDetail?.sku || 'Không có' }}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div class="space-y-4">
                <h3 class="font-bold text-lg text-[#6E4E37] mb-3">Phân loại</h3>
                <ul class="text-[15px] space-y-3">
                  <li class="flex items-start">
                    <span class="font-semibold text-gray-800 min-w-[120px]">Danh mục:</span>
                     <span v-if="loadingDetail" class="font-medium text-gray-500">Đang tải...</span>
                    <span v-else class="font-medium text-gray-700">
                      {{ productDetail?.category_name || 'Không có' }}
                    </span>
                  </li>
                  <li class="flex items-start">
                    <span class="font-semibold text-gray-800 min-w-[120px]">Thương hiệu:</span>
                    <span v-if="loadingDetail" class="font-medium text-gray-500">Đang tải...</span>
                    <span v-else class="font-medium text-gray-700">
                      {{ productDetail?.brand || 'Không có' }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div v-if="loadingReviews" class="mt-6 text-center text-gray-500">
              Đang tải đánh giá...
          </div>
          <div v-else-if="reviews.length === 0" class="mt-6 text-center text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên!
          </div>

          <div class="space-y-6 mt-6">
            <div
              v-for="(review, i) in reviews"
              :key="i"
              class="relative flex flex-col md:flex-row gap-4 p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img 
                :src="review.avatar || 'https://randomuser.me/api/portraits/men/60.jpg'" 
                class="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
              />
              <div class="flex-1 relative">
                <div class="absolute top-0 right-0 flex space-x-1">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-5 h-5 transition-all duration-200"
                    :class="n <= review.rating 
                      ? 'fill-yellow-400 stroke-yellow-500' 
                      : 'fill-transparent stroke-yellow-400/80'"
                    stroke-width="1.3"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-800 text-[17px]">
                  {{ review.name || review.order_detail?.order?.customer_name || 'Người dùng ẩn danh' }}
                </h3>
                <p class="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  {{ review.date || (review.created_at ? new Date(review.created_at).toLocaleDateString('vi-VN') : 'N/A') }}
                  
                  <span v-if="review.order_detail?.order?.order_code" class="text-xs ml-2 px-2 py-0.5 bg-gray-100 rounded">
                      Mã ĐH: {{ review.order_detail.order.order_code }}
                  </span>
                </p>
                <p class="mt-3 text-gray-700 text-[16px] leading-relaxed">
                  {{ review.comment }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              Để lại bình luận & đánh giá của bạn
            </h3>
            
            <div class="flex items-center mb-4 space-x-1">
              <span class="text-[15px] font-medium text-gray-700 mr-3">Đánh giá:</span>
              <svg
                v-for="n in 5"
                :key="n"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-7 h-7 cursor-pointer transition-all duration-300 ease-in-out"
                :class="n <= userRating 
                  ? 'fill-yellow-400 stroke-[#FBA707] scale-110' 
                  : 'fill-transparent stroke-[#FBA707] hover:fill-yellow-100 hover:scale-110'"
                stroke-width="1.5"
                @click="userRating = n"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>

            <textarea
              v-model="userComment"
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              class="w-full p-4 border border-gray-300 rounded-lg mb-4 text-[16px] focus:ring-2 focus:ring-[#6E4E37] focus:border-transparent transition-all duration-300 resize-none"
              rows="4"
            />
            <button
              @click="submitReview"
              class="bg-[#6E4E37] text-white px-6 py-3 rounded-lg hover:bg-[#5a3e2b] transition-all duration-300 font-medium text-[16px] shadow-sm hover:shadow-md"
              :disabled="creatingReview"
            >
              {{ creatingReview ? 'Đang gửi...' : 'Gửi bình luận' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 🔥 THAY THẾ: Xóa Mocking và giả định Import composable thực tế
// VUI LÒNG CUNG CẤP FILE useProduct.ts để tôi biết đường dẫn chính xác và các biến!
// TẠM THỜI GIẢ ĐỊNH ĐƯỜNG DẪN:
import { useProduct } from '~/composables/useProduct' // <--- HÃY THAY ĐỔI ĐƯỜNG DẪN NÀY CHO CHÍNH XÁC
import { useReview } from '~/composables/useReview' // <--- GIẢ ĐỊNH ĐƯỜNG DẪN CỦA useReview


const route = useRoute()
const slug = route.params.slug as string

// Lấy dữ liệu sản phẩm từ composable useProduct THẬT
// Giả định useProduct() trả về productDetail, loadingDetail, fetchProductDetail
const { productDetail, loadingDetail, errorDetail, fetchProductDetail } = useProduct()

// Lấy dữ liệu đánh giá từ composable useReview THẬT
const { 
    productReviews, 
    loading: loadingReviews, 
    error: reviewError, 
    fetchProductReviews,
    creatingReview 
} = useReview()

// TAB MÔ TẢ / ĐÁNH GIÁ
const tab = ref<'mota' | 'danhgia'>('mota')

// Cần một Computed property để gộp reviews từ API và reviews mới tạo (tạm thời)
const localReviews = ref<any[]>([])

const reviews = computed(() => {
    // Gộp reviews từ API (productReviews.value) và reviews mới tạo (localReviews.value)
    // reviews từ API có cấu trúc phức tạp hơn
    const apiReviews = Array.isArray(productReviews.value) 
        ? productReviews.value.map(r => ({
            ...r,
            // Đảm bảo rating là number (từ API có thể là string)
            rating: parseFloat(r.rating as any), 
        }))
        : []
    
    // Đảo ngược thứ tự để review mới nhất (local) nằm trên cùng.
    return [...localReviews.value, ...apiReviews].reverse()
})


const userRating = ref(0)
const userComment = ref('')

// WATCH: Khi productDetail có dữ liệu, gọi API lấy đánh giá
// Logic này hoạt động đúng: lấy product_id từ productDetail và gọi fetchProductReviews
watch(productDetail, (newVal) => {
    if (newVal?.product_id) {
        // GỌI API ĐÁNH GIÁ BẰNG PRODUCT_ID LẤY TỪ DỮ LIỆU THẬT
        fetchProductReviews(newVal.product_id)
    }
}, { immediate: true })

onMounted(() => {
    // GỌI API LẤY CHI TIẾT SẢN PHẨM BẰNG SLUG THẬT
    fetchProductDetail(slug)
})


// HÀM GỬI REVIEW (Chức năng này vẫn là MOCK)
// Chức năng gửi đánh giá *thực tế* cần order_detail_id, không phải product_id.
// Chức năng ở đây chỉ là MOCK cho hiển thị tức thì trên trang chi tiết sản phẩm.
const submitReview = () => {
  if (userRating.value === 0) return alert('Vui lòng chọn số sao!')
  if (!userComment.value) return alert('Vui lòng nhập bình luận!')

  // Giả lập gửi đánh giá thành công và thêm vào danh sách tạm thời (localReviews)
  const newReview = {
    // Chỉ thêm vào danh sách local vì không có order_detail_id để gửi lên API
    name: 'Người dùng mới', // Giả định tên
    date: new Date().toLocaleDateString('vi-VN'),
    rating: userRating.value,
    comment: userComment.value,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg', // Avatar mặc định
    // MOCK cho hiển thị
    order_detail: { order: { order_code: 'Đánh giá mới' } } 
  }
  
  localReviews.value.push(newReview)

  alert("Đánh giá của bạn sẽ được hiển thị ngay! \n(LƯU Ý: Đây chỉ là tính năng *hiển thị* tạm thời, đánh giá thật sự cần gửi qua trang 'Đơn hàng của tôi' với order_detail_id chính xác)")

  userRating.value = 0
  userComment.value = ''
}
</script>