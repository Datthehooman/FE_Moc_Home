<template>
  <div class="bg-[#FFFBF8] min-h-screen py-10 px-4 flex justify-center">
    <div class="max-w-[85%] w-full">
      <div class="flex flex-col md:flex-row gap-10 items-start">
        <!-- CỘT HÌNH ẢNH -->
        <ModulesProductProductImages />
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
              <span class="text-primary font-bold text-2xl ml-2"
                >480.000 đ</span
              >
              <span class="text-red-500 text-sm ml-2">Giảm 20%</span>
            </div>

            <p class="text-gray-600 mt-3 leading-relaxed text-[15px]">
              Ghế Denim đơn giản với thiết kế gọn gàng, chất liệu vải denim bền
              chắc, mang lại cảm giác thoải mái và phong cách trẻ trung cho
              không gian sống.
            </p>

            <hr class="my-5 border-gray-300" />

            <!-- SỐ LƯỢNG + MÀU -->
            <div class="flex items-center space-x-8 mb-6">
              <div>
                <label class="block text-sm mb-1 text-gray-700 text-[15px]"
                  >Số lượng</label
                >
                <div class="flex items-center space-x-3">
                  <button
                    @click="quantity > 1 && quantity--"
                    class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"
                  >
                    -
                  </button>
                  <span class="text-lg font-medium w-6 text-center">{{
                    quantity
                  }}</span>
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
                <label class="block text-sm mb-1 text-[15px] text-gray-700"
                  >Màu sắc</label
                >
                <div class="flex space-x-2">
                  <div
                    v-for="(color, i) in colors"
                    :key="i"
                    class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110"
                    :style="{ backgroundColor: color }"
                    @click="selectedColor = color"
                  >
                    <svg
                      v-if="selectedColor === color"
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute inset-0 w-4 h-4 m-auto text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
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
              <button
                class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
              >
                <span class="absolute inset-0 flex justify-center items-center">
                  <span
                    class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
                  ></span>
                </span>
                <span
                  class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300"
                  >Thêm giỏ hàng</span
                >
              </button>

              <button
                class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500"
              >
                <span class="absolute inset-0 flex justify-center items-center">
                  <span
                    class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
                  ></span>
                </span>
                <span
                  class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300"
                  >Mua ngay</span
                >
              </button>

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
            Đánh giá ({{ reviews.length.toString().padStart(2, "0") }})
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
          <div :key="tab" class="mt-6 text-gray-700 leading-relaxed">
            <!-- TAB MÔ TẢ -->
            <div v-if="tab === 'mota'">
              <p class="mb-5">
                Ghế Denim đơn giản mang phong cách tối giản nhưng vẫn hiện đại,
                dễ dàng hòa hợp với nhiều không gian nội thất khác nhau. Với
                chất liệu <b>denim cao cấp</b>, sản phẩm đảm bảo độ bền, thoáng
                khí và dễ dàng vệ sinh 🤡
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 class="font-bold text-lg mb-3 text-[#6E4E37]">
                    Đặc điểm nổi bật
                  </h3>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>
                      Phong cách Art Deco hiện đại, tối giản và sang trọng
                    </li>
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
                  <!-- Avatar -->
                  <img
                    :src="review.avatar"
                    class="w-16 h-16 rounded-full object-cover"
                  />

                  <!-- Nội dung -->
                  <div class="flex-1 relative">
                    <!-- SỐ SAO GÓC PHẢI TRÊN -->
                    <div class="absolute top-3 right-3 flex space-x-1">
                      <svg
                        v-for="n in 5"
                        :key="n"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="w-4 h-4 transition-all duration-200"
                        :class="
                          n <= review.rating
                            ? 'fill-yellow-400 stroke-yellow-500'
                            : 'fill-transparent stroke-yellow-400/80'
                        "
                        stroke-width="1.3"
                      >
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    </div>

                    <!-- Thông tin người dùng -->
                    <h3 class="font-semibold text-gray-800">
                      {{ review.name }}
                    </h3>
                    <p
                      class="text-sm text-gray-500 mt-1 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4 text-gray-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ review.date }}
                    </p>

                    <!-- Nội dung bình luận -->
                    <p class="mt-2 text-gray-700 text-[15px] leading-relaxed">
                      {{ review.comment }}
                    </p>

                    <!-- Nút trả lời -->
                    <button
                      class="text-[#6E4E37] mt-3 flex items-center gap-1 text-sm hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 10h11M3 6h11M3 14h7m8-2v8m0 0l3-3m-3 3l-3-3"
                        />
                      </svg>
                      Trả lời
                    </button>
                  </div>
                </div>
              </div>

              <!-- FORM REVIEW -->
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
                    :class="
                      n <= userRating
                        ? 'fill-yellow-400 stroke-y[#FBA707] scale-110'
                        : 'fill-transparent stroke-[#FBA707] hover:fill-yellow-100 hover:scale-110'
                    "
                    stroke-width="1.5"
                    @click="userRating = n"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </div>

                <!-- Ô BÌNH LUẬN -->
                <textarea
                  v-model="userComment"
                  class="w-full h-32 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#EDB173] focus:outline-none resize-none text-[15px]"
                  placeholder="Bình luận*"
                ></textarea>

                <!-- NÚT GỬI -->
                <!-- NÚT GỬI -->
                <button
                  @click="submitReview"
                  type="button"
                  class="relative overflow-hidden px-6 py-2.5 bg-[#edb173] text-black font-medium rounded-xl shadow-md flex justify-center items-center gap-2 group transition-all duration-300"
                >
                  <!-- Hiệu ứng lan sóng -->
                  <span
                    class="absolute inset-0 flex justify-center items-center"
                  >
                    <span
                      class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
                    ></span>
                  </span>

                  <!-- Nội dung nút -->
                  <span
                    class="relative z-10 flex items-center gap-2 text-[15px] group-hover:text-white"
                  >
                    <span>Đăng bình luận</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 10.5l18-7.5-7.5 18-2.25-6.75L3 10.5z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- SẢN PHẨM LIÊN QUAN -->
      <div class="max-w-[100%] mx-auto px-4 relative mt-10">
        <ModulesProductTitle title="Sản phẩm liên quan" />
        <!-- DANH SÁCH SẢN PHẨM -->
        <div class="relative" ref="containerRef">
          <!-- Nút trái -->
          <button
            @click="prevSlide"
            class="absolute left-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition shadow-lg"
          >
            ‹
          </button>

          <!-- KHUNG TRƯỢT -->
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-in-out gap-[20px]"
              :style="{
                transform: `translateX(-${relatedIndex * (itemWidth + gap)}px)`,
              }"
            >
              <ModulesProductCartProduct
                v-for="(product, i) in products"
                :key="i"
                :product="product"
                :itemWidth="itemWidth"
                @view="viewProduct"
              />
            </div>
          </div>

          <!-- Nút phải -->
          <button
            @click="nextSlide"
            class="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition"
          >
            ›
          </button>
        </div>
      </div>

      <!-- Overlay xem nhanh sản phẩm -->
      <ModulesProductQuickViewOverlay
        :show="showOverlay"
        :product="currentProduct"
        @close="showOverlay = false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
  const toast = useToast();

  // ================== SLIDER ẢNH CHÍNH ==================
  const images = [
    "https://live.themewild.com/fameo/assets/img/product/01.png",
    "https://live.themewild.com/fameo/assets/img/product/02.png",
    "https://live.themewild.com/fameo/assets/img/product/03.png",
    "https://live.themewild.com/fameo/assets/img/product/04.png",
  ];

  const currentIndex = ref(0);
  const nextIndex = ref<number | null>(null);
  const animating = ref(false);
  const direction = ref<"left" | "right">("left");
  const incomingAtCenter = ref(false);

  const startAnimation = (targetIndex: number) => {
    animating.value = true;
    nextIndex.value = targetIndex;
    incomingAtCenter.value = false;
    setTimeout(() => (incomingAtCenter.value = true), 20);
    setTimeout(() => {
      currentIndex.value = targetIndex;
      animating.value = false;
      nextIndex.value = null;
      incomingAtCenter.value = false;
    }, 520);
  };

  const goNext = () => {
    if (animating.value) return;
    direction.value = "left";
    startAnimation((currentIndex.value + 1) % images.length);
  };

  const goPrev = () => {
    if (animating.value) return;
    direction.value = "right";
    startAnimation((currentIndex.value - 1 + images.length) % images.length);
  };

  const changeImage = (i: number) => {
    if (animating.value || i === currentIndex.value) return;
    direction.value = i > currentIndex.value ? "left" : "right";
    startAnimation(i);
  };

  // ================== DỮ LIỆU REVIEW ==================
  const reviews = ref([
    {
      name: "Lê Phùng Tiến Quân",
      date: "20 tháng 8, 2025",
      rating: 3,
      comment:
        "Mình rất hài lòng với sản phẩm này. Thiết kế đơn giản nhưng tinh tế, chất liệu denim ngồi thoải mái và dễ vệ sinh.",
      avatar: "https://live.themewild.com/fameo/assets/img/blog/com-2.jpg",
    },
    {
      name: "Nguyễn Minh Thảo",
      date: "18 tháng 8, 2025",
      rating: 5,
      comment: "Ghế rất êm, màu sắc đẹp, giao đúng như mô tả.",
      avatar: "https://live.themewild.com/fameo/assets/img/blog/com-1.jpg",
    },
  ]);

  const userRating = ref(0);
  const userComment = ref("");

  const submitReview = () => {
    if (!userComment.value) {
      toast.add({
        title: "Vui lòng nhập bình luận!",
        color: "error",
      });
      return;
    }
    reviews.value.push({
      name: "Người dùng mới",
      date: new Date().toLocaleDateString("vi-VN"),
      rating: userRating.value,
      comment: userComment.value,
      avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    });
    userRating.value = 0;
    userComment.value = "";
  };

  // ================== SẢN PHẨM LIÊN QUAN ==================
  interface Product {
    name: string;
    image: string;
    oldPrice: string;
    price: string;
    badge?: string;
    star: number;
  }

  const products = ref<Product[]>([
    {
      name: "Ghế Denim đơn giản",
      image: "https://live.themewild.com/fameo/assets/img/product/01.png",
      oldPrice: "250.000 đ",
      price: "190.000 đ",
      badge: "Mới",
      star: 5,
    },
    {
      name: "Ghế gỗ cao cấp",
      image: "https://live.themewild.com/fameo/assets/img/product/02.png",
      oldPrice: "310.000 đ",
      price: "250.000 đ",
      badge: "Hot",
      star: 4,
    },
    {
      name: "Ghế sofa mini",
      image: "https://live.themewild.com/fameo/assets/img/product/03.png",
      oldPrice: "270.000 đ",
      price: "210.000 đ",
      badge: "Hot",
      star: 3,
    },
    {
      name: "Ghế đọc sách",
      image: "https://live.themewild.com/fameo/assets/img/product/04.png",
      oldPrice: "290.000 đ",
      price: "220.000 đ",
      badge: "Giảm 50%",
      star: 2,
    },
    {
      name: "Ghế thư giãn",
      image: "https://live.themewild.com/fameo/assets/img/product/05.png",
      oldPrice: "260.000 đ",
      price: "200.000 đ",
      badge: "Mới",
      star: 1,
    },
    {
      name: "Ghế phòng khách",
      image: "https://live.themewild.com/fameo/assets/img/product/06.png",
      oldPrice: "300.000 đ",
      price: "240.000 đ",
      badge: "Hot",
      star: 5,
    },
    {
      name: "Ghế bọc da sang trọng",
      image: "https://live.themewild.com/fameo/assets/img/product/07.png",
      oldPrice: "350.000 đ",
      price: "290.000 đ",
      badge: "Mới",
      star: 5,
    },
  ]);

  const relatedIndex = ref(0);
  const containerRef = ref<HTMLElement | null>(null);
  const itemWidth = ref(0);
  const visibleCount = ref(5);
  const gap = 20;

  // ✅ Hàm cập nhật chiều rộng item
  const updateItemWidth = () => {
    if (!containerRef.value) return;
    const containerWidth = containerRef.value.clientWidth;

    if (containerWidth < 640) visibleCount.value = 1;
    else if (containerWidth < 1024) visibleCount.value = 3;
    else visibleCount.value = 5;

    itemWidth.value =
      (containerWidth - (visibleCount.value - 1) * gap) / visibleCount.value;
  };

  // ✅ Chỉ gọi sau khi DOM render xong (không bị chồng item)
  onMounted(async () => {
    await nextTick();
    updateItemWidth();
    window.addEventListener("resize", updateItemWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateItemWidth);
  });

  // ✅ Chuyển slide
  const nextSlide = () => {
    relatedIndex.value = Math.min(
      relatedIndex.value + 1,
      Math.max(0, products.value.length - visibleCount.value)
    );
  };
  const prevSlide = () => {
    relatedIndex.value = Math.max(relatedIndex.value - 1, 0);
  };

  // ================== OVERLAY XEM NHANH ==================
  const showOverlay = ref(false);
  const currentProduct = ref<Product>({
    image: "",
    name: "",
    oldPrice: "",
    price: "",
    star: 0,
    badge: "",
  });

  const viewProduct = (product: Product) => {
    currentProduct.value = { ...product };
    showOverlay.value = true;
  };

  // ================== UI nhỏ (tab, quantity, colors) ==================
  const tab = ref<"mota" | "danhgia">("mota");
  const quantity = ref(1);
  const colors = ["#6E4E37", "#C68642", "#EAD2AC", "#A98467"];
  const selectedColor = ref(colors[0]);

  const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
  };
  const increaseQuantity = () => {
    quantity.value++;
  };
</script>
