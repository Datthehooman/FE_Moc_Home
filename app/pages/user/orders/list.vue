<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <ModulesUserAccountSidebar />

      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-5 shadow">

          <!-- HEADER + FILTER -->
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-2xl font-semibold text-[#6E4E37]">Đơn hàng của tôi</h2>

            <!-- FILTER DROPDOWN -->
            <div class="relative w-[220px]" ref="filterDropdownRef">
              <button
                @click="showFilter = !showFilter"
                type="button"
                class="h-[45px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-white cursor-pointer shadow-sm hover:shadow transition-all duration-200"
              >
                <span class="text-gray-700 text-sm">
                  {{ filterText }}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="showFilter ? 'rotate-180' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <!-- MENU -->
              <transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <div
                  v-if="showFilter"
                  class="absolute top-[48px] left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden z-50"
                >
                  <div
                    v-for="item in filterOptions"
                    :key="item.value"
                    @click="selectFilter(item)"
                    class="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER TABLE -->
          <div class="grid grid-cols-5 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>#Mã đơn</div>
            <div>Ngày mua</div>
            <div>Tổng</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

          <!-- LIST -->
          <div class="space-y-2">
            <div
              v-for="order in paginatedOrders"
              :key="order.order_id"
              class="h-[55px] grid grid-cols-5 items-center bg-[#F5F7FA] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="text-[#A77A5D] font-semibold cursor-pointer">
                {{ order.order_code }}
              </div>

              <div>{{ order.order_date }}</div>
              <div>{{ order.total_amount }} ₫</div>

              <!-- STATUS -->
              <div>
                <span :class="{
                  'text-yellow-600 bg-yellow-100 px-2 py-1 rounded': order.order_status === 'Chờ xác nhận',
                  'text-blue-600 bg-blue-100 px-2 py-1 rounded': order.order_status === 'Đã xác nhận',
                  'text-purple-600 bg-purple-100 px-2 py-1 rounded': order.order_status === 'Đang xử lý',
                  'text-green-600 bg-green-100 px-2 py-1 rounded': order.order_status === 'Hoàn tất',
                  'text-red-600 bg-red-100 px-2 py-1 rounded': order.order_status === 'Đã hủy',
                }">
                  {{ order.order_status }}
                </span>
              </div>

              <!-- ACTIONS -->
              <div class="flex items-center gap-2">

                <div
                  class="w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black"
                  title="Xem chi tiết đơn hàng"
                >
                  <NuxtLink
                    :to="`/user/orders/${order.order_id}`"
                    class="w-[34px] h-[34px] flex items-center justify-center rounded-[5px]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor"
                         class="w-5 h-5 text-gray-500 hover:text-white transition">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 8.354 7.36 5.25 12 
                            5.25c4.638 0 8.574 3.103 9.963 6.433.07.162.07.353 0 .515C20.574 
                            15.646 16.637 18.75 12 18.75c-4.64 0-8.577-3.103-9.964-6.428z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </NuxtLink>
                </div>

                <!-- REVIEW BUTTON -->
                <NuxtLink
                  v-if="order.order_status === 'Hoàn tất'"
                  :to="`/user/orders/${order.order_id}`"
                  :class="{
                    'w-[34px] h-[34px] flex items-center justify-center rounded-[5px] cursor-pointer transition': true,
                    'bg-green-500 border border-green-600 hover:bg-green-600': !order.is_fully_reviewed,
                    'bg-gray-300 border border-gray-400 cursor-default': order.is_fully_reviewed
                  }"
                  :title="order.is_fully_reviewed ? 'Đơn hàng đã được đánh giá' : 'Đánh giá sản phẩm ngay'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-5 h-5 text-white">
                    <path v-if="!order.is_fully_reviewed"
                          stroke-linecap="round" stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.102 5.618.498a.562.562 0 0 1 .31 1.018l-4.238 3.626 1.258 5.669a.562.562 0 0 1-.86.671l-4.814-2.885-4.814 2.885a.562.562 0 0 1-.86-.671l1.257-5.67-4.238-3.625a.562.562 0 0 1 .31-1.018l5.618-.498L11.48 3.5z" />
                    <path v-else
                          stroke-linecap="round" stroke-linejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </NuxtLink>

              </div>
            </div>
          </div>

          <!-- PAGINATION -->
          <ModulesUserPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => currentPage = p"
          />
        </section>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useOrder } from '~/composables/useOrder'

const { orders, fetchOrders } = useOrder()

const searchQuery = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const perPage = 7

// FILTER DROPDOWN
const showFilter = ref(false)
const filterText = ref("Tất cả trạng thái")

const filterOptions = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Chờ xác nhận", value: "Chờ xác nhận" },
  { label: "Đã xác nhận", value: "Đã xác nhận" },
  { label: "Đang xử lý / Chuẩn bị hàng", value: "Đang xử lý" },
  { label: "Đã hoàn thành", value: "Hoàn tất" },
  { label: "Đã hủy", value: "Đã hủy" },
]


const filterDropdownRef = ref(null)
onClickOutside(filterDropdownRef, () => (showFilter.value = false))

const selectFilter = (item: any) => {
  filterText.value = item.label
  filterStatus.value = item.value
  showFilter.value = false
}

// FETCH ORDERS
onMounted(() => fetchOrders())

// FILTER LIST
const filteredOrders = computed(() =>
  orders.value
    .filter(o =>
      o.order_code.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(o =>
      filterStatus.value === '' || o.order_status === filterStatus.value
    )
)

const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / perPage)
)

const paginatedOrders = computed(() =>
  filteredOrders.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
)

// PAGINATION
const pagesAround = computed(() => {
  let pages: number[] = []
  let p = currentPage.value
  let t = totalPages.value

  for (let i = p - 1; i <= p + 1; i++) {
    if (i > 1 && i < t) pages.push(i)
  }
  return pages
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>
