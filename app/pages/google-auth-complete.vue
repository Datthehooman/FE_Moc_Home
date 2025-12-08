<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(() => {
  // Lấy token BE redirect về
  const token = route.query.token as string;

  if (!token) {
    router.push("/login?error=no_token");
    return;
  }

  // Lưu token
  auth.saveGoogleToken(token);

  // Chuyển về trang chủ
  router.push("/");
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Đang đăng nhập Google...</p>
  </div>
</template>
