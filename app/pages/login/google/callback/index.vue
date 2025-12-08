<script setup lang="ts">
import { onMounted } from "vue";
const router = useRouter();
const auth = useAuthStore();

onMounted(() => {
  // Chuẩn hoá URL: đổi "/?" thành "?"
  let href = window.location.href.replace('/?', '?');

  // Tạo URL object sau khi sửa
  const url = new URL(href);
  const token = url.searchParams.get("token");

  if (token) {
    auth.saveGoogleToken(token);
    router.push("/");
  } else {
    router.push("/login?error=google_failed");
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Đang đăng nhập Google...</p>
  </div>
</template>
