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
            <tr v-for="(item, index) in cart" :key="item.cart_id" class="border-b border-gray-100">
              <td class="py-4">
                <img :src="item.thumbnail || '/placeholder.png'" alt="sản phẩm" class="w-20 h-20 rounded-lg object-cover"/>
              </td>
              <td><p class="font-semibold">{{ item.product_name }}</p></td>
              <td class="font-semibold">{{ formatPrice(item.product_sale || item.product_price) }} đ</td>
              <td>
                <div class="flex items-center gap-2">
                  <button @click="decreaseQty(item)" class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl">–</button>
                  <input v-model.number="item.quantity" type="number" min="1" class="w-12 text-center border rounded"/>
                  <button @click="increaseQty(item)" class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl">+</button>
                  <button @click="updateQty(item)" class="ml-2 px-2 py-1 bg-[#F7C59F] rounded text-sm text-[#6E4E37] hover:bg-[#E8B58C]">Cập nhật</button>
                </div>
              </td>
              <td class="font-semibold">{{ formatPrice(item.subtotal) }} đ</td>
              <td class="text-center">
                <button @click="removeItemFromCart(item.cart_id, index)" class="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition">×</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Thông báo giỏ hàng trống -->
        <div v-if="cart.length === 0" class="text-center py-4 text-gray-500 font-semibold">
          Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng!
        </div>
      </div>

      <!-- HÓA ĐƠN -->
      <div class="w-full md:w-[350px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10">
        <h2 class="text-lg font-semibold mb-4">Hóa đơn</h2>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span>Tạm tính:</span><span>{{ formatPrice(cart.length > 0 ? apiTotal : 0) }} đ</span></div>
          <div class="flex justify-between"><span>Giảm giá:</span><span class="text-red-500">-{{ formatPrice(cart.length > 0 ? discount : 0) }} đ</span></div>
          <div class="flex justify-between"><span>Vận chuyển:</span><span>Free</span></div>
          <div class="flex justify-between"><span>Thuế:</span><span>{{ formatPrice(cart.length > 0 ? tax : 0) }} đ</span></div>
          <div class="border-t pt-3 flex justify-between font-semibold">
            <span>Tổng thanh toán:</span>
            <span>{{ formatPrice(cart.length > 0 ? (apiTotal - discount + tax) : 0) }} đ</span>
          </div>
        </div>

        <button class="w-full bg-[#FED8B3] hover:bg-[#E8B58C] text-[#000000] font-semibold py-2 mt-5 rounded-lg transition">
          <a href="/checkout" class="w-full block text-center">Tiến hành thanh toán</a>
        </button>

        <!-- NHẬP MÃ GIẢM GIÁ -->
        <div class="flex items-stretch mt-5 border border-gray-300 rounded-lg overflow-hidden">
          <input v-model="discountCode" placeholder="Nhập mã giảm giá" class="px-3 py-2 flex-1 focus:outline-none text-[14px]" />
          <button @click="applyDiscount" class="bg-[#F7C59F] text-[#6E4E37] px-4 font-medium whitespace-nowrap text-[13px]">Xác nhận</button>
        </div>

        <a href="/cart" class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline">← Tiếp tục mua sắm</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth'
// })

import { ref, onMounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { useProduct } from '~/composables/useProduct'

const { cart, getCart, removeItem, updateQuantity } = useCart()
const { products, fetchProducts } = useProduct()

const discount = ref(0)
const discountCode = ref('')
const apiTotal = ref(0)
const tax = ref(5000)

// Lấy sản phẩm và giỏ hàng từ API
async function fetchCartData() {
  await fetchProducts()
  const data = await getCart()
  if (data) {
    apiTotal.value = data.total
    cart.value = data.items.map((item: any) => {
      const prod = products.value.find(p => p.product_id === item.product_id)
      return {
        ...item,
        thumbnail: prod?.thumbnail || '/placeholder.png'
      }
    })
  } else {
    apiTotal.value = 0
    cart.value = []
  }
}
onMounted(fetchCartData)

// Tăng/giảm số lượng
function increaseQty(item: any) { item.quantity++ }
function decreaseQty(item: any) { if(item.quantity > 1) item.quantity-- }
async function updateQty(item: any) {
  if(item.quantity < 1) item.quantity = 1
  await updateQuantity(item.product_id, item.quantity)
  await fetchCartData()
}

// Xóa sản phẩm
async function removeItemFromCart(cart_id: number, index: number) {
  const success = await removeItem(cart_id)
  if (success) {
    cart.value.splice(index, 1)
    await fetchCartData()
  }
}

// Áp dụng mã giảm giá
function applyDiscount() {
  if(discountCode.value === 'giam-50') {
    discount.value = 50000
    alert('✅ Áp dụng mã giảm giá 50.000đ thành công!')
  } else {
    discount.value = 0
    alert('❌ Mã không hợp lệ!')
  }
}

// Format giá
function formatPrice(num: number | string) {
  return Number(num).toLocaleString('vi-VN')
}

</script>
