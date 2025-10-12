<template>
  <div>
    <LayoutsMainHeader />
    <div class="bg-[#f5f7fe]/50 dark:bg-[#0f172a]">
      <div>
        <Breadcrumb v-if="route.path !== '/'" />
        <slot />
      </div>
    </div>
    <LayoutsMainFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import LayoutsMainHeader from '~/components/layouts/Main/Header.vue'
import LayoutsMainFooter from '~/components/layouts/Main/Footer.vue'
import Breadcrumb from '~/components/layouts/Main/Breadcrumb.vue'

const route = useRoute()
</script>
