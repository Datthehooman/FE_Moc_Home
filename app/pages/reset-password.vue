<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <div class="flex items-center justify-center p-4 mt-[50px]">
      <div class="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Nhập email để nhận mã OTP đặt lại mật khẩu
          </p>
          <hr class="mt-4 border-gray-300" />
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
              :class="{ 'border-red-500': error }"
            />
            <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
            <p v-if="success" class="text-green-600 text-sm mt-1">{{ success }}</p>
          </div>

          <!-- Nút gửi -->
          <button
            type="submit"
            :disabled="loading"
            class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-black"></span>
            <span v-else class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.8" stroke="currentColor" class="w-5 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Gửi mã OTP</span>
            </span>
          </button>
        </form>

        <!-- Quay lại đăng nhập -->
        <div class="text-center text-sm text-gray-600">
          <p>
            Nhớ mật khẩu rồi?
            <NuxtLink to="/login" class="text-primary font-medium hover:text-secondary">Đăng nhập</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from '#app'

const email = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const { sendResetPasswordOtp } = useAuth()

const sendResetLink = async () => {
  error.value = ''
  success.value = ''

  // 🔹 Kiểm tra email trống
  if (!email.value) {
    error.value = 'Vui lòng nhập email'
    return
  }

  // 🔹 Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Email không hợp lệ'
    return
  }

  loading.value = true
  try {
    const res = await sendResetPasswordOtp(email.value)

    if (res?.success || res?.status === 200) {
      success.value = res?.message || 'Đã gửi mã OTP đến email của bạn!'

      // ✅ Lưu email để trang OTP dùng lại
      localStorage.setItem("resetEmail", email.value)

      // 🟢 Chuyển sang trang xác minh OTP
      setTimeout(() => {
        navigateTo('/OtpVerify')
      }, 1000)
    } else {
      error.value = res?.message || 'Gửi mã OTP thất bại.'
    }
  } catch (err: any) {
    if (err?.errors?.email) error.value = err.errors.email[0]
    else error.value = err?.message || 'Lỗi kết nối server.'
  } finally {
    loading.value = false
  }
}

</script>
