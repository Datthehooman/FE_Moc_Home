<template>
  <section class="bg-[#FFFBF8] min-h-screen py-10 px-4">
    <div class="max-w-[90%] mx-auto flex flex-col lg:flex-row gap-8 justify-between">
      <!-- FORM THANH TOÁN -->
      <div class="flex-[2.3] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full">
        <h2 class="text-xl font-semibold text-[#6E4E37] mb-6">
          Địa chỉ thanh toán của bạn
        </h2>
<form class="space-y-6 text-[14px]">
  <!-- Họ và tên -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block font-medium mb-1 text-[#6E4E37]">Họ</label>
      <input
        type="text"
        v-model="form.firstName"
        placeholder="Nhập họ của bạn"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      />
      <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
    </div>
    <div>
      <label class="block font-medium mb-1 text-[#6E4E37]">Tên</label>
      <input
        type="text"
        v-model="form.lastName"
        placeholder="Nhập tên của bạn"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      />
      <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
    </div>
  </div>

  <!-- Email & Số điện thoại -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block font-medium mb-1 text-[#6E4E37]">Email</label>
      <input
        type="email"
        v-model="form.email"
        placeholder="Nhập email"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      />
      <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
    </div>
    <div>
      <label class="block font-medium mb-1 text-[#6E4E37]">Số điện thoại</label>
      <input
        type="text"
        v-model="form.phone"
        placeholder="Nhập số điện thoại"
        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      />
      <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
    </div>
  </div>

  <!-- Địa chỉ -->
  <div>
    <label class="block font-medium mb-1 text-[#6E4E37]">Địa chỉ</label>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Tỉnh -->
      <select
        v-model="selectedProvince"
        @change="updateDistricts"
        class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      >
        <option disabled value="">Tỉnh / Thành phố</option>
        <option v-for="p in provinces" :key="p.name" :value="p.name">{{ p.name }}</option>
      </select>
      <p v-if="errors.province" class="text-red-500 text-xs mt-1">{{ errors.province }}</p>

      <!-- Quận -->
      <select
        v-model="selectedDistrict"
        @change="updateWards"
        class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      >
        <option disabled value="">Quận / Huyện</option>
        <option v-for="d in districts" :key="d.name" :value="d.name">{{ d.name }}</option>
      </select>
      <p v-if="errors.district" class="text-red-500 text-xs mt-1">{{ errors.district }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <!-- Phường -->
      <select v-model="selectedWard" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">
        <option disabled value="">Xã / Phường</option>
        <option v-for="w in wards" :key="w" :value="w">{{ w }}</option>
      </select>
      <p v-if="errors.ward" class="text-red-500 text-xs mt-1">{{ errors.ward }}</p>

      <input
        type="text"
        v-model="form.addressDetail"
        placeholder="Địa chỉ cụ thể"
        class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
      />
      <p v-if="errors.addressDetail" class="text-red-500 text-xs mt-1">{{ errors.addressDetail }}</p>
    </div>
  </div>

  <!-- Ghi chú -->
  <div>
    <label class="block font-medium mb-1 text-[#6E4E37]">Ghi chú</label>
    <textarea
      rows="4"
      v-model="form.note"
      placeholder="Nhập ghi chú (nếu có)"
      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"
    ></textarea>
  </div>

  <!-- Hình thức vận chuyển -->
  <div>
    <h3 class="font-medium text-[#6E4E37] mb-3">Hình thức vận chuyển</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <label
        v-for="(ship, i) in shippingMethods"
        :key="i"
        class="relative border border-gray-300 rounded-xl p-4 cursor-pointer hover:border-[#A77A5D] transition flex flex-col gap-1 items-start"
        :class="selectedShipping === ship.name ? 'border-[#A77A5D] bg-[#A77A5D]/10' : ''"
      >
        <input type="radio" name="shipping" :value="ship.name" v-model="selectedShipping" class="absolute top-3 right-3 w-4 h-4 accent-[#A77A5D]" />
        <strong>{{ ship.name }}</strong>
        <p class="text-xs text-gray-600">{{ ship.desc }}</p>
        <span class="text-sm font-medium text-[#A77A5D]">{{ ship.price }}</span>
      </label>
    </div>
    <p v-if="errors.shipping" class="text-red-500 text-xs mt-1">{{ errors.shipping }}</p>
  </div>

  <!-- Phương thức thanh toán -->
  <div>
    <h3 class="font-medium text-[#6E4E37] mb-3">Phương thức thanh toán</h3>

    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="payment" value="online" v-model="paymentMethod" class="accent-[#A77A5D] w-5 h-5" />
        <span>Thanh toán Online</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input type="radio" name="payment" value="offline" v-model="paymentMethod" class="accent-[#A77A5D] w-5 h-5" />
        <span>Thanh toán khi nhận hàng (Cọc 50%)</span>
      </label>
    </div>
    <p v-if="errors.paymentMethod" class="text-red-500 text-xs mt-1">{{ errors.paymentMethod }}</p>

    <!-- ONLINE -->
    <div v-if="paymentMethod === 'online'" class="mt-4">
      <h4 class="text-sm font-medium mb-2">Chọn ngân hàng</h4>
      <div class="grid grid-cols-3 gap-4">
        <label
          v-for="(bank, i) in banks"
          :key="i"
          class="relative border border-gray-300 rounded-lg p-2 flex justify-center items-center cursor-pointer hover:border-[#A77A5D] transition"
          :class="selectedBank === bank.name ? 'border-[#A77A5D] bg-[#A77A5D]/10' : ''"
        >
          <input type="radio" name="bank" :value="bank.name" v-model="selectedBank" class="absolute opacity-0" />
          <img :src="bank.logo || '/placeholder.png'" :alt="bank.name" class="w-14 h-10 object-contain" @error="bank.logo='/placeholder.png'" />
          <div v-if="selectedBank === bank.name" class="absolute top-2 right-2 w-4 h-4 bg-[#A77A5D] rounded-full flex items-center justify-center text-white text-xs">✓</div>
        </label>
      </div>
      <p v-if="errors.selectedBank" class="text-red-500 text-xs mt-1">{{ errors.selectedBank }}</p>
    </div>

    <!-- OFFLINE -->
    <div v-if="paymentMethod === 'offline'" class="mt-4 text-sm text-gray-600">
      Bạn cần <span class="text-[#A77A5D] font-semibold">cọc 50%</span> giá trị đơn hàng trước khi giao.
    </div>
  </div>

  <!-- Nút thanh toán -->
  <button @click.prevent="submitPayment" class="w-full bg-[#A77A5D] hover:bg-[#8B6145] text-white font-semibold py-2 mt-5 rounded-lg transition">
    Tiến hành thanh toán
  </button>
</form>

      </div>

     <!-- HÓA ĐƠN -->
<div
  class="flex-[1] w-full max-w-[360px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"
>
  <h2 class="text-lg font-semibold mb-4 text-[#6E4E37]">Hóa đơn</h2>

  <div class="space-y-2 text-sm">
    <div class="flex justify-between"><span>Tạm tính:</span><span>450.000 đ</span></div>
    <div class="flex justify-between"><span>Giảm giá:</span><span class="text-red-500">-50.000 đ</span></div>
    <div class="flex justify-between"><span>Vận chuyển:</span><span>Free</span></div>
    <div class="flex justify-between"><span>Thuế:</span><span>5.000 đ</span></div>
    <div class="border-t pt-3 flex justify-between font-semibold">
      <span>Tổng tiền:</span><span>405.000 đ</span>
    </div>
  </div>

  <!-- Nút thanh toán gọi validate -->
  <button
    @click.prevent="submitPayment"
    class="w-full bg-[#FED8B3] hover:bg-[#8B6145] text-black font-semibold py-2 mt-5 rounded-lg transition"
  >
    Tiến hành thanh toán
  </button>

  <!-- Hiển thị lỗi tổng quát nếu có -->
  <p v-if="errors.general" class="text-red-500 text-sm mt-2">{{ errors.general }}</p>

  <!-- <div class="flex items-stretch mt-5 border border-gray-300 rounded-lg overflow-hidden">
    <input
      placeholder="Nhập mã giảm giá"
      class="px-3 py-2 flex-1 focus:outline-none text-[14px]"
    />
    <button
      class="bg-[#A77A5D]/80 hover:bg-[#A77A5D] text-white px-4 font-medium whitespace-nowrap text-[13px]"
    >
      Xác nhận
    </button>
  </div> -->

    <a
  href="/cart"
  class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline"
>
  ← Quay lại giỏ hàng
</a>

</div>

    </div>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue"

const selectedProvince = ref("")
const selectedDistrict = ref("")
const selectedWard = ref("")
const districts = ref([])
const wards = ref([])

const provinces = ref([
  { name: "TP Hồ Chí Minh", districts: [{ name: "Quận 1", wards: ["Bến Nghé", "Bến Thành", "Phạm Ngũ Lão"] }, { name: "Quận 3", wards: ["Phường 1", "Phường 2", "Phường 3"] }, { name: "Bình Thạnh", wards: ["Phường 11", "Phường 12", "Phường 13"] }] },
  { name: "Cần Thơ", districts: [{ name: "Ninh Kiều", wards: ["An Bình", "An Khánh", "Xuân Khánh"] }, { name: "Bình Thủy", wards: ["Long Hòa", "Trà An", "Thới An Đông"] }] },
  { name: "Đồng Nai", districts: [{ name: "Biên Hòa", wards: ["Tân Mai", "Tân Phong", "Hiệp Hòa"] }, { name: "Long Thành", wards: ["An Phước", "Lộc An", "Phước Bình"] }] },
  { name: "Bình Dương", districts: [{ name: "Thủ Dầu Một", wards: ["Phú Hòa", "Hiệp Thành", "Chánh Nghĩa"] }, { name: "Dĩ An", wards: ["Dĩ An", "Tân Đông Hiệp", "Bình An"] }] },
  { name: "Bà Rịa - Vũng Tàu", districts: [{ name: "Vũng Tàu", wards: ["Thắng Nhất", "Thắng Nhì", "Thắng Tam"] }, { name: "Bà Rịa", wards: ["Phước Hiệp", "Phước Nguyên", "Long Hương"] }] }
])

function updateDistricts() {
  const province = provinces.value.find(p => p.name === selectedProvince.value)
  districts.value = province ? province.districts : []
  selectedDistrict.value = ""
  wards.value = []
}

function updateWards() {
  const district = districts.value.find(d => d.name === selectedDistrict.value)
  wards.value = district ? district.wards : []
  selectedWard.value = ""
}

// thanh toán
const selectedShipping = ref('')
const paymentMethod = ref('')
const selectedBank = ref('')

const shippingMethods = [
  { name: 'Tiêu chuẩn', desc: '6–7 ngày', price: 'Miễn phí' },
  { name: 'Nhanh', desc: '3–4 ngày', price: '30.000 đ' },
  { name: 'Hỏa tốc', desc: '1–2 ngày', price: '200.000 đ' },
  { name: 'Tại cửa hàng', desc: 'Lấy trực tiếp', price: 'Free' },
]

const banks = [
  { name: 'Vietcombank', logo: '/vietcombank.png' },
  { name: 'Techcombank', logo: '/techcombank.png' },
  { name: 'MB Bank', logo: '/mbbank.png' },
  { name: 'ACB', logo: '/acb.png' },
  { name: 'VPBank', logo: '/vpbank.png' },
  { name: 'BIDV', logo: '/bidv.png' },
]

// form data
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressDetail: "",
  note: "",
})

// errors
const errors = reactive({})

function validate() {
  // reset errors
  Object.keys(errors).forEach(key => errors[key] = "")

  let valid = true

  if (!form.firstName) { errors.firstName = "Họ không được để trống"; valid = false }
  if (!form.lastName) { errors.lastName = "Tên không được để trống"; valid = false }
  if (!form.email) { errors.email = "Email không được để trống"; valid = false }
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) { errors.email = "Email không hợp lệ"; valid = false }
  if (!form.phone) { errors.phone = "SĐT không được để trống"; valid = false }
  else if (!/^\d{9,11}$/.test(form.phone)) { errors.phone = "SĐT không hợp lệ"; valid = false }

  if (!selectedProvince.value) { errors.province = "Chọn tỉnh/thành phố"; valid = false }
  if (!selectedDistrict.value) { errors.district = "Chọn quận/huyện"; valid = false }
  if (!selectedWard.value) { errors.ward = "Chọn xã/phường"; valid = false }
  if (!form.addressDetail) { errors.addressDetail = "Nhập địa chỉ cụ thể"; valid = false }

  if (!selectedShipping.value) { errors.shipping = "Chọn hình thức vận chuyển"; valid = false }
  if (!paymentMethod.value) { errors.paymentMethod = "Chọn phương thức thanh toán"; valid = false }
  if (paymentMethod.value === "online" && !selectedBank.value) { errors.selectedBank = "Chọn ngân hàng"; valid = false }

  return valid
}

function submitPayment() {
  if (validate()) {
    alert("Thanh toán thành công!")
    // gọi API hoặc logic tiếp theo
  } else {
    alert("Vui lòng điền đúng thông tin trước khi thanh toán")
  }
}
</script>
