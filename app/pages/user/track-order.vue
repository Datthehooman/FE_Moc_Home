<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%] ">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-6 shadow">
          
          <!-- Title -->
          <h3 class="text-[22px] font-semibold text-gray-700 mb-2">
            Theo dõi đơn hàng
          </h3>

          <p class="text-gray-600 mb-6">
            MÃ THEO DÕI ĐƠN HÀNG:
            <span class="font-bold text-[#6E4E37]">#28VR5K59</span>
          </p>

          <!-- Info nhỏ -->
          <div class="flex flex-wrap gap-3 mb-8">
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm text-gray-700">
              Giao hàng: Giao hàng nhanh
            </div>
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm text-gray-700">
              Trạng thái: <span class="font-semibold">Đang kiểm tra</span>
            </div>
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm text-gray-700">
              Dự kiến nhận: 27 tháng 8, 2025
            </div>
          </div>

          <!-- Progress Steps -->
          <div class="relative flex items-center justify-between mt-10">

            <template v-for="(step, index) in steps" :key="index">

              <!-- ICON + TEXT -->
              <div class="flex flex-col items-center relative z-10">
                
                <!-- Icon -->
                <div
                  :class="[
                    'flex items-center justify-center rounded-full transition-all duration-500 shadow-md',
                    currentStep > index
                      ? 'w-14 h-14 bg-[#F05454] shadow-[0_0_12px_rgba(240,84,84,0.5)]'
                      : 'w-11 h-11 bg-gray-200'
                  ]"
                >
                  <UIcon
                    :name="step.icon"
                    :class="[
                      'transition-all duration-300',
                      currentStep > index
                        ? 'w-6 h-6 text-white'
                        : 'w-5 h-5 text-gray-500'
                    ]"
                  />
                </div>

                <!-- Title -->
                <span
                  class="mt-3 text-[13px] font-medium text-gray-700 text-center max-w-[120px]"
                >
                  {{ step.title }}
                </span>
              </div>

              <!-- Thanh nối -->
              <div
                v-if="index < steps.length - 1"
                class="flex-1 h-[3px] mx-2 rounded-full transition-all duration-500"
                :class="currentStep > index ? 'bg-[#F05454]' : 'bg-gray-300'"
              ></div>

            </template>

          </div>
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

const currentStep = ref(3) // Bước hiện tại

// FIX icon đầy đủ + CHUẨN heroicons
const steps = [
  { title: 'Đơn hàng đã xác nhận', icon: 'heroicons:check-circle' },
  { title: 'Đang xử lý đơn hàng', icon: 'heroicons:cog-6-tooth' },
  { title: 'Kiểm tra chất lượng', icon: 'heroicons:clipboard-document-check' }, // FIX ở đây
  { title: 'Sản phẩm đã được gửi đi', icon: 'heroicons:truck' },
  { title: 'Sản phẩm đã được giao', icon: 'heroicons:home' }
]
</script>
