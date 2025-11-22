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

  let token = useCookie("tokenLocal")?.value;

  if (!token) {
    token = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    })?.value;
  }
  const tokenValue = ref(token.value);

  function showToken() {
    tokenValue.value = token.value;
    console.log("Token từ cookie:", token.value);
  }
</script>
