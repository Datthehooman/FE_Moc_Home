<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <!-- 🔹 Form OTP -->
    <div class="flex-grow flex items-center justify-center p-4 mt-[50px]">
      <div class="w-full max-w-[480px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Nhập mã OTP đã được gửi đến email của bạn
          </p>
          <hr class="mt-4 border-gray-300">
        </div>

        <!-- Form OTP -->
        <form @submit.prevent="verifyOtp" novalidate class="space-y-4">
          <div>
            <label class="block text-sm text-gray-700 mb-2">Mã OTP</label>
            <div class="flex justify-between gap-2">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                v-model="otp[index]"
                @input="focusNext(index, $event)"
              />
            </div>
            <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
          </div>

          <!-- Nút xác nhận -->
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7" />
              </svg>
              <span>Xác nhận</span>
            </span>
          </button>

          <!-- Gửi lại OTP -->
          <div class="text-center text-sm text-gray-600 mt-3">
            <p>
              Không nhận được mã?
              <button @click.prevent="resendOtp" class="text-primary font-medium hover:text-secondary">
                Gửi lại OTP
              </button>
            </p>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const otp = ref(['', '', '', '', '', ''])
const error = ref('')

const focusNext = (index, event) => {
  const value = event.target.value
  if (value && index < otp.value.length - 1) {
    event.target.nextElementSibling?.focus()
  }
}

const verifyOtp = () => {
  error.value = ''

  const enteredOtp = otp.value.join('')
  if (enteredOtp.length < 6) {
    error.value = 'Vui lòng nhập đủ 6 ký tự OTP'
    return
  }

  console.log('✅ OTP xác nhận:', enteredOtp)
}

const resendOtp = () => {
  console.log('📩 Gửi lại mã OTP...')
}
</script>
