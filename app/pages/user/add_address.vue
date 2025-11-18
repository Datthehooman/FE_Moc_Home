<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX THÊM ĐỊA CHỈ -->
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">Thêm địa chỉ mới</h3>
          <hr class="border-t border-gray-200 my-4">

          <form @submit.prevent="saveAddress" class="space-y-4">

            <div class="grid grid-cols-2 gap-4">
              <input v-model="form.fullName" type="text" placeholder="Họ và tên"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none">
              <input v-model="form.phone" type="text" placeholder="Số điện thoại"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none">
            </div>

            <input v-model="form.address" type="text" placeholder="Địa chỉ cụ thể"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none">

            <input v-model="form.city" type="text" placeholder="Tỉnh / Thành phố"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none">

            <!-- Nút -->
            <div class="flex items-center gap-3 pt-2">

              <!-- Nút quay về -->
              <NuxtLink
                to="/user/address"
                class="px-6 py-3 bg-gray-200 rounded-[10px] text-gray-700 font-medium shadow hover:bg-gray-300 transition">
                Quay lại
              </NuxtLink>

              <!-- Nút lưu địa chỉ -->
              <button
                class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
                <span class="absolute inset-0 flex justify-center items-center">
                  <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
                </span>
                <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
                  Lưu địa chỉ
                </span>
              </button>

            </div>

            <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  fullName: '',
  phone: '',
  address: '',
  city: ''
})

const formError = ref('')

const saveAddress = () => {
  if (!form.value.fullName || !form.value.phone || !form.value.address || !form.value.city) {
    formError.value = 'Vui lòng nhập đầy đủ thông tin.'
    return
  }
  if (!/^[0-9]{9,11}$/.test(form.value.phone)) {
    formError.value = 'Số điện thoại không hợp lệ.'
    return
  }

  formError.value = ''
  alert('✅ Đã lưu địa chỉ!')

  // Quay lại danh sách
  router.push('/user/address')
}
</script>
