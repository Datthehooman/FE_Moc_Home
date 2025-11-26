<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const otp = ref(['', '', '', '', '', ''])
const error = ref('')
const loading = ref(false)
const success = ref(false)

const { verifyOtp, sendResetPasswordOtp } = useAuth()

// 🟡 Auto-focus sang ô tiếp theo
const focusNext = (index, event) => {
  const value = event.target.value
  if (value && index < otp.value.length - 1) {
    event.target.nextElementSibling?.focus()
  }
}

// 🟢 XÁC MINH OTP
const handleVerifyOtp = async () => {
  error.value = ''
  success.value = false

  const enteredOtp = otp.value.join('')

  if (enteredOtp.length < 6) {
    error.value = 'Vui lòng nhập đủ 6 ký tự OTP'
    return
  }

  try {
    loading.value = true
    const res = await verifyOtp(enteredOtp)

    if (res.success) {
      success.value = true
      alert(res.message || 'Xác thực OTP thành công 🎉')

      // TODO: chuyển qua trang đổi mật khẩu
      // navigateTo('/reset-password')
    } else {
      error.value = res.message || 'OTP không hợp lệ'
    }
  } catch (e) {
    console.error(e)
    error.value = 'Xác thực OTP thất bại, thử lại sau'
  } finally {
    loading.value = false
  }
}

// 🟣 GỬI LẠI OTP
const resendOtp = async () => {
  error.value = ''
  success.value = false

  const email = localStorage.getItem('resetEmail')
  if (!email) {
    error.value = 'Không tìm thấy email để gửi lại OTP'
    return
  }

  try {
    loading.value = true

    const res = await sendResetPasswordOtp(email)

    if (res.success) {
      alert('📩 Mã OTP đã được gửi lại, vui lòng kiểm tra email')
    } else {
      error.value = res.message || 'Gửi lại OTP thất bại'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Không thể gửi lại OTP'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <div class="mt-[50px] flex items-center justify-center p-4">
      <div class="w-full max-w-[480px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Nhập mã OTP đã được gửi đến email của bạn
          </p>
          <hr class="mt-4 border-gray-300" />
        </div>

        <!-- OTP FORM -->
        <form @submit.prevent="handleVerifyOtp" class="space-y-4">
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
            <p v-if="success" class="text-green-500 text-sm mt-2">✅ OTP hợp lệ</p>
          </div>

          <!-- NÚT XÁC NHẬN -->
          <button
            type="submit"
            :disabled="loading"
            class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group disabled:opacity-60"
          >
            <span class="flex justify-center items-center space-x-2 text-[16px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ loading ? 'Đang xác nhận...' : 'Xác nhận' }}</span>
            </span>
          </button>

          <!-- GỬI LẠI -->
          <div class="text-center text-sm text-gray-600">
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
