<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4 mt-[50px]">
      <div class="w-full max-w-[540px] bg-white rounded-xl shadow-lg p-8 space-y-6">

        <!-- Logo -->
        <div class="text-center">
          <div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Tạo tài khoản Mộc Home để mua sắm dễ dàng hơn
          </p>
          <hr class="mt-4 border-gray-300" />
        </div>

        <!-- Form -->
        <form @submit.prevent="register" novalidate class="space-y-4">
          <!-- Họ và tên -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              v-model="fullName"
              placeholder="Nhập họ và tên"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
              :class="{ 'border-red-500': errors.fullName }"
            />
            <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
          </div>

          <!-- Số điện thoại -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              v-model="phone"
              placeholder="Nhập số điện thoại"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              @blur="checkEmail"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Mật khẩu -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              v-model="password"
              placeholder="Nhập mật khẩu"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <!-- Nhập lại mật khẩu -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Nhập lại mật khẩu</label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Nút đăng ký -->
          <button
            type="submit"
            :disabled="loading"
            class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-black"></span>
            <span v-else class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
              </svg>
              <span>Đăng ký</span>
            </span>
          </button>
        </form>

        <!-- Login / OR -->
        <div class="text-center text-sm text-gray-600">
          <p>
            Bạn đã có tài khoản?
            <NuxtLink to="/login" class="text-primary font-medium hover:text-secondary">Đăng nhập</NuxtLink>
          </p>
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>
        </div>

        <!-- Social buttons -->
        <div class="flex space-x-3">
          <button class="w-full py-2 border border-blue-600 text-blue-600 rounded-md flex justify-center items-center space-x-2 hover:bg-blue-50 transition">Facebook</button>
          <button class="w-full py-2 border border-red-500 text-red-500 rounded-md flex justify-center items-center space-x-2 hover:bg-red-50 transition">Google</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Giả sử useAuth có 2 API: register và checkEmailAvailable
const { register: registerApi, checkEmailAvailable } = useAuth() 

const fullName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const errors = reactive({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Kiểm tra email khi blur
const checkEmail = async () => {
  errors.email = '' // reset
  if (!email.value) return
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errors.email = 'Email không đúng định dạng'
    return
  }

  try {
    const res = await checkEmailAvailable(email.value)
    if (!res.available) errors.email = 'Email đã được sử dụng'
  } catch (err: any) {
    console.error(err)
    errors.email = 'Không thể kiểm tra email'
  }
}

const register = async () => {
  // Reset lỗi
  Object.keys(errors).forEach(key => (errors[key] = ''))

  // Validate frontend
  if (!fullName.value) errors.fullName = 'Tên không được để trống'
  else if (/\d/.test(fullName.value)) errors.fullName = 'Tên không được chứa số'

  if (!phone.value) errors.phone = 'Số điện thoại không được để trống'
  else if (!/^0\d{9}$/.test(phone.value)) errors.phone = 'Số điện thoại không hợp lệ (bắt đầu 0, 10 số)'
  else if (phone.value.length > 20) errors.phone = 'Số điện thoại quá dài'

  if (!email.value) errors.email = 'Email không được để trống'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.email = 'Email không đúng định dạng'

  if (!password.value) errors.password = 'Mật khẩu không được để trống'
  else if (password.value.length < 8) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'

  if (!confirmPassword.value) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu'
  else if (password.value !== confirmPassword.value) errors.confirmPassword = 'Xác nhận mật khẩu không khớp'

  if (Object.values(errors).some(e => e)) return

  loading.value = true
  try {
    const res = await registerApi({
      full_name: fullName.value,
      phone: phone.value,
      email: email.value,
      password_hash: password.value,
      password_hash_confirmation: confirmPassword.value
    })

    // Xử lý backend validation
    if (res.errors) {
      if (res.errors.full_name) errors.fullName = res.errors.full_name[0]
      if (res.errors.email) errors.email = res.errors.email[0] // Email trùng
      if (res.errors.password_hash) errors.password = res.errors.password_hash[0]
      if (res.errors.phone) errors.phone = res.errors.phone[0] // Phone trùng
      return
    }

    if (res.success) {
      alert('✅ Đăng ký thành công!')
      navigateTo('/login')
      return
    }

    if (res.message) alert(res.message)

  } catch (err: any) {
    console.error('❌ Lỗi đăng ký:', err)
    alert('Có lỗi xảy ra, vui lòng thử lại!')
  } finally {
    loading.value = false
  }
}
</script>
