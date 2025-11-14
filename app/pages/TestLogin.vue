<template>
  <div class="p-5 max-w-md mx-auto">
    <h2 class="text-lg font-bold mb-3">Demo Login & Show Token</h2>

    <div class="mb-3">
      <label class="block mb-1">Email:</label>
      <input v-model="email" type="text" class="border px-2 py-1 w-full" />
    </div>

    <div class="mb-3">
      <label class="block mb-1">Password:</label>
      <input v-model="password" type="password" class="border px-2 py-1 w-full" />
    </div>

    <button @click="handleLogin" class="px-4 py-2 bg-blue-500 text-white rounded">
      Login
    </button>

    <div class="mt-5">
      <h3 class="font-semibold mb-1">Token hiện tại:</h3>
      <pre>{{ tokenValue || 'Chưa có token' }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { login, tokenCookie } = useAuth()

const email = ref('quanlptps39861@gmail.com') // thử email của bạn
const password = ref('tienquan1234')               // thử password của bạn
const tokenValue = ref(tokenCookie.value)

// tự động update tokenValue khi cookie thay đổi
watch(tokenCookie, (newVal) => {
  tokenValue.value = newVal
})

async function handleLogin() {
  try {
    const response = await login({ email: email.value, password_hash: password.value })
    console.log('Login response:', response)
    console.log('Token sau login:', tokenCookie.value)
  } catch (err) {
    console.error('Login lỗi:', err)
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
