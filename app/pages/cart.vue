<template>
  <section class="bg-[#FFF8F3] min-h-screen py-10">
    <div class="max-w-[85%] mx-auto flex flex-col md:flex-row gap-10">
      <!-- BẢNG SẢN PHẨM -->
      <div class="flex-1 rounded-2xl p-6">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="pb-3">HÌNH ẢNH</th>
              <th class="pb-3">TÊN SẢN PHẨM</th>
              <th class="pb-3">GIÁ</th>
              <th class="pb-3">SỐ LƯỢNG</th>
              <th class="pb-3">TỔNG</th>
              <th class="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in cart"
              :key="item.id"
              class="border-b border-gray-100"
            >
              <td class="py-4">
                <img
                  :src="item.image"
                  alt="sản phẩm"
                  class="w-20 h-20 rounded-lg object-cover"
                />
              </td>

              <td>
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-sm text-gray-500">Loại: {{ item.type }}</p>
                <p class="text-sm text-gray-500">Màu sắc: {{ item.color }}</p>
              </td>

              <td class="font-semibold">{{ formatPrice(item.price) }} đ</td>

              <td>
                <div class="flex items-center gap-2">
                  <button
                    @click="decreaseQty(item)"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl"
                  >
                    –
                  </button>
                  <span class="w-6 text-center">{{ item.qty }}</span>
                  <button
                    @click="increaseQty(item)"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl"
                  >
                    +
                  </button>
                </div>
              </td>

              <td class="font-semibold">
                {{ formatPrice(item.price * item.qty) }} đ
              </td>

              <td class="text-center">
                <button
                  @click="removeItem(index)"
                  class="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition"
                >
                  ×
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- HÓA ĐƠN -->
      <div
        class="w-full md:w-[350px] bg-[#A77A5D]/10  rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"
      >
        <h2 class="text-lg font-semibold mb-4">Hóa đơn</h2>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Tạm tính:</span>
            <span>{{ formatPrice(subtotal) }} đ</span>
          </div>

          <div class="flex justify-between">
            <span>Giảm giá:</span>
            <span class="text-red-500">-{{ formatPrice(discount) }} đ</span>
          </div>

          <div class="flex justify-between">
            <span>Vận chuyển:</span>
            <span>Free</span>
          </div>

          <div class="flex justify-between">
            <span>Thuế:</span>
            <span>{{ formatPrice(tax) }} đ</span>
          </div>

          <div class="border-t pt-3 flex justify-between font-semibold">
            <span>Tổng tiền:</span>
            <span>{{ formatPrice(total) }} đ</span>
          </div>
        </div>

        <button
          class="w-full bg-[#F7C59F] hover:bg-[#E8B58C] text-[#6E4E37] font-semibold py-2 mt-5 rounded-lg transition"
        >
        <a href="/checkout" class="w-full block text-center">
          Tiến hành thanh toán
        </a>
        </button>

        <!-- NHẬP MÃ GIẢM GIÁ -->
        <div class="flex items-stretch mt-5 border border-gray-300 rounded-lg overflow-hidden">
          <input
            v-model="discountCode"
            placeholder="Nhập mã giảm giá"
            class="px-3 py-2 flex-1 focus:outline-none text-[14px]"
          />
          <button
            @click="applyDiscount"
            class="bg-[#F7C59F] text-[#6E4E37] px-4 font-medium whitespace-nowrap text-[13px]"
          >
            Xác nhận
          </button>
        </div>
   <a
  href="/cart"
  class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline"
>
  ← Tiếp tục mua sắm
</a>
       
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 🧱 Dữ liệu mẫu
const cart = ref([
  {
    id: 1,
    name: 'Ghế Denim đơn giản',
    type: 'Ghế bành',
    color: 'Cam',
    price: 150000,
    qty: 1,
    image: '/images/chair1.png',
  },
  {
    id: 2,
    name: 'Ghế Denim đơn giản',
    type: 'Ghế bành',
    color: 'Cam',
    price: 150000,
    qty: 1,
    image: '/images/chair2.png',
  },
  {
    id: 3,
    name: 'Ghế Denim đơn giản',
    type: 'Ghế bành',
    color: 'Cam',
    price: 150000,
    qty: 1,
    image: '/images/chair3.png',
  },
])

// ⚙️ Logic tính toán
const discount = ref(0)
const discountCode = ref('')
const tax = ref(5000)

// Tính tổng tiền từng phần
const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)
const total = computed(() => subtotal.value - discount.value + tax.value)

// Các hàm xử lý
function increaseQty(item: any) {
  item.qty++
}

function decreaseQty(item: any) {
  if (item.qty > 1) item.qty--
}

function removeItem(index: number) {
  cart.value.splice(index, 1)
}

function applyDiscount() {
  if (discountCode.value === 'giam-50') {
    discount.value = 50000
    alert('✅ Áp dụng mã giảm giá 50.000đ thành công!')
  } else {
    discount.value = 0
    alert('❌ Mã không hợp lệ!')
  }
}

// Format tiền đẹp
function formatPrice(num: number) {
  return num.toLocaleString('vi-VN')
}
</script>

<style scoped>
th {
  font-weight: 600;
  color: #6e4e37;
  font-size: 14px;
}
</style>
