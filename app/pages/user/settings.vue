<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX XÓA TÀI KHOẢN -->
        <section class="bg-white rounded-xl p-5 shadow">
          <h3 class="font-semibold text-gray-700 text-[20px]">Xóa tài khoản</h3>
          <hr class="border-t border-gray-200 my-4">

          <form @submit.prevent="deleteAccount" class="space-y-4">

            <!-- REASON DROPDOWN -->
            <div class="relative" ref="reasonDropdownRef">
              <button
                @click="showReason = !showReason"
                type="button"
                class="h-[50px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-white cursor-pointer shadow-sm hover:shadow transition-all duration-200"
              >
                <span class="text-gray-700">
                  {{ selectedReason || 'Chọn lý do xóa tài khoản' }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor"
                  class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="showReason ? 'rotate-180' : ''">
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
                  v-if="showReason"
                  class="absolute top-[53px] left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden z-20"
                >
                  <div
                    v-for="item in reasons"
                    :key="item.value"
                    @click="selectReason(item)"
                    class="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </transition>
            </div>

            <!-- BTN XÓA -->
         <button
  class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
>
  <span class="absolute inset-0 flex justify-center items-center">
    <span class="w-1 h-1 bg-red-600 rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
  </span>
  <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
    Xóa tài khoản
  </span>
</button>


            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

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
import { onClickOutside } from '@vueuse/core'

const selectedReason = ref('')
const showReason = ref(false)
const error = ref('')

const reasonDropdownRef = ref(null)
onClickOutside(reasonDropdownRef, () => showReason.value = false)

const reasons = [
  { label: 'Không sử dụng nữa', value: 'khong-su-dung' },
  { label: 'Lo ngại về bảo mật', value: 'bao-mat' },
  { label: 'Khác', value: 'khac' },
]

const selectReason = (item) => {
  selectedReason.value = item.label
  showReason.value = false
}

const deleteAccount = () => {
  if (!selectedReason.value) {
    error.value = 'Vui lòng chọn lý do xóa tài khoản.'
    return
  }
  error.value = ''
  // TODO: Gọi API xóa tài khoản
  alert(`🗑️ Tài khoản của bạn đã được xóa! Lý do: ${selectedReason.value}`)
}
</script>
