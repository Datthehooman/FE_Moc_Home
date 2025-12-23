<template>
  <div class="flex justify-between items-center mb-4 sm:mb-6 lg:mb-[25px]">
    <div>
      <p
        class="text-primary font-semibold text-base sm:text-xl md:text-2xl lg:text-[26px]"
      >
        {{ title || "Danh mục hàng đầu" }}
      </p>
      <div class="absolute w-10.5 h-0.5 bg-secondary" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: String;
  }>();
</script>
