<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <div class="flex items-center justify-center p-4 mt-[50px]">
      <div class="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <img src="/logo.png" alt="Logo" class="w-32 mx-auto" />
          <p class="text-sm text-primary text-[16px] mt-2">
            Nhập mật khẩu mới để đặt lại
          </p>
          <hr class="mt-4 border-gray-300" />
        </div>

        <!-- Form -->
        <form @submit.prevent="submitReset" novalidate class="space-y-4">

          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              v-model="email"
              placeholder="Nhập email đã xác thực OTP"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <!-- Mật khẩu -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Mật khẩu mới</label>
            <input 
              type="password"
              v-model="password"
              placeholder="Nhập mật khẩu mới"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <!-- Xác nhận -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input 
              type="password"
              v-model="passwordConfirm"
              placeholder="Nhập lại mật khẩu"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-300"
            />
          </div>

          <!-- Error -->
          <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
          <p v-if="success" class="text-green-600 text-sm mt-1">{{ success }}</p>

          <!-- Nút submit -->
          <button
            type="submit"
            :disabled="loading"
            class="relative w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center disabled:opacity-70"
          >
            <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-black"></span>
            <span v-else>Đổi mật khẩu</span>
          </button>

        </form>

        <div class="text-center text-sm text-gray-600">
          <NuxtLink to="/login" class="text-primary font-medium hover:text-secondary">Quay lại đăng nhập</NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const { resetPasswordV1 } = useAuth() as any

const email = ref("")
const password = ref("")
const passwordConfirm = ref("")
const error = ref("")
const success = ref("")
const loading = ref(false)

// Lấy email từ localStorage (đã lưu sau bước gửi OTP)
onMounted(() => {
  const savedEmail = localStorage.getItem("resetEmail")
  if (savedEmail) email.value = savedEmail
})
onMounted(() => {
  if (!localStorage.getItem("otpVerified")) {
    navigateTo("/OtpVerify");
  }
});


const submitReset = async () => {
  error.value = ""
  success.value = ""

  if (!email.value || !password.value || !passwordConfirm.value) {
    error.value = "Vui lòng nhập đầy đủ thông tin"
    return
  }

  if (password.value.length < 6) {
    error.value = "Mật khẩu phải ít nhất 6 ký tự"
    return
  }

  if (password.value !== passwordConfirm.value) {
    error.value = "Mật khẩu xác nhận không khớp"
    return
  }

  loading.value = true

  try {
    const res = await resetPasswordV1({
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    })

    if (res.success) {
      success.value = res.message || "Đổi mật khẩu thành công!"

      setTimeout(() => {
        navigateTo("/login")
      }, 1200)
    } else {
      error.value = res.message || "Đổi mật khẩu thất bại"
    }

  } catch (e: any) {
    error.value = e?.message || "Lỗi kết nối server"
  } finally {
    loading.value = false
  }
}
</script>
