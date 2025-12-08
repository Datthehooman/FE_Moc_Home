<script setup lang="ts">
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(async () => {
  // Lấy token từ URL (FE page)
  const token = route.query.token as string;

  if (!token) {
    router.push("/login?error=no_token");
    return;
  }

  // Lưu token vào FE (cookie + store)
  await auth.saveGoogleToken(token);

  // Redirect sau khi đã fetch user
  router.push("/");
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Đang đăng nhập Google...</p>
  </div>
</template>
