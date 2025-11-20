<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🧩 Test API Products</h1>

    <div v-if="loading">⏳ Đang tải...</div>
    <div v-if="error" class="text-red-500">❌ {{ error }}</div>

    <pre v-if="rawData" class="bg-gray-100 p-4 rounded overflow-x-auto"
      >{{ rawData }}
    </pre>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";

  const rawData = ref("");
  const loading = ref(false);
  const error = ref("");

  onMounted(async () => {
    loading.value = true;
    try {
      const res = await fetch("https://api.mocfurni.shop/api/client/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      rawData.value = JSON.stringify(json, null, 2);
      console.log("📦 API RAW RESPONSE:", json);
    } catch (err: any) {
      error.value = err.message;
      console.error("❌ API FETCH ERROR:", err);
    } finally {
      loading.value = false;
    }
  });
</script>
