<template>
  <div class="p-5">
    <h2 class="text-lg font-bold mb-3">Token hiện tại</h2>
    <pre>{{ tokenValue }}</pre>
    <button
      @click="showToken"
      class="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Refresh Token
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useCookie } from "#app";

  const config = useRuntimeConfig();

  // Determine token name based on environment
  const tokenName = config.public.isDevelopment ? "tokenLocal" : "token";
  const tokenDomain = config.public.isDevelopment
    ? undefined
    : ".mocfurni.shop";

  const token = useCookie(tokenName, {
    path: "/",
    domain: tokenDomain,
  })?.value;
  const tokenValue = ref(token.value);

  function showToken() {
    tokenValue.value = token.value;
    console.log("Token từ cookie:", token.value);
  }
</script>
