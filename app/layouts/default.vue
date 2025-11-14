<template>
  <div>
    <LayoutsMainHeader />
    <div class="bg-[#f5f7fe]/50 dark:bg-[#0f172a]">
      <div>
        <LayoutsMainBreadcrumb v-if="route.path !== '/'" />
        <slot />
      </div>
    </div>
    <LayoutsMainFooter />
  </div>
</template>

<script setup>
const route = useRoute()
</script>
