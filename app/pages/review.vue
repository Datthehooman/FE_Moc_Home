<template>
    <div class="bg-gray-50 p-6 sm:p-8 min-h-screen flex justify-center items-start">
        <div div class="review-container w-full max-w-[80%] bg-white shadow-2xl rounded-xl overflow-hidden">
        
            <div class="bg-[#AC8972] text-white p-5 sm:p-6 flex justify-between items-start">
                <div>
                    <h1 class="text-4xl font-extrabold mb-1">Đánh Giá Sản Phẩm Nội Thất</h1>
                    <p class="opacity-90 text-lg">Chia sẻ trải nghiệm của bạn để giúp chúng tôi tốt hơn!</p>
                </div>
                
                <NuxtLink
                    to="/user/orders/list"
                    class="ml-4 px-4 py-2 bg-[#FEE1C7] rounded-lg text-black font-medium shadow hover:bg-[#FCD8B9] transition text-sm flex-shrink-0"
                >
                    &larr; Quay lại đơn hàng
                </NuxtLink>
            </div>

            <div v-if="loading" class="p-10 text-center text-xl text-gray-500">
                <p>Đang tải thông tin sản phẩm...</p>
            </div>

            <div v-else-if="error" class="p-10 text-center text-xl text-red-600">
                
                <p class="text-base text-gray-600">Bạn đã đánh giá sản phẩm này rồi!</p>
            </div>

            <div v-else-if="detailToReview" class="p-6 sm:p-8">
                
                <div class="p-6 border-b border-gray-200 flex items-center space-x-6 bg-gray-50 rounded-lg mb-8">
                    <div class="w-32 h-32 flex-shrink-0 bg-white flex items-center justify-center rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <img v-if="detailToReview.image" :src="detailToReview.image" :alt="detailToReview.name" class="object-cover w-full h-full"/>
                        <span v-else class="text-sm text-gray-400 p-2 text-center">Không ảnh sản phẩm</span>
                    </div>
                    <div>
                        <h3 class="font-extrabold text-2xl text-gray-800 mb-1">{{ detailToReview.name }}</h3>
                        <p class="text-md text-gray-600">Màu sắc: <span class="font-medium">{{ detailToReview.color ?? 'N/A' }}</span></p>
                        <p class="text-md text-gray-600">Số lượng: <span class="font-medium">{{ detailToReview.quantity }}</span></p>
                        <p class="font-bold text-red-600 text-xl mt-2">Giá: {{ detailToReview.price }} ₫</p>
                        <p class="text-sm text-gray-400 mt-2">Mã đơn hàng: <span class="font-semibold text-gray-500">#{{ detailToReview.order_code }}</span></p>
                    </div>
                </div>

                <form @submit.prevent="submitReview" class="space-y-8">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div>
                            <label class="block text-gray-700 text-lg font-bold mb-3">Chất lượng sản phẩm <span class="text-red-500">*</span></label>
                            <div class="flex items-center space-x-1">
                                <span 
                                    v-for="star in 5" 
                                    :key="star" 
                                    @click="reviewForm.rating = star"
                                    :class="[
                                        'cursor-pointer transition-colors',
                                        reviewForm.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                                    ]"
                                >
                                    <svg class="w-10 h-10 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div v-if="reviewForm.rating > 0" class="p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg transition-opacity duration-300">
                            <label class="block text-gray-700 text-lg font-bold mb-2">Đánh giá chung:</label>
                            <p class="text-xl font-semibold text-gray-800">{{ ratingComment }}</p>
                        </div>
                    </div>

                    <div>
                        <label for="comment" class="block text-gray-700 text-lg font-bold mb-3">Ý kiến chi tiết của bạn <span class="text-red-500">*</span></label>
                        <textarea 
                            id="comment" 
                            v-model="reviewForm.comment" 
                            rows="5" 
                            class="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#AC8972] focus:border-[#AC8972] transition duration-200 text-base"
                            placeholder="Hãy chia sẻ cảm nhận chi tiết của bạn về chất lượng sản phẩm, dịch vụ giao hàng và đóng gói..."
                            maxlength="500"
                        ></textarea>
                        <p class="text-sm text-gray-500 mt-2 text-right">Giới hạn 500 ký tự (Đã nhập: {{ reviewForm.comment.trim().length }})</p>
                    </div>

                    <button 
                        type="submit" 
                        :disabled="!isFormValid || creatingReview" 
                        :class="[
                            'w-full py-4 rounded-xl text-white font-extrabold text-xl transition duration-300 transform hover:scale-[1.005] focus:outline-none focus:ring-4 focus:ring-[#AC8972]/50',
                            isFormValid && !creatingReview ? 'bg-[#AC8972] hover:bg-[#8e7362] shadow-lg' : 'bg-gray-400 cursor-not-allowed'
                        ]"
                    >
                        <span v-if="creatingReview">Đang gửi đánh giá...</span>
                        <span v-else>HOÀN TẤT VÀ GỬI ĐÁNH GIÁ</span>
                    </button>
                </form>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useReview } from '~/composables/useReview' 
// Giả định có composable/plugin toast, ở đây dùng alert() để mô phỏng.

const route = useRoute()
const router = useRouter()

// --- State ---
const orderDetailId = ref<number | null>(null)
const reviewForm = ref({
    rating: 0, // 1 đến 5
    comment: '',
    order_detail_id: 0, 
})

const { loading, error, detailToReview, createReview, creatingReview, fetchDetailToReview } = useReview() 

// --- Data for Rating Comments (Nhận xét mặc định) ---
const RATING_COMMENTS: Record<number, string> = {
    1: 'Thất vọng! Sản phẩm/dịch vụ cần cải thiện rất nhiều.',
    2: 'Không hài lòng. Vẫn còn nhiều thiếu sót cần khắc phục.',
    3: 'Bình thường. Chất lượng ở mức chấp nhận được.',
    4: 'Hài lòng. Sản phẩm tốt, gần như hoàn hảo.',
    5: 'Tuyệt vời! Sản phẩm vượt qué đẹp. Rất đáng tiền!'
}

// --- Computed ---
const isFormValid = computed(() => {
    // Form hợp lệ khi rating > 0 và comment phải có ít nhất 5 ký tự
    return reviewForm.value.rating > 0 && reviewForm.value.comment.trim().length >= 5
})

const ratingComment = computed(() => {
    return RATING_COMMENTS[reviewForm.value.rating] || 'Hãy chọn số sao để chúng tôi hiểu mức độ hài lòng của bạn.'
})

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
        alert("Đánh giá đã được gửi thành công! 🎉 Cảm ơn bạn!"); // Toast mô phỏng
        
        // Chuyển hướng về list đơn hàng và thêm flag 'refresh'
        router.push({ 
            path: '/user/orders/list', 
            query: { refresh: 'true' } 
        }); 
        
    } catch (e: any) {
        console.error("Lỗi khi gửi đánh giá:", e); //
        alert(`Lỗi: ${e.message}`); // Toast báo lỗi
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
        error.value = "Thiếu ID chi tiết đơn hàng để đánh giá. Vui lòng quay lại trang chi tiết đơn hàng.";
        loading.value = false;
    }
});
</script>

<style scoped>
/* Không cần phần <style> tùy chỉnh vì đã dùng Tailwind CSS class chi tiết hơn */
.review-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>