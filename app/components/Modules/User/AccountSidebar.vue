<template>
  <aside class="w-64 bg-white shadow-md rounded-r-xl p-4 flex flex-col mt-6 mb-6">
    <!-- Avatar -->
    <div class="flex flex-col items-center mb-4 relative">
      <div class="relative">
        <img
          src="https://nagawa.vn/wp-content/uploads/2025/11/avt-avatar-fb-mac-dinh.jpg"
          alt="Avatar"
          class="w-20 h-20 rounded-full border-2 border-gray-200 object-cover"
        />
      </div>

      <h2 class="mt-2 font-semibold text-gray-800">{{ fullName }}</h2>
      <p class="text-sm text-gray-400">{{ email }}</p>
    </div>

    <hr class="border-t border-gray-200 mb-4" />

    <!-- Menu -->
    <nav class="flex-1">
      <ul class="space-y-2">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          @click="navigate(item.path)"
          class="rounded-[10px] cursor-pointer"
        >
          <div
            class="flex items-center gap-3 px-3 py-2 rounded-[10px] transition-colors duration-200"
            :class="route.path === item.path
              ? 'bg-[#6E4E37] text-white'
              : 'bg-white text-gray-700 hover:bg-[#6E4E37] hover:text-white'"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

// Nếu user chưa có info, fetch profile luôn
onMounted(async () => {
  if (!authStore.user.full_name) {
    try {
      const profile = await authStore.fetchUserProfile();
      if (profile) authStore.user = profile;
    } catch (err) {
      console.log("Fetch user failed:", err);
    }
  }
});

// Computed reactive, tự update khi store thay đổi
const fullName = computed(() => authStore.user.full_name || "Người dùng");
const email = computed(() => authStore.user.email || "Chưa có email");

// Menu sidebar
const menuItems = [
  { name: "Hồ sơ của tôi", path: "/user/profile", icon: "heroicons:user" },
  { name: "Danh sách đơn hàng", path: "/user/orders/list", icon: "heroicons:list-bullet" },
  { name: "Danh sách yêu thích", path: "/user/wishlist", icon: "heroicons:heart" },
  { name: "Danh sách địa chỉ", path: "/user/address", icon: "heroicons:map-pin" },
  { name: "Thông báo", path: "/user/notifications", icon: "heroicons:bell" },
  { name: "Tin nhắn", path: "/user/messages", icon: "heroicons:chat-bubble-left-right" },
  { name: "Đăng xuất", path: "/logout", icon: "heroicons:arrow-right-on-rectangle" },
];

// Điều hướng menu
const navigate = async (path: string) => {
  if (path === "/logout") {
    await authStore.logout();
    router.push("/");
    toast.add({
      title: "Đăng xuất thành công 🎉",
      color: "success",
    });
  } else {
    router.push(path);
  }
};
</script>
