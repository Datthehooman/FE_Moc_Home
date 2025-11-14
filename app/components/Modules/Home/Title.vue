<template>
  <div class="flex justify-between mb-[25px]">
    <div>
      <p class="text-primary font-semibold text-[26px]">
        {{ title || "Danh mục hàng đầu" }}
      </p>
      <div class="absolute w-10.5 h-0.5 bg-secondary" />
    </div>
    <UButton
      variant="link"
      label="xem thêm"
      trailing-icon="i-lucide-chevrons-right"
      class="text-accent text-info cursor-pointer"
    />
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    title?: String;
  }>();
</script>
