<!-- components/SearchBox.vue -->
<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-3 text-gray-700">Tìm kiếm</h3>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      placeholder="Nhập tên sản phẩm..."
      class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-[#A77A5D]/30 focus:border-[#A77A5D] outline-none"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();

  const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit("update:modelValue", value);
  };
</script>
