<template>
  <aside
    class="w-64 bg-white shadow-md rounded-r-xl p-4 flex flex-col mt-6 mb-6"
  >
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
            :class="
              route.path === item.path
                ? 'bg-[#6E4E37] text-white'
                : 'bg-white text-gray-700 hover:bg-[#6E4E37] hover:text-white'
            "
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Logout Confirmation Modal -->
    <UModal v-model:open="isLogoutModalOpen">
      <template #body>
        <div class="p-6 text-center">
          <UIcon
            name="heroicons:exclamation-triangle"
            class="w-12 h-12 text-yellow-500 mx-auto mb-4"
          />
          <h3 class="text-lg font-semibold mb-2">Xác nhận đăng xuất</h3>
          <p class="text-gray-500 mb-6">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
          </p>
          <div class="flex justify-center gap-3">
            <UButton
              color="neutral"
              variant="outline"
              @click="isLogoutModalOpen = false"
            >
              Hủy
            </UButton>
            <UButton color="error" @click="confirmLogout"> Đăng xuất </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </aside>
</template>

<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const auth = useAuth();
  const toast = useToast();

  // Logout modal state
  const isLogoutModalOpen = ref(false);

  // Computed reactive user info
  const fullName = computed(() => auth.user.value.full_name || "Người dùng");
  const email = computed(() => auth.user.value.email || "Chưa có email");

  // ================= MENU =================
  const menuItems = [
    { name: "Hồ sơ của tôi", path: "/user/profile", icon: "heroicons:user" },
    {
      name: "Danh sách đơn hàng",
      path: "/user/orders/list",
      icon: "heroicons:list-bullet",
    },
    {
      name: "Danh sách yêu thích",
      path: "/user/wishlist",
      icon: "heroicons:heart",
    },
    {
      name: "Danh sách địa chỉ",
      path: "/user/address",
      icon: "heroicons:map-pin",
    },
    // { name: "Thông báo", path: "/user/notifications", icon: "heroicons:bell" },
    {
      name: "Tin nhắn",
      path: "/user/messages",
      icon: "heroicons:chat-bubble-left-right",
    },
    {
      name: "Đăng xuất",
      path: "/logout",
      icon: "heroicons:arrow-right-on-rectangle",
    },
  ];

  // ================= NAVIGATE =================
  const navigate = async (path: string) => {
    if (path === "/logout") {
      isLogoutModalOpen.value = true;
    } else {
      router.push(path);
    }
  };

  // ================= CONFIRM LOGOUT =================
  const confirmLogout = () => {
    auth.logout();
    isLogoutModalOpen.value = false;
    router.push("/");
    toast.add({
      title: "Đăng xuất thành công 🎉",
      color: "success",
    });
  };

  // ================= FETCH PROFILE =================
  // Khi sidebar mount, nếu user rỗng và có token → fetch
  onMounted(() => {
    if (!auth.user.value.full_name && auth.tokenCookie.value) {
      auth.fetchUserProfile();
    }
  });

  // Watch token để fetch profile tự động khi login mới
  watch(
    () => auth.tokenCookie.value,
    async (newToken) => {
      if (newToken && !auth.user.value.full_name) {
        await auth.fetchUserProfile();
      }
    }
  );
</script>
