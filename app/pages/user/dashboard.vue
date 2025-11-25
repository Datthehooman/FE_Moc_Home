<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">

        <!-- Thống kê -->
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Thống kê</h3>
          </div>
          <hr class="border-t border-gray-200 mb-4">

          <div class="grid grid-cols-3 gap-4">
            <div class="bg-yellow-50 rounded-xl p-4 h-[130px] flex items-center justify-between">
              <div>
                <p class="text-[30px] font-bold text-[#F7D155] leading-none">{{ pendingOrders }}</p>
                <p class="text-[15px] text-[#F7D155] mt-1">Đơn hàng đang chờ xử lý</p>
              </div>
              <div class="w-14 h-14 rounded-full bg-[#F7D155] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>

            <div class="bg-green-50 rounded-xl p-4 h-[130px] flex items-center justify-between">
              <div>
                <p class="text-[30px] font-bold text-[#11B76B] leading-none">{{ completedOrders }}</p>
                <p class="text-[15px] text-[#11B76B] mt-1">Đơn hàng đã hoàn thành</p>
              </div>
              <div class="w-14 h-14 rounded-full bg-[#11B76B] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div class="bg-red-50 rounded-xl p-4 h-[130px] flex items-center justify-between">
              <div>
                <p class="text-[30px] font-bold text-[#F05454] leading-none">1.5 triệu</p>
                <p class="text-[15px] text-[#F05454] mt-1">Số dư của tôi</p>
              </div>
              <div class="w-14 h-14 rounded-full bg-[#F05454] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- ĐƠN HÀNG GẦN ĐÂY (NÂNG CẤP GIỐNG TRANG LIST) -->
        <section class="bg-white rounded-xl p-5 shadow">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Đơn hàng gần đây</h3>

            <!-- TÌM KIẾM + LỌC -->
            <div class="flex items-center gap-3">

              <!-- SEARCH -->
              <div class="h-[45px] px-4 flex items-center border border-gray-300 rounded-[10px] bg-transparent gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="w-5 h-5 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                </svg>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm đơn hàng..."
                  class="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>

              <!-- FILTER DROPDOWN -->
              <div class="relative">
                <button 
                  @click="showFilter = !showFilter"
                  class="h-[45px] px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-transparent cursor-pointer w-[180px]"
                >
                  <span class="text-gray-600 text-sm">
                    {{ filterStatus || 'Tất cả trạng thái' }}
                  </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div 
                  v-if="showFilter"
                  class="absolute top-[48px] left-0 w-full bg-white border border-gray-200 rounded-[10px] shadow-md overflow-hidden z-20"
                >
                  <div @click="applyFilter('')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Tất cả trạng thái</div>
                  <div @click="applyFilter('Đang chờ')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang chờ</div>
                  <div @click="applyFilter('Đang xử lý')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang xử lý</div>
                  <div @click="applyFilter('Hoàn thành')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Hoàn thành</div>
                  <div @click="applyFilter('Đã hủy')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đã hủy</div>
                </div>
              </div>

            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
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
              <div class="text-[#A77A5D] font-semibold cursor-pointer">{{ order.order_code }}</div>
              <div>{{ order.order_date }}</div>
              <div>{{ order.total_amount }} ₫</div>

              <div>
                <span :class="{
                  'text-yellow-500 bg-yellow-100 px-2 py-1 rounded': order.order_status === 'Đang chờ',
                  'text-blue-500 bg-blue-100 px-2 py-1 rounded': order.order_status === 'Đang xử lý',
                  'text-green-500 bg-green-100 px-2 py-1 rounded': order.order_status === 'Hoàn thành',
                  'text-red-500 bg-red-100 px-2 py-1 rounded': order.order_status === 'Đã hủy'
                }">{{ order.order_status }}</span>
              </div>

              <NuxtLink 
                :to="`/user/orders/${order.order_id}`"
                class="w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor"
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
import { useOrder } from '~/composables/useOrder'

/* --- FETCH ORDERS --- */
const { orders, fetchOrders } = useOrder()
onMounted(() => fetchOrders())

/* --- SEARCH & FILTER --- */
const searchQuery = ref('')
const showFilter = ref(false)
const filterStatus = ref('')

const applyFilter = (v: string) => {
  filterStatus.value = v
  showFilter.value = false
}

/* --- PAGINATION --- */
const currentPage = ref(1)
const perPage = 5 

const filteredOrders = computed(() =>
  orders.value
    .filter(o => o.order_code.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .filter(o => filterStatus.value === '' || o.order_status === filterStatus.value)
)

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))

const paginatedOrders = computed(() =>
  filteredOrders.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const pagesAround = computed(() => {
  let p = currentPage.value
  let t = totalPages.value
  let arr: number[] = []
  for (let i = p - 1; i <= p + 1; i++) if (i > 1 && i < t) arr.push(i)
  return arr
})

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

/* --- THỐNG KÊ --- */
const pendingOrders = computed(() =>
orders.value.filter(o => o.order_status === 'Đang chờ').length
)

const completedOrders = computed(() =>
orders.value.filter(o => o.order_status === 'Hoàn thành').length
)

const totalBalance = computed(() =>
orders.value.reduce((sum, o) => sum + o.total_amount, 0)
)

</script>
