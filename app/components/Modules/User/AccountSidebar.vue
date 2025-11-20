<template>
  <aside
    class="w-64 bg-white shadow-md rounded-r-xl p-4 flex flex-col mt-6 mb-6"
  >
    <!-- Avatar -->
    <div class="flex flex-col items-center mb-4 relative">
      <div class="relative">
        <img
          src="https://live.themewild.com/fameo/assets/img/account/02.jpg"
          alt="Avatar"
          class="w-20 h-20 rounded-full border-2 border-gray-200"
        />
      </div>
      <h2 class="mt-2 font-semibold text-gray-800">Lê Phùng Tiến Quân</h2>
      <p class="text-sm text-gray-400">quanlptps39861@gmail.com</p>
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
            <!-- ICON -->
            <UIcon :name="item.icon" class="w-5 h-5" />

            <!-- NAME -->
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore(); // <-- use store instance

  const navigate = async (path: string) => {
    if (path === "/logout") {
      await authStore.logout(); // call store logout
      router.push("/"); // redirect after logout
      alert("Đăng xuất thành công 🎉");
    } else {
      router.push(path);
    }
  };

  // Menu items
  const menuItems = [
    { name: "Thống kê", path: "/user/dashboard", icon: "heroicons:chart-bar" },
    { name: "Hồ sơ của tôi", path: "/user/profile", icon: "heroicons:user" },
    {
      name: "Danh sách đơn hàng",
      path: "/user/orders",
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
    { name: "Hỗ trợ", path: "/user/support", icon: "heroicons:lifebuoy" },
    {
      name: "Theo dõi đơn hàng",
      path: "/user/track-order",
      icon: "heroicons:truck",
    },
    {
      name: "Phương thức thanh toán",
      path: "/user/payment",
      icon: "heroicons:credit-card",
    },
    { name: "Thông báo", path: "/user/notifications", icon: "heroicons:bell" },
    {
      name: "Tin nhắn",
      path: "/user/messages",
      icon: "heroicons:chat-bubble-left-right",
    },
    { name: "Cài đặt", path: "/user/settings", icon: "heroicons:cog-6-tooth" },
    {
      name: "Đăng xuất",
      path: "/logout",
      icon: "heroicons:arrow-right-on-rectangle",
    },
  ];
</script>
