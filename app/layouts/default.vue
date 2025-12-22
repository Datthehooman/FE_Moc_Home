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
    <!-- Chat mini luôn hiển thị trừ login & register -->
    <LayoutsMainChatMiniBox v-if="!['/login', '/register','/checkout','/cart'].includes(route.path)" />
  </div>
</template>

<script setup>
const route = useRoute()
</script>
