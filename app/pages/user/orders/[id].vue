<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar class="flex-shrink-0 sticky top-6 self-start"/>

      <!-- Main -->
      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-6 shadow">

          <!-- Loading -->
          <div v-if="loading" class="text-center py-10 text-gray-500">Đang tải...</div>

          <template v-else-if="order">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-[20px] font-semibold text-gray-700">
                  Đơn hàng (#{{ order.code }})
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  Trạng thái: 
                  <span 
                    :class="{
                      'text-green-600': order.status === 'completed',
                      'text-yellow-500': order.status === 'pending',
                      'text-red-500': order.status === 'cancelled'
                    }"
                  >
                    {{ order.statusText }}
                  </span>
                </p>
              </div>

              <div class="flex gap-2">
                <NuxtLink
                  to="/user/orders/list"
                  class="px-4 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow hover:bg-[#FECB96] transition"
                >
                  &larr; Danh sách đơn hàng
                </NuxtLink>

                <!-- Hủy đơn -->
                <div v-if="order.status === 'pending'" class="flex items-center gap-2">

                  <!-- Dropdown chọn lý do hủy -->
                  <div class="relative">
                    <button
                      @click="showFilter = !showFilter"
                      class="h-[45px] px-4 flex items-center justify-between border border-gray-300 rounded-xl bg-white shadow-sm hover:shadow-md transition w-[240px]"
                    >
                      <span class="text-gray-600 text-sm">
                        {{ filterStatus || 'Chọn lý do hủy đơn' }}
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 transition-transform duration-200"
                        :class="{ 'rotate-180': showFilter }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <!-- Dropdown list -->
                    <transition name="fade-slide">
                      <div
                        v-if="showFilter"
                        class="absolute top-[50px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20"
                      >
                        <div
                          v-for="val in cancelReasonList"
                          :key="val"
                          @click="applyFilter(val)"
                          class="px-4 py-2 hover:bg-orange-100 cursor-pointer text-sm transition"
                        >
                          {{ val || 'Chọn lý do hủy đơn' }}
                        </div>
                      </div>
                    </transition>
                  </div>

                  <!-- Nút hủy đơn -->
                  <button
                    @click="handleCancel"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                    :disabled="canceling || !cancelReason"
                  >
                    {{ canceling ? 'Đang hủy...' : 'Hủy đơn hàng' }}
                  </button>

                </div>
              </div>
            </div>

            <hr class="border-t border-gray-200 mb-6" />

            <!-- Products -->
            <div class="space-y-3">
              <div
                v-for="(product, i) in order.products"
                :key="i"
                class="flex items-center justify-between bg-[#F5F7FA] rounded-xl p-4 hover:bg-[#ECEFF3] transition"
              >
                <div class="flex items-center gap-4">
                  <img :src="product.image" class="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p class="font-semibold text-gray-700">{{ product.name }}</p>
                    <p class="text-gray-500 text-sm">Mã số: {{ product.code }}</p>
                  </div>
                </div>

                <div class="text-gray-600">{{ product.brand }}</div>
                <div class="text-gray-600">{{ product.quantity }}</div>
                <div class="text-gray-600">{{ product.color }}</div>
                <div class="text-gray-700 font-semibold">{{ product.total }}</div>
              </div>
            </div>

            <!-- Address + Invoice -->
            <div class="flex flex-col md:flex-row gap-6 mt-6">

              <div class="flex-1 bg-[#F5F7FA] rounded-xl p-4">
                <h4 class="text-gray-700 font-semibold mb-2">Địa chỉ nhận hàng</h4>
                <p class="text-gray-500 text-sm">{{ order.address }}</p>
              </div>

              <div class="flex-1 bg-[#F5F7FA] rounded-xl p-4">
                <h4 class="text-gray-700 font-semibold mb-2">Hóa đơn</h4>

                <div class="text-gray-600 text-sm space-y-1">
                  <div class="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{{ order.subtotal }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Giảm giá:</span>
                    <span>{{ order.discount }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Vận chuyển:</span>
                    <span>{{ order.shipping }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Thuế:</span>
                    <span>{{ order.tax }}</span>
                  </div>

                  <div class="flex justify-between font-semibold mt-2 border-t border-gray-300 pt-2">
                    <span>Tổng tiền:</span>
                    <span>{{ order.total }}</span>
                  </div>

                  <p class="text-gray-500 text-sm mt-1">Thanh toán bằng thẻ tín dụng</p>
                </div>
              </div>
            </div>
          </template>

          <div v-else class="text-center py-10 text-red-500">Không có dữ liệu đơn hàng.</div>

        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useOrderDetail } from "@/composables/useOrderDetail";

const route = useRoute();
const id = Number(route.params.id);

const showFilter = ref(false)
const cancelReason = ref('')
const filterStatus = ref('')

// DANH SÁCH LÝ DO HỦY ĐƠN
const cancelReasonList = [
  '',
  'Tôi muốn thay đổi địa chỉ nhận hàng',
  'Tôi muốn thay đổi sản phẩm',
  'Đặt nhầm sản phẩm',
  'Thời gian giao hàng quá lâu',
  'Tìm thấy giá tốt hơn ở nơi khác',
  'Không còn nhu cầu nữa'
]

// Khi chọn lý do hủy
const applyFilter = (val: string) => {
  cancelReason.value = val
  filterStatus.value = val
  showFilter.value = false
}

const { order, loading, fetchOrderDetail, cancelOrder, canceling } = useOrderDetail();

const handleCancel = async () => {
  if (!cancelReason.value) return;
  await cancelOrder(id, cancelReason.value);
  cancelReason.value = "";
};

onMounted(() => fetchOrderDetail(id));
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
