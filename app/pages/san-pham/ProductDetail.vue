<template>
  <div class="bg-[#FFFBF8] min-h-screen py-10 px-4 flex justify-center">
    <div class="max-w-[85%] w-full">
      <div class="flex flex-col md:flex-row gap-10 items-start">
        <!-- CỘT HÌNH ẢNH -->
        <div class="flex flex-col items-center">
      <!-- TEMPLATE: ảnh chính -->
    <div class="relative w-[520px] h-[473px] border border-black/50 rounded-xl flex justify-center items-center overflow-hidden group">
      <!-- LEAVING IMAGE -->
      <img
        v-if="animating"
        :src="images[currentIndex]"
        alt="leaving"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.55,0.08,0.68,0.53)]"
        :class="{
          'translate-x-0': !incomingAtCenter,
          // khi ảnh mới vào từ phải -> ảnh cũ đi sang trái
          '-translate-x-full opacity-0': direction === 'left' && incomingAtCenter,
          // khi ảnh mới vào từ trái -> ảnh cũ đi sang phải
          'translate-x-full opacity-0': direction === 'right' && incomingAtCenter
        }"
      />

      <!-- INCOMING IMAGE -->
      <img
        v-if="nextIndex !== null"
        :src="images[nextIndex]"
        alt="incoming"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.55,1)]"
        :class="{
          // nếu đi sang trái: ảnh mới bắt đầu bên phải -> vào giữa
          'translate-x-full opacity-0': direction === 'left' && !incomingAtCenter,
          // nếu đi sang phải: ảnh mới bắt đầu bên trái -> vào giữa
          '-translate-x-full opacity-0': direction === 'right' && !incomingAtCenter,
          'translate-x-0 opacity-100': incomingAtCenter
        }"
      />

      <!-- STATIC (hiển thị khi không animating) -->
      <img
        v-if="!animating && nextIndex === null"
        :src="images[currentIndex]"
        alt="current"
        class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 translate-x-0 opacity-100"
      />

      <!-- Nút trái -->
      <button
        @click="goPrev"
        class="absolute left-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Nút phải -->
      <button
        @click="goNext"
        class="absolute right-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

          <!-- ẢNH PHỤ -->
         <div class="flex justify-start mt-4 space-x-3 w-[520px]">
  <div
    v-for="(img, i) in images"
    :key="i"
    @click="() => changeImage(i)"
    :class="[
      'w-[118px] h-[118px] border rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200',
      currentIndex === i
        ? 'border-[#6E4E37]'
        : 'border-black/50 hover:border-[#edb173]'
    ]"
  >
    <img :src="img" class="w-[90px] h-[90px] object-contain" />
  </div>
</div>

        </div>

        <!-- CỘT THÔNG TIN -->
        <div class="flex-1 flex flex-col h-[591px]">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Ghế Denim đơn giản</h1>
            <div class="flex items-center space-x-2 mt-2">
              <p class="text-yellow-500 text-lg">★★★★★</p>
              <span class="text-sm text-gray-500">(4 người đánh giá)</span>
            </div>

            <!-- GIÁ -->
            <div class="mt-3">
              <span class="text-gray-400 line-through text-lg">600.000 đ</span>
              <span class="text-primary font-bold text-2xl ml-2">480.000 đ</span>
              <span class="text-red-500 text-sm ml-2">Giảm 20%</span>
            </div>

            <p class="text-gray-600 mt-3 leading-relaxed text-[15px]">
              Ghế Denim đơn giản với thiết kế gọn gàng, chất liệu vải denim bền chắc, mang lại cảm giác thoải mái và phong cách trẻ trung cho không gian sống.
            </p>

            <hr class="my-5 border-gray-300" />

            <!-- SỐ LƯỢNG + MÀU -->
            <div class="flex items-center space-x-8 mb-6">
              <div>
                <label class="block text-sm mb-1 text-gray-700 text-[15px]">Số lượng</label>
                <div class="flex items-center space-x-3">
                  <button
                    @click="quantity > 1 && quantity--"
                    class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"
                  >
                    -
                  </button>
                  <span class="text-lg font-medium w-6 text-center">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- MÀU -->
              <div>
                <label class="block text-sm mb-1 text-[15px] text-gray-700 text-[15px]">Màu sắc</label>
              <div class="flex space-x-2">
                <div
                  v-for="(color, i) in colors"
                  :key="i"
                  class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
                  :style="{ backgroundColor: color }"
                  @click="selectedColor = color"
                >
                  <!-- Dấu tick trắng -->
                  <svg
                    v-if="selectedColor === color"
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute inset-0 w-4 h-4 m-auto text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              </div>
            </div>

            <!-- THÔNG TIN NHỎ -->
            <ul class="text-sm text-gray-600 space-y-3 text-[15px]">
              <li><b>Tình trạng hàng:</b> Sẵn sàng giao</li>
              <li><b>Mã sản phẩm:</b> 656TYTR</li>
              <li><b>Danh mục:</b> Phòng khách</li>
              <li><b>Thương hiệu:</b> Novak</li>
              <li><b>Thẻ:</b> Ghế</li>
            </ul>
            <hr class="my-5 border-gray-300" />


            <!-- NÚT -->
          <div class="flex space-x-3 mt-6">
  <!-- Nút Thêm giỏ hàng -->
  <button
    class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
  >
    <span class="absolute inset-0 flex justify-center items-center">
      <span
        class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
      ></span>
    </span>
    <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">
      Thêm giỏ hàng
    </span>
  </button>

  <!-- Nút Mua ngay -->
  <button
    class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500"
  >
    <span class="absolute inset-0 flex justify-center items-center">
      <span
        class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
      ></span>
    </span>
    <span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">
      Mua ngay
    </span>
  </button>

  <!-- Nút Wishlist -->
  <button
    class="relative overflow-hidden w-[50px] h-[50px] bg-primary rounded-lg text-white shadow flex justify-center items-center group transition-colors duration-500"
  >
    <span class="absolute inset-0 flex justify-center items-center">
      <span
        class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
      ></span>
    </span>
    <svg
      class="relative z-10 w-5 h-4 group-hover:text-white transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"
      ></path>
    </svg>
  </button>
</div>
          </div>
        </div>
      </div>
      <!-- TAB MÔ TẢ / ĐÁNH GIÁ -->
    <div class="mt-10">
      <!-- Thanh nút chuyển -->
      <div class="flex border-b border-gray-300 space-x-8">
        <button
          @click="tab = 'mota'"
          :class="[
            'pb-3 text-lg font-semibold transition-all duration-300',
            tab === 'mota'
              ? 'text-[#6E4E37] border-b-2 border-[#6E4E37]'
              : 'text-gray-500 hover:text-[#6E4E37]'
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
              : 'text-gray-500 hover:text-[#6E4E37]'
          ]"
        >
          Đánh giá (05)
        </button>
      </div>

      <!-- Hiệu ứng fade mượt -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-500 ease-in-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
        mode="out-in"
      >
        <!-- NỘI DUNG TAB -->
        <div :key="tab" class="mt-6 text-gray-700 leading-relaxed">
          <!-- TAB MÔ TẢ -->
          <div v-if="tab === 'mota'">
            <p class="mb-5">
              Ghế Denim đơn giản mang phong cách tối giản nhưng vẫn hiện đại, dễ dàng hòa hợp với nhiều không gian nội thất khác nhau.  
              Với chất liệu <b>denim cao cấp</b>, sản phẩm đảm bảo độ bền, thoáng khí và dễ dàng vệ sinh 🤡
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <!-- Đặc điểm -->
              <div>
                <h3 class="font-bold text-lg mb-3 text-[#6E4E37]">Đặc điểm nổi bật</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li>Phong cách Art Deco hiện đại, tối giản và sang trọng</li>
                  <li>Chất liệu denim bền, thoáng khí và dễ làm sạch</li>
                  <li>Tựa lưng êm ái giúp thoải mái khi sử dụng lâu</li>
                  <li>Khung sắt sơn tĩnh điện chống gỉ sét</li>
                  <li>Phù hợp với nhiều phong cách nội thất</li>
                </ul>
              </div>

              <!-- Thông số kỹ thuật -->
              <div>
                <h3 class="font-bold text-lg mb-3 text-[#6E4E37]">Thông số kỹ thuật</h3>
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
            <p class="mb-4">Hiện chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này! 🤡</p>
            <button
              class="px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium hover:bg-[#6E4E37] hover:text-white transition-all duration-300"
            >
              Viết đánh giá
            </button>
          </div>
        </div>
      </transition>
    </div>


    </div>
  </div>
</template>
<!-- SCRIPT SETUP -->
<script setup lang="ts">
import { ref } from 'vue'

const images = [
  'https://live.themewild.com/fameo/assets/img/product/01.png',
  'https://live.themewild.com/fameo/assets/img/product/02.png',
  'https://live.themewild.com/fameo/assets/img/product/03.png',
  'https://live.themewild.com/fameo/assets/img/product/04.png',
]

const currentIndex = ref(0)
const nextIndex = ref(null)
const animating = ref(false)
const direction = ref('left') // 'left' = current đi trái, incoming từ phải; 'right' = ngược lại
// helper to make incoming image start off-screen then move to center
const incomingAtCenter = ref(false)

const goNext = () => {
  if (animating.value) return
  direction.value = 'left'      // current -> -translate-x-full, incoming from +translate-x-full -> 0
  startAnimation((currentIndex.value + 1) % images.length)
}

const goPrev = () => {
  if (animating.value) return
  direction.value = 'right'     // current -> +translate-x-full, incoming from -translate-x-full -> 0
  startAnimation((currentIndex.value - 1 + images.length) % images.length)
}

const changeImage = (i) => {
  if (animating.value || i === currentIndex.value) return
  direction.value = i > currentIndex.value ? 'left' : 'right'
  startAnimation(i)
}

function startAnimation(targetIndex) {
  animating.value = true
  nextIndex.value = targetIndex
  incomingAtCenter.value = false

  // wait one tick so the incoming image renders off-screen (Tailwind class picks correct start pos)
  // then set incomingAtCenter=true to animate it into place
  // transition duration = 500ms; we finalize after that
  setTimeout(() => {
    incomingAtCenter.value = true
  }, 20)

  // finish animation after duration
  setTimeout(() => {
    currentIndex.value = targetIndex
    animating.value = false
    nextIndex.value = null
    incomingAtCenter.value = false
  }, 520) // a bit > 500ms để chắc chắn
}
const colors = ['#6E4E37', '#C68642', '#EAD2AC', '#A98467']
const selectedColor = ref(colors[0])
const quantity = ref(1)
const tab = ref('mota')
</script>
