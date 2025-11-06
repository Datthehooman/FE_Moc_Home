<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX ĐƠN HÀNG -->
        <section class="bg-white rounded-xl p-5 shadow">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Danh sách đơn hàng</h3>

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
              v-for="(order, i) in paginatedOrders"
              :key="i"
              class=" h-[55px] grid grid-cols-5 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="text-[#A77A5D] font-semibold cursor-pointer">{{ order.code }}</div>
              <div>{{ order.date }}</div>
              <div>{{ order.total }}</div>
              <div>
                <span
                  :class="{
                    'text-yellow-500 bg-yellow-100 px-2 py-1 rounded': order.status === 'Đang chờ',
                    'text-blue-500 bg-blue-100 px-2 py-1 rounded': order.status === 'Đang xử lý',
                    'text-green-500 bg-green-100 px-2 py-1 rounded': order.status === 'Hoàn thành',
                    'text-red-500 bg-red-100 px-2 py-1 rounded': order.status === 'Đã hủy'
                  }"
                >
                  {{ order.status }}
                </span>
              </div>

              <div
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
              </div>
            </div>
          </div>

          <!-- PAGINATION (ĐÃ RÚT GỌN ĐẸP CHUẨN) -->
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

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref("")
const filterStatus = ref("")
const currentPage = ref(1)
const perPage = 7
const showFilter = ref(false)

const orders = ref([
  { code: '#28VR5K01', date: '20/08/2025', total: '450.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K02', date: '21/08/2025', total: '1.200.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K03', date: '22/08/2025', total: '850.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K04', date: '23/08/2025', total: '2.000.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K05', date: '24/08/2025', total: '350.000 ₫', status: 'Đã hủy' },
  { code: '#28VR5K06', date: '25/08/2025', total: '930.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K07', date: '26/08/2025', total: '1.300.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K08', date: '27/08/2025', total: '530.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K09', date: '28/08/2025', total: '630.000 ₫', status: 'Đã hủy' },
    { code: '#28VR5K01', date: '20/08/2025', total: '450.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K02', date: '21/08/2025', total: '1.200.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K03', date: '22/08/2025', total: '850.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K04', date: '23/08/2025', total: '2.000.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K05', date: '24/08/2025', total: '350.000 ₫', status: 'Đã hủy' },
  { code: '#28VR5K06', date: '25/08/2025', total: '930.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K07', date: '26/08/2025', total: '1.300.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K08', date: '27/08/2025', total: '530.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K09', date: '28/08/2025', total: '630.000 ₫', status: 'Đã hủy' },
    { code: '#28VR5K01', date: '20/08/2025', total: '450.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K02', date: '21/08/2025', total: '1.200.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K03', date: '22/08/2025', total: '850.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K04', date: '23/08/2025', total: '2.000.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K05', date: '24/08/2025', total: '350.000 ₫', status: 'Đã hủy' },
  { code: '#28VR5K06', date: '25/08/2025', total: '930.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K07', date: '26/08/2025', total: '1.300.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K08', date: '27/08/2025', total: '530.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K09', date: '28/08/2025', total: '630.000 ₫', status: 'Đã hủy' },
    { code: '#28VR5K01', date: '20/08/2025', total: '450.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K02', date: '21/08/2025', total: '1.200.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K03', date: '22/08/2025', total: '850.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K04', date: '23/08/2025', total: '2.000.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K05', date: '24/08/2025', total: '350.000 ₫', status: 'Đã hủy' },
  { code: '#28VR5K06', date: '25/08/2025', total: '930.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K07', date: '26/08/2025', total: '1.300.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K08', date: '27/08/2025', total: '530.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K09', date: '28/08/2025', total: '630.000 ₫', status: 'Đã hủy' },
  
])

const filteredOrders = computed(() =>
  orders.value.filter(o =>
    o.code.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (filterStatus.value === "" || o.status === filterStatus.value)
  )
)

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / perPage))

const paginatedOrders = computed(() =>
  filteredOrders.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const pagesAround = computed(() => {
  let pages = []
  let p = currentPage.value
  let t = totalPages.value

  for (let i = p - 1; i <= p + 1; i++) {
    if (i > 1 && i < t) pages.push(i)
  }

  return pages
})

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

const applyFilter = (val) => {
  filterStatus.value = val
  showFilter.value = false
}
</script>
