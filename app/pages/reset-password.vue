<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4 mt-[50px]">
      <div class="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </p>
          <hr class="mt-4 border-gray-300">
        </div>

        <!-- Form -->
        <form @submit.prevent="sendResetLink" novalidate class="space-y-4">
          <div>
            <label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Nhập email đã đăng ký"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
            />
            <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
          </div>

          <!-- Nút gửi -->
          <button
            type="submit"
            class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group"
          >
            <span class="absolute inset-0 flex justify-center items-center">
              <span
                class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
              ></span>
            </span>

            <span class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]">
              <!-- ✉️ Icon mail -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.8" stroke="currentColor" class="w-5 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Gửi liên kết đặt lại</span>
            </span>
          </button>
        </form>

        <!-- Quay lại đăng nhập -->
        <div class="text-center text-sm text-gray-600">
          <p>
            Nhớ mật khẩu rồi?
            <a href="/login" class="text-primary font-medium hover:text-secondary">Đăng nhập</a>
          </p>
        </div>

        <!-- OR -->
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-2 text-gray-500">Hoặc</span>
          </div>
        </div>

        <!-- Social buttons -->
        <div class="flex space-x-3">
          <button
            class="w-full py-2 border border-blue-600 text-blue-600 rounded-md flex justify-center items-center space-x-2 hover:bg-blue-50 transition"
          >
            Facebook
          </button>
          <button
            class="w-full py-2 border border-red-500 text-red-500 rounded-md flex justify-center items-center space-x-2 hover:bg-red-50 transition"
          >
            Google
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const error = ref('')

const sendResetLink = () => {
  error.value = ''

  if (!email.value) {
    error.value = 'Vui lòng nhập email'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    error.value = 'Email không hợp lệ'
  } else {
    console.log('Gửi liên kết đặt lại mật khẩu đến:', email.value)
    // 🔹 Gửi API tại đây
  }
}
</script>
