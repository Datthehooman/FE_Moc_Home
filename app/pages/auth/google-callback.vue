<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const auth = useAuthStore();

  // FE nhận token do BE redirect về: ?token=xxxx
  const token = route.query.token as string;

  if (token) {
    // Lưu token vào store + cookie
    auth.saveGoogleToken(token);

    // Điều hướng về trang chủ
    router.push("/");
  } else {
    // Không có token => lỗi
    router.push("/login?error=google_failed");
  }
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Đang đăng nhập Google...</p>
  </div>
</template>
