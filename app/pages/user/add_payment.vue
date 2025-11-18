<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX THÊM PHƯƠNG THỨC -->
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">Thêm phương thức thanh toán</h3>
          <hr class="border-t border-gray-200 my-4">

          <form @submit.prevent="savePayment" class="space-y-4">

            <!-- BANK DROPDOWN -->
            <div class="relative" ref="bankDropdownRef">
              <button
                @click="showBank = !showBank"
                class="h-[50px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-white cursor-pointer shadow-sm hover:shadow transition-all duration-200"
              >
                <span class="flex items-center gap-3 text-gray-700">
                  <img v-if="form.bankLogo" :src="form.bankLogo" class="w-6 h-6 object-contain" />
                  {{ form.bankName || 'Chọn ngân hàng' }}
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor"
                  class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="showBank ? 'rotate-180' : ''">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <div
                  v-if="showBank"
                  class="absolute top-[53px] left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden z-20"
                >
                  <div
                    v-for="bank in banks"
                    :key="bank.name"
                    @click="selectBank(bank)"
                    class="bank-item flex items-center gap-3"
                  >
                    <img :src="bank.logo" class="w-6 h-6 object-contain" />
                    {{ bank.name }}
                  </div>
                </div>
              </transition>
            </div>

            <!-- Tên chủ thẻ -->
            <input
              v-model="form.cardHolder"
              type="text"
              placeholder="Họ và tên chủ thẻ"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            >

            <!-- Số thẻ -->
            <input
              v-model="form.cardNumber"
              type="text"
              placeholder="Số thẻ"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            >

            <!-- BUTTONS -->
            <div class="flex items-center gap-3 pt-2">

              <NuxtLink
                to="/user/payment"
                class="px-6 py-3 bg-gray-200 rounded-[10px] text-gray-700 font-medium shadow hover:bg-gray-300 transition">
                Quay lại
              </NuxtLink>

              <button
                class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
                <span class="absolute inset-0 flex justify-center items-center">
                  <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
                </span>
                <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
                  Lưu phương thức
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
import { onClickOutside } from '@vueuse/core'

const router = useRouter()

const form = ref({
  bankName: '',
  bankLogo: '',
  cardHolder: '',
  cardNumber: ''
})

const showBank = ref(false)
const bankDropdownRef = ref(null)

const banks = [
  { name: 'Vietcombank', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_Vietcombank.svg' },
  { name: 'Techcombank', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Techcombank_logo.svg' },
  { name: 'ACB', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Asia_Commercial_Bank_logo.svg' },
  { name: 'MB Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/MB_Bank_logo.svg' },
  { name: 'VPBank', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/VPBank_logo.svg' },
  { name: 'Agribank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Agribank_logo_2021.svg' },
]

const selectBank = (bank) => {
  form.value.bankName = bank.name
  form.value.bankLogo = bank.logo
  showBank.value = false
}

onClickOutside(bankDropdownRef, () => showBank.value = false)

const formError = ref('')

const savePayment = () => {
  if (!form.value.bankName || !form.value.cardHolder || !form.value.cardNumber) {
    formError.value = 'Vui lòng nhập đầy đủ thông tin.'
    return
  }
  if (!/^[0-9]{12,19}$/.test(form.value.cardNumber)) {
    formError.value = 'Số thẻ không hợp lệ.'
    return
  }

  formError.value = ''
  alert('✅ Đã lưu phương thức thanh toán!')
  router.push('/user/payment')
}
</script>


