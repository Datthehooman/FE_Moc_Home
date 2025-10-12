<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <!-- 🔹 Form Register -->
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
          <hr class="mt-4 border-gray-300">
        </div>

        <!-- Form -->
        <form @submit.prevent="register" novalidate class="space-y-4">
          <div>
            <label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              v-model="password"
              placeholder="Nhập mật khẩu"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-1">Nhập lại mật khẩu</label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Nút đăng ký -->
         <button
  type="submit"
  class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group"
>
  <!-- Hiệu ứng hình tròn lan tỏa -->
  <span class="absolute inset-0 flex justify-center items-center">
    <span
      class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
    ></span>
  </span>

  <!-- Nội dung nút với icon cây bút -->
  <span class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
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
import { ref, reactive } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

// ✅ Validate thủ công
const register = () => {
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!email.value) {
    errors.email = 'Vui lòng nhập email'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.email = 'Email không hợp lệ'
  }

  if (!password.value) {
    errors.password = 'Vui lòng nhập mật khẩu'
  } else if (password.value.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }

  if (!confirmPassword.value) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu'
  } else if (confirmPassword.value !== password.value) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp'
  }

  // ✅ Nếu không có lỗi
  if (!errors.email && !errors.password && !errors.confirmPassword) {
    console.log('Đăng ký thành công:', email.value, password.value)
  }
}
</script>
