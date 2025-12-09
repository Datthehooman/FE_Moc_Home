<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <ModulesUserAccountSidebar
        class="flex-shrink-0 sticky top-6 self-start"
      />

      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-6 shadow">
          <div v-if="loading" class="text-center py-10 text-gray-500">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A77A5D] mx-auto mb-3"
            ></div>
            Đang tải chi tiết đơn hàng...
          </div>

          <template v-else-if="order">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-[20px] font-semibold text-gray-700">
                  Đơn hàng (#{{ order.code }})
                </h3>
               <p class="text-sm text-gray-500 mt-1">
  Trạng thái:
  <span
    :class="{
      'text-yellow-500': order.status === 'pending',
      'text-blue-500': order.status === 'confirmed',
      'text-indigo-500': order.status === 'processing',
      'text-green-600': order.status === 'completed',
      'text-red-500': order.status === 'cancelled',
    }"
  >
    {{ statusText }}
  </span>
</p>

              </div>

              <div class="flex gap-3 items-center">
                <div v-if="order.status === 'pending'" class="relative">
                  <button
                    @click="showFilter = !showFilter"
                    class="flex items-center gap-2 h-10 px-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                    :disabled="canceling"
                  >
                    {{
                      canceling ? "Đang hủy..." : cancelReason || "Hủy đơn hàng"
                    }}
                    <svg
                      v-if="!canceling"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <transition name="fade-slide">
                    <div
                      v-if="showFilter"
                      class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    >
                      <div class="py-1">
                        <p class="text-xs text-gray-500 px-4 pt-2 pb-1">
                          Chọn lý do hủy:
                        </p>
                        <a
                          v-for="reason in cancelReasons"
                          :key="reason"
                          href="#"
                          @click.prevent="applyFilter(reason)"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {{ reason }}
                        </a>
                        <div v-if="cancelReason" class="border-t mt-1 pt-2">
                          <button
                            @click="handleCancel"
                            class="w-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 py-2 rounded-b-lg"
                          >
                            Xác nhận Hủy Đơn
                          </button>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <NuxtLink
                  to="/user/orders/list"
                  class="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <div class="mt-8 border border-gray-200 rounded-xl overflow-hidden">
              <div class="bg-gray-50 p-4 border-b border-gray-200">
                <h4 class="text-lg font-semibold text-gray-700">
                  Sản phẩm đã mua
                </h4>
              </div>

              <div
                class="flex items-center font-semibold text-gray-700 p-4 border-b border-gray-200 text-sm"
              >
                <div class="flex-1">Sản phẩm</div>
                <div class="w-20 text-center hidden sm:block">Thương hiệu</div>
                <div class="w-20 text-center">SL</div>
                <div class="w-20 text-center hidden sm:block">Màu sắc</div>
                <div class="w-28 text-right">Tổng tiền</div>
                <div class="w-28 text-center">Đánh giá</div>
              </div>
            </div>

            <div class="divide-y divide-gray-200">
              <div
                v-for="(product, i) in order.products"
                :key="i"
                class="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition text-sm"
              >
                <div class="flex items-center gap-4 flex-1">
                  <img
                    :src="product.image"
                    class="w-16 h-16 rounded-lg object-cover border border-gray-100"
                    alt="product image"
                  />
                  <div>
                    <p class="font-semibold text-gray-700">
                      {{ product.name }}
                    </p>
                    <p class="text-gray-500 text-xs">
                      Mã số: {{ product.code }}
                    </p>
                  </div>
                </div>

                <div class="w-20 text-center text-gray-600 hidden sm:block">
                  {{ product.brand }}
                </div>
                <div class="w-20 text-center text-gray-600">
                  {{ product.quantity }}
                </div>
                <div class="w-20 text-center text-gray-600 hidden sm:block">
                  {{ product.color }}
                </div>
                <div class="w-28 text-right text-gray-700 font-semibold">
                  {{ product.total }}
                </div>

                <div class="w-28 text-center">
                  <template
                    v-if="
                      order.status === 'paid' || order.status === 'completed'
                    "
                  >
                    <button
                      v-if="!product.isReviewed"
                      @click="goToReview(product.orderDetailId)"
                      class="px-3 py-1 bg-[#A77A5D] text-white rounded-md text-xs font-medium hover:bg-[#6E4E37] transition shadow-md"
                    >
                      Đánh giá ngay
                    </button>
                    <span v-else class="text-green-600 text-xs font-medium"
                      >Đã đánh giá</span
                    >
                  </template>
                  <span v-else class="text-gray-400 text-xs"
                    >Chưa hoàn tất</span
                  >
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mt-8">
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 class="font-semibold text-gray-700 mb-3">
                  Địa chỉ giao hàng
                </h4>
                <p class="text-gray-600 text-sm whitespace-pre-wrap">
                  {{ order.address }}
                </p>
              </div>

              <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 class="font-semibold text-gray-700 mb-3">
                  Tóm tắt đơn hàng
                </h4>
                <dl class="text-sm space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Tổng phụ (Subtotal):</dt>
                    <dd class="font-medium text-gray-700">
                      {{ order.subtotal }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <span>Giảm giá:</span>
                    <span>- {{ order.discount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Phí vận chuyển (Shipping):</dt>
                    <dd class="font-medium text-gray-700">
                      {{ order.shipping }}
                    </dd>
                  </div>
                  <div
                    class="flex justify-between border-t border-gray-300 pt-3 mt-3 text-lg font-bold"
                  >
                    <dt class="text-gray-700">Tổng cộng:</dt>
                    <dd class="text-[#A77A5D]">{{ order.total }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </template>

          <div v-else class="text-center py-10 text-gray-500">
            Không tìm thấy đơn hàng.
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Đảm bảo Nuxt 3 route middleware hoạt động
  definePageMeta({
    middleware: "auth",
  });


  const route = useRoute();
  const router = useRouter(); // Khởi tạo router
  const id = Number(route.params.id);
  const toast = useToast();

  const showFilter = ref(false); // trạng thái mở/đóng dropdown
  const cancelReason = ref(""); // lý do hủy đơn
  const filterStatus = ref(""); // dùng làm label hiển thị trong dropdown

  const cancelReasons = [
    "Đã tìm được sản phẩm khác tốt hơn",
    "Thay đổi ý định mua hàng",
    "Giá quá cao so với dự kiến",
    "Lý do khác",
  ];
const statusTextMap: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  processing: "Đang xử lý / Chuẩn bị hàng",
  completed: "Đã hoàn thành",
  cancelled: "Đã hủy",
};

const statusText = computed(() => {
  return statusTextMap[order.value?.status] || "Không xác định";
});

  // Khi click chọn 1 lý do hủy
  const applyFilter = (val: string) => {
    cancelReason.value = val;
    filterStatus.value = val;
    showFilter.value = false;
  };

  const { order, loading, fetchOrderDetail, cancelOrder, canceling } =
    useOrderDetail();

  // Gọi hàm hủy đơn hàng với lý do đã chọn
  const handleCancel = async () => {
    // Thay thế alert/confirm bằng logic modal UI
    if (!cancelReason.value) return;
    await cancelOrder(cancelReason.value); // Chỉ truyền lý do hủy
    // Tự động tải lại chi tiết đơn hàng sau khi hủy (nếu cần cập nhật UI nhanh)
    await fetchOrderDetail(id);
    // Reset trạng thái sau khi hủy thành công
    if (order.value?.status === "cancelled") {
      cancelReason.value = "";
      filterStatus.value = "";
    }
  };

  // Hàm điều hướng đến trang tạo đánh giá
  const goToReview = (orderDetailId: number) => {
    // ✅ SỬA LỖI: Dùng đường dẫn tĩnh /review và truyền ID qua query parameter
    router.push({
      path: "/review",
      query: {
        orderDetailId: orderDetailId,
      },
    });
  };

  onMounted(() => fetchOrderDetail(id));
</script>

<style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.2s ease;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
