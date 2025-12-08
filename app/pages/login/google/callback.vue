<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(async () => {
  let href = window.location.href.replace("/?", "?");
  const url = new URL(href);

  // Lấy code Google
  const code = url.searchParams.get("code");

  if (!code) {
    router.push("/login?error=no_code");
    return;
  }

  try {
    // FE GỌI BE để đổi code -> token
    const res: any = await $fetch(
      "https://api.mocfurni.shop/api/client/login/google/callback",
      {
        method: "GET",
        params: { code },
      }
    );

    const token = res?.data?.access_token;

    if (!token) {
      router.push("/login?error=no_token");
      return;
    }

    // Lưu token
    auth.saveGoogleToken(token);

    router.push("/");
  } catch (err) {
    console.error("Google callback error:", err);
    router.push("/login?error=callback_failed");
  }
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Đang đăng nhập Google...</p>
  </div>
</template>
