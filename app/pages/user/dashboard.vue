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
                <p class="text-[30px] font-bold text-[#F7D155] leading-none">50</p>
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
                <p class="text-[30px] font-bold text-[#11B76B] leading-none">250</p>
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

        <!-- Đơn hàng gần đây -->
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Đơn hàng gần đây</h3>
           <button
  class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
>
  <!-- Layer hiệu ứng nổ -->
  <span class="absolute inset-0 flex justify-center items-center">
    <span
      class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
    ></span>
  </span>

  <!-- Text -->
  <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
    Xem tất cả
  </span>
</button>

          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
          <div class="grid grid-cols-5 text-[#6E4E37] font-semibold text-sm px-2 mb-3 text[16px ]">
            <div>#Mã đơn</div>
            <div>Ngày mua</div>
            <div>Tổng</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

        <!-- LIST -->
<div class="space-y-2">
  <div
    v-for="(order, i) in orders"
    :key="i"
    class="grid grid-cols-5 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
  >
    <div class="text-[#A77A5D] font-semibold cursor-pointer font-medium">{{ order.code }}</div>
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
  class="w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition
         hover:bg-black/20 hover:border-black/20"
>
  <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="1.5" 
    stroke="currentColor" 
    class="w-5 h-5 text-gray-500 transition
           group-hover:text-white hover:text-white">
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

        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref } from 'vue'

const menuItems = [
  { name: 'Hồ sơ của tôi', icon: 'user', active: true },
  { name: 'Danh sách đơn hàng', icon: 'clipboard-list', active: false }
]

const orders = ref([
  { code: '#28VR5K01', date: '20/08/2025', total: '450.000 ₫', status: 'Đang chờ' },
  { code: '#28VR5K02', date: '21/08/2025', total: '1.200.000 ₫', status: 'Đang xử lý' },
  { code: '#28VR5K03', date: '22/08/2025', total: '850.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K04', date: '23/08/2025', total: '2.000.000 ₫', status: 'Hoàn thành' },
  { code: '#28VR5K05', date: '24/08/2025', total: '350.000 ₫', status: 'Đã hủy' }
])
</script>
