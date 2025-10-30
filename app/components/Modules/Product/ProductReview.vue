<template>
    <div class="bg-[#FFFBF8] flex justify-center mb-10">
    <div class="max-w-[85%] w-full">


    <!-- TAB -->
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

    <!-- Hiệu ứng fade -->
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
        <!-- TAB MÔ TẢ -->
        <div v-if="tab === 'mota'">
          <p class="mb-5">
            Ghế Denim đơn giản mang phong cách tối giản nhưng vẫn hiện đại,
            dễ dàng hòa hợp với nhiều không gian nội thất khác nhau. Với chất
            liệu <b>denim cao cấp</b>, sản phẩm đảm bảo độ bền, thoáng khí và
            dễ dàng vệ sinh 🤡
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 class="font-bold text-lg mb-3 text-[#6E4E37]">
                Đặc điểm nổi bật
              </h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Phong cách Art Deco hiện đại, tối giản và sang trọng</li>
                <li>Chất liệu denim bền, thoáng khí và dễ làm sạch</li>
                <li>Tựa lưng êm ái giúp thoải mái khi sử dụng lâu</li>
                <li>Khung sắt sơn tĩnh điện chống gỉ sét</li>
                <li>Phù hợp với nhiều phong cách nội thất</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-3 text-[#6E4E37]">
                Thông số kỹ thuật
              </h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Kích thước: Rộng 1.2m x Cao 2.1m</li>
                <li>Chất liệu: Denim + Khung sắt</li>
                <li>Năm sản xuất: 2024</li>
                <li>Thương hiệu: Novak</li>
                <li>Xuất xứ: Việt Nam</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- TAB ĐÁNH GIÁ -->
        <div v-else>
          <!-- DANH SÁCH REVIEW -->
          <div class="space-y-6 mt-6">
            <div
              v-for="(review, i) in reviews"
              :key="i"
              class="relative flex flex-col md:flex-row gap-4 p-4 border border-black/25 rounded-xl bg-transparent backdrop-blur-sm"
            >
              <img :src="review.avatar" class="w-16 h-16 rounded-full object-cover" />
              <div class="flex-1 relative">
                <!-- SỐ SAO -->
                <div class="absolute top-3 right-3 flex space-x-1">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-4 h-4 transition-all duration-200"
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
                <h3 class="font-semibold text-gray-800">{{ review.name }}</h3>
                <p class="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  {{ review.date }}
                </p>
                <p class="mt-2 text-gray-700 text-[15px] leading-relaxed">
                  {{ review.comment }}
                </p>
              </div>
            </div>
          </div>

          <!-- FORM REVIEW -->
          <div class="mt-10 bg-[#FAF7F3] p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">
              Để lại bình luận & đánh giá của bạn
            </h3>
            <!-- CHỌN SAO -->
            <div class="flex items-center mb-3 space-x-1">
              <svg
                v-for="n in 5"
                :key="n"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out"
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

            <!-- NHẬP BÌNH LUẬN -->
            <textarea
              v-model="userComment"
              placeholder="Nhập bình luận..."
              class="w-full p-2 border rounded mb-3"
            />
            <button
              @click="submitReview"
              class="bg-[#6E4E37] text-white px-4 py-2 rounded hover:bg-[#5a3e2b]"
            >
              Gửi bình luận
            </button>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// TAB MÔ TẢ / ĐÁNH GIÁ
const tab = ref<'mota' | 'danhgia'>('mota')

// DỮ LIỆU REVIEW
const reviews = ref([
  {
    name: 'Lê Phùng Tiến Quân',
    date: '20 tháng 8, 2025',
    rating: 3,
    comment:
      'Mình rất hài lòng với sản phẩm này. Thiết kế đơn giản nhưng tinh tế, chất liệu denim ngồi thoải mái và dễ vệ sinh.',
    avatar: 'https://live.themewild.com/fameo/assets/img/blog/com-2.jpg',
  },
  {
    name: 'Nguyễn Minh Thảo',
    date: '18 tháng 8, 2025',
    rating: 5,
    comment: 'Ghế rất êm, màu sắc đẹp, giao đúng như mô tả.',
    avatar: 'https://live.themewild.com/fameo/assets/img/blog/com-1.jpg',
  },
])

const userRating = ref(0)
const userComment = ref('')

// HÀM GỬI REVIEW
const submitReview = () => {
  if (!userComment.value) return alert('Vui lòng nhập bình luận!')

  reviews.value.push({
    name: 'Người dùng mới',
    date: new Date().toLocaleDateString('vi-VN'),
    rating: userRating.value,
    comment: userComment.value,
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
  })

  userRating.value = 0
  userComment.value = ''
}
</script>
