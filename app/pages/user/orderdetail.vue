<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX CHI TIẾT ĐƠN HÀNG -->
        <section class="bg-white rounded-xl p-6 shadow">

          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-[20px] font-semibold text-gray-700">
              Đơn hàng (#{{ order.code }})
            </h3>
            <button class="px-4 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow hover:bg-[#FECB96] transition">
              &larr; Danh sách đơn hàng
            </button>
          </div>

          <hr class="border-t border-gray-200 mb-6" />

          <!-- Sản phẩm -->
          <div class="space-y-3">
            <div
              v-for="(product, i) in order.products"
              :key="i"
              class="flex items-center justify-between bg-[#F5F7FA] rounded-xl p-4 transition hover:bg-[#ECEFF3]"
            >
              <div class="flex items-center gap-4">
                <img :src="product.image" alt="product" class="w-16 h-16 rounded-lg object-cover" />
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

          <!-- Địa chỉ & Hóa đơn -->
          <div class="flex flex-col md:flex-row gap-6 mt-6">

            <!-- Địa chỉ nhận hàng -->
            <div class="flex-1 bg-[#F5F7FA] rounded-xl p-4">
              <h4 class="text-gray-700 font-semibold mb-2">Địa chỉ nhận hàng</h4>
              <p class="text-gray-500 text-sm">{{ order.address }}</p>
            </div>

            <!-- Hóa đơn -->
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

// Dummy data tương tự hình
const order = ref({
  code: '28VR5K59',
  address: 'Công viên Quang Trung, quận 12, tp. HCM',
  subtotal: '450.000 ₫',
  discount: '-50.000 ₫',
  shipping: 'Free',
  tax: '5.000 ₫',
  total: '405.000 ₫',
  products: [
    { name: 'Ghế Denim đơn giản', code: '#123456', brand: 'Moderno', quantity: 2, color: 'Đen', total: '300.000 ₫', image: 'https://via.placeholder.com/64' },
    { name: 'Ghế Denim đơn giản', code: '#123456', brand: 'Moderno', quantity: 2, color: 'Đen', total: '300.000 ₫', image: 'https://via.placeholder.com/64' },
    { name: 'Ghế Denim đơn giản', code: '#123456', brand: 'Moderno', quantity: 2, color: 'Đen', total: '300.000 ₫', image: 'https://via.placeholder.com/64' },
  ]
})
</script>
