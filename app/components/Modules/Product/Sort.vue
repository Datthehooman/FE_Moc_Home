<template>
  <div class="mb-4">
    <div class="flex items-center justify-start bg-white rounded-[10px] shadow-sm px-4 py-3 border border-gray-200 w-full">
      <span class="text-gray-600 mr-2 text-sm">Sắp xếp theo:</span>

      <div class="relative inline-block text-left">
        <!-- Nút chính -->
        <button
          @click="isOpen = !isOpen"
          class="border border-gray-300 rounded-[10px] px-3 py-1.5 w-[150px] bg-white flex justify-between items-center hover:border-gray-400 transition text-sm"
        >
          <span>{{ selected }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 ml-1 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25L12 15.75L4.5 8.25" />
          </svg>
        </button>

        <!-- Menu xổ xuống -->
        <transition name="fade">
          <ul
            v-if="isOpen"
            class="absolute left-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-[10px] shadow-lg z-50 overflow-hidden"
          >
            <li
              v-for="option in options"
              :key="option"
              @click="select(option)"
              class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition"
            >
              {{ option }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const options = [
  'Mặc định',
  'Tên A-Z',
  'Tên Z-A',
  'Giá tăng dần',
  'Giá giảm dần'
]

const selected = ref(props.modelValue)
const isOpen = ref(false)

const select = (option: string) => {
  selected.value = option
  emit('update:modelValue', option)
  isOpen.value = false
}

watch(() => props.modelValue, (val) => selected.value = val)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
