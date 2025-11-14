<template>
  <div class="min-h-screen bg-[#FFFBF8] flex flex-col">
    <!-- 🔹 Form Login -->
    <div class="flex-grow flex items-center justify-center p-4 mt-[50px]">
      <div
        class="w-full max-w-[540px] bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <!-- Logo -->
        <div class="text-center">
          <div
            class="text-2xl font-bold text-primary mb-1 flex justify-center items-center space-x-2"
          >
            <img src="/logo.png" alt="Logo" class="w-30" />
          </div>
          <p class="text-sm text-primary text-[16px]">
            Đăng nhập bằng tài khoản Mộc Home của bạn
          </p>
          <hr class="mt-4 border-gray-300" />
        </div>

        <!-- Form -->
     <form @submit.prevent="handleLogin" novalidate class="space-y-4">

          <div>
            <label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              :class="[
                'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400',
                errors.email ? 'border-red-500' : 'border-gray-300'
              ]"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              v-model="password"
              placeholder="Nhập mật khẩu"
              :class="[
                'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400',
                errors.password ? 'border-red-500' : 'border-gray-300'
              ]"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="remember"
                class="opacity-50 h-4 w-4 text-orange-400 border-gray-300 rounded focus:ring-orange-300"
              />
              <span class="text-gray-700 opacity-50">Nhớ mật khẩu</span>
            </label>
            <a
              href="/reset-password"
              class="text-gray-600 hover:text-orange-500 font-medium"
              >Quên mật khẩu?</a
            >
          </div>

          <!-- Nút đăng nhập -->
          <button
            type="submit"
            class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group"
          >
            <span class="absolute inset-0 flex justify-center items-center">
              <span
                class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"
              ></span>
            </span>

            <span
              class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Đăng nhập</span>
            </span>
          </button>
        </form>

        <!-- Signup / OR -->
        <div class="text-center text-sm text-gray-600">
          <p>
            Bạn chưa có tài khoản?
            <a
              href="/register"
              class="text-primary font-medium hover:text-secondary"
              >Đăng ký</a
            >
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
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from '#imports'

const { login, tokenCookie } = useAuth()

const email = ref('')
const password = ref('')
const remember = ref(false)
const errors = reactive({ email: '', password: '' })

// reactive token để debug hoặc show UI
const tokenValue = ref(tokenCookie.value)
watch(tokenCookie, (newVal) => { tokenValue.value = newVal })

const handleLogin = async () => {
  errors.email = ''
  errors.password = ''

  if (!email.value) errors.email = 'Vui lòng nhập email'
  if (!password.value) errors.password = 'Vui lòng nhập mật khẩu'

  if (!errors.email && !errors.password) {
    const { data, token, error } = await login({ email: email.value, password_hash: password.value })

    if (error) {
      if (error.statusCode === 422) {
        errors.email = error.data?.errors?.email?.[0] || ''
        errors.password = error.data?.errors?.password_hash?.[0] || ''
      } else if (error.statusCode === 401) {
        errors.email = 'Email hoặc mật khẩu không đúng'
        errors.password = 'Email hoặc mật khẩu không đúng'
      }
    } else {
      alert('Đăng nhập thành công!')
      console.log('Token:', token)
      console.log('User info:', data)
      navigateTo('/') // redirect về trang chủ
    }
  }
}
</script>
