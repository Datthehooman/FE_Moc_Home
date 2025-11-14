<template>
  <UHeader>
    <template #left>
      <NuxtImg src="/logo.png" />
      <UNavigationMenu :items="items" />
    </template>

    <template #right>
      <UInput
        color="primary"
        :highlight="true"
        trailing-icon="i-lucide-search"
        size="md"
        variant="outline"
        placeholder="Tìm kiếm..."
      />

      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-heart"
        aria-label="Sản phẩm yêu thích"
      />
      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-shopping-cart"
        aria-label="Giỏ hàng"
      />
      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-user"
        aria-label="Thông tin cá nhân"
      />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui";

  const route = useRoute();

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: "Trang chủ",
      to: "/docs/getting-started",
      active: route.path.startsWith("/docs/getting-started"),
    },
    {
      label: "Về chúng tôi",
      to: "/docs/components",
      active: route.path.startsWith("/docs/components"),
    },
    {
      label: "Tài khoản",
      to: "https://go.nuxt.com/figma-ui",
      target: "_blank",
    },
    {
      label: "Menu",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Cửa hàng",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Blog",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Liên hệ",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
  ]);
</script>
