<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX 1 - THÔNG TIN HỒ SƠ -->
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">Thông tin hồ sơ</h3>
          <hr class="border-t border-gray-200 my-4">

          <form @submit.prevent="saveProfile" class="space-y-4">

            <div class="grid grid-cols-2 gap-4">
              <input v-model="form.firstName" type="text" placeholder="Họ"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none">
              <input v-model="form.lastName" type="text" placeholder="Tên"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none">
            </div>

            <input v-model="form.email" type="email" placeholder="Email"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none">

            <input v-model="form.phone" type="text" placeholder="Số điện thoại"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none">

            <input v-model="form.address" type="text" placeholder="Địa chỉ"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none">

            <!-- BTN Lưu -->
            <button
              class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
              <span class="absolute inset-0 flex justify-center items-center">
                <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
              </span>
              <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
                Lưu thay đổi
              </span>
            </button>

            <p v-if="profileError" class="text-red-500 text-sm">{{ profileError }}</p>
          </form>
        </section>

        <!-- BOX 2 - ĐỔI MẬT KHẨU -->
        <section class="bg-white rounded-xl p-5 shadow">
          <h3 class="font-semibold text-gray-700 text-[20px]">Đổi mật khẩu</h3>
          <hr class="border-t border-gray-200 my-4">

          <form @submit.prevent="changePassword" class="space-y-4">

            <input v-model="password.old" type="password" placeholder="Mật khẩu cũ"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]">

            <input v-model="password.newPass" type="password" placeholder="Mật khẩu mới"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]">

            <input v-model="password.confirm" type="password" placeholder="Nhập lại mật khẩu mới"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]">

            <!-- BTN -->
            <button
              class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
              <span class="absolute inset-0 flex justify-center items-center">
                <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
              </span>
              <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
                Thay đổi mật khẩu
              </span>
            </button>

            <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          </form>
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

const form = ref({
  firstName: 'Lê',
  lastName: 'Quân',
  email: 'quan@example.com',
  phone: '0912345678',
  address: 'TP. Hồ Chí Minh',
})

const password = ref({
  old: '',
  newPass: '',
  confirm: ''
})

const profileError = ref('')
const passwordError = ref('')

const saveProfile = () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.phone) {
    profileError.value = 'Vui lòng nhập đầy đủ thông tin.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    profileError.value = 'Email không hợp lệ.'
    return
  }
  if (!/^[0-9]{9,11}$/.test(form.value.phone)) {
    profileError.value = 'Số điện thoại không hợp lệ.'
    return
  }
  profileError.value = ''
  alert('✅ Lưu thành công!')
}

const changePassword = () => {
  if (!password.value.old || !password.value.newPass || !password.value.confirm) {
    passwordError.value = 'Không được bỏ trống.'
    return
  }
  if (password.value.newPass !== password.value.confirm) {
    passwordError.value = 'Mật khẩu mới không trùng khớp.'
    return
  }
  passwordError.value = ''
  alert('🔐 Đổi mật khẩu thành công!')
}
</script>
