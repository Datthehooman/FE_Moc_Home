<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-6 shadow">
          <h3 class="text-[20px] font-semibold text-gray-700 mb-4">Theo dõi đơn hàng</h3>
          <p class="text-gray-500 mb-6">
            MÃ THEO DÕI ĐƠN HÀNG: 
            <span class="font-bold text-[#6E4E37]">#28VR5K59</span>
          </p>

          <!-- Info nhỏ -->
          <div class="flex gap-4 mb-6">
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm">Giao hàng: Giao hàng nhanh</div>
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm">
              Trạng thái: <span class="font-medium">Đang kiểm tra</span>
            </div>
            <div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm">Dự kiến nhận: 27 tháng 8, 2025</div>
          </div>

          <!-- Progress Steps -->
          <div class="relative flex items-center justify-between">

            <template v-for="(step, index) in steps" :key="index">
              <!-- Icon -->
              <div class="flex flex-col items-center relative z-10">
                <div
                  :class="[
                    'flex items-center justify-center rounded-full transition-all duration-500',
                    currentStep > index ? 'w-14 h-14 bg-[#F05454]' : 'w-10 h-10 bg-gray-300'
                  ]"
                >
                  <UIcon
                    :name="step.icon"
                    :class="currentStep > index ? 'w-5 h-5 text-white' : 'w-5 h-5 text-[var(--ui-primary)]'"
                  />
                </div>
                <span class="mt-2 text-sm text-center">{{ step.title }}</span>
              </div>

              <!-- Thanh nối giữa các bước (trừ bước cuối) -->
              <div
                v-if="index < steps.length - 1"
                class="flex-1 h-[4px] mt-7 -z-0"
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
import { ref } from 'vue'

const currentStep = ref(3) // bước hiện tại

const steps = [
  { title: 'Đơn hàng đã xác nhận', icon: 'heroicons:check-circle' },
  { title: 'Đang xử lý đơn hàng', icon: 'heroicons:cog-6-tooth' },
  { title: 'Kiểm tra chất lượng', icon: 'heroicons:clipboard-check' },
  { title: 'Sản phẩm đã được gửi đi', icon: 'heroicons:truck' },
  { title: 'Sản phẩm đã được giao', icon: 'heroicons:home' }
]
</script>
