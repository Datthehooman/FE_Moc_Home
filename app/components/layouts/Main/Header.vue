<template>
  <header
    :class="[
      'sticky top-0 z-50 flex items-center w-full transition-all duration-500 backdrop-blur-md',
      isScrolled
        ? 'bg-[#FFF9F3]/80 h-[60px] shadow-md'
        : 'bg-[#FFF9F3] h-[75px] shadow-sm',
    ]"
  >
    <div
      class="max-w-[85%] mx-auto flex justify-between items-center w-full px-6 transition-all duration-500"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-bold text-lg text-gray-800 transition-all duration-500"
      >
        <NuxtImg
          src="/logo.png"
          alt="MỘC HOME"
          :class="
            isScrolled
              ? 'w-16 transition-all duration-500'
              : 'w-20 transition-all duration-500'
          "
        />
      </NuxtLink>

      <!-- Menu -->
      <nav class="flex items-center">
        <ul class="flex space-x-8 text-[16px] font-medium">
          <li>
            <NuxtLink
              to="/"
              class="text-black hover:text-[#654538]"
              active-class="text-[#654538]"
              >Trang chủ</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="text-black hover:text-[#654538]"
              active-class="text-[#654538]"
              >Về chúng tôi</NuxtLink
            >
          </li>

          <!-- Dropdown danh mục -->
          <li class="relative group">
            <button
              class="flex items-center gap-1 text-black hover:text-[#654538] transition-colors"
            >
              Danh mục
              <UIcon
                name="heroicons:chevron-down"
                class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            <!-- Mega menu -->
            <div
              class="absolute left-1/2 -translate-x-[35%] top-full w-[85vw] max-w-[1200px] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-4 p-8"
            >
              <div class="grid grid-cols-6 gap-10 items-start">
                <div class="col-span-4 grid grid-cols-3 gap-8">
                  <div v-for="(cat, i) in categories" :key="i">
                    <h3
                      class="ml-4 text-[18px] font-semibold mb-3 text-[#654538]"
                    >
                      {{ cat.title }}
                    </h3>
                    <ul class="space-y-1">
                      <li
                        v-for="(item, j) in cat.items"
                        :key="j"
                        class="group/item text-[16px] text-gray-700 hover:text-[#654538] transition-all duration-300 mb-2"
                      >
                        <NuxtLink
                          :to="`/san-pham/${item.slug}`"
                          class="inline-flex items-center gap-2 relative transition-all duration-300 group-hover/item:translate-x-[6px]"
                        >
                          <span
                            class="w-2 h-2 rounded-full bg-[#654538] opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300"
                          ></span>
                          {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-span-2 flex justify-center items-center">
                  <NuxtImg
                    src="https://live.themewild.com/fameo/assets/img/banner/mega-menu-banner.jpg"
                    class="rounded-lg object-cover w-[377px] h-[200px]"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
          </li>

          <li>
            <NuxtLink
              to="/ProductList"
              class="text-black hover:text-[#654538]"
              active-class="text-[#654538]"
              >Cửa hàng</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/blog"
              class="text-black hover:text-[#654538]"
              active-class="text-[#654538]"
              >Blog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="text-black hover:text-[#654538]"
              active-class="text-[#654538]"
              >Liên hệ</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <!-- Tool icons + Search + User -->
      <div
        class="flex items-center gap-4 text-[#654538] transition-all duration-500"
      >
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            v-model="searchQuery"
            @keydown.enter="goSearch"
            class="border border-[#A77A5D] rounded-lg px-3 py-1.5 pr-8 text-sm focus:border-[#654538] outline-none bg-transparent"
          />
          <UIcon
            name="heroicons:magnifying-glass"
            class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#654538]"
          />
        </div>

        <!-- Wishlist -->
        <div @click="goWishlist">
          <UIcon
            name="heroicons:heart"
            class="w-5 h-6 cursor-pointer hover:text-[#A77A5D]"
          />
        </div>

        <!-- Cart -->
        <NuxtLink to="/cart">
          <UIcon
            name="heroicons:shopping-bag"
            class="w-5 h-5 cursor-pointer hover:text-[#A77A5D]"
          />
        </NuxtLink>

        <!-- User -->
        <div class="relative flex items-center" ref="userDropdownRef">
          <UIcon
            name="heroicons:user"
            class="w-5 h-5 cursor-pointer hover:text-[#A77A5D]"
            @click="toggleUserDropdown"
          />

          <div
            v-if="isUserDropdownOpen"
            class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 translate-y-2 transition-all duration-300"
            :class="{ 'opacity-100 translate-y-0': isUserDropdownOpen }"
          >
            <div class="p-4">
              <!-- Nếu đã đăng nhập -->
              <template v-if="isLogged">
                <NuxtLink
                  to="/user/dashboard"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2"
                >
                  Tài khoản của tôi
                </NuxtLink>
                <a
                  v-if="auth.user.value.role"
                  href="https://admin.mocfurni.shop"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2"
                >
                  Đi đến trang admin
                </a>

                <button
                  @click="logout"
                  class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg text-red-600"
                >
                  Đăng xuất
                </button>
              </template>

              <!-- Nếu chưa đăng nhập -->
              <template v-else>
                <NuxtLink
                  to="/login"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2"
                >
                  Đăng nhập
                </NuxtLink>
                <NuxtLink
                  to="/register"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                >
                  Đăng ký
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  const auth = useAuth();
  const router = useRouter();

  // Reactive isLogged
  const isLogged = auth.isLogged;

  // Scroll header
  const isScrolled = ref(false);
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  // User dropdown
  const isUserDropdownOpen = ref(false);
  const userDropdownRef = ref<HTMLElement | null>(null);
  const toggleUserDropdown = () => {
    isUserDropdownOpen.value = !isUserDropdownOpen.value;
  };
  const closeUserDropdown = () => {
    isUserDropdownOpen.value = false;
  };
  const logout = async () => {
    await auth.logout();
    closeUserDropdown();
    alert("Đăng xuất thành công 🎉");
    router.push("/");
  };
  const goWishlist = () => {
    if (!isLogged.value) {
      alert("Vui lòng đăng nhập để xem danh sách yêu thích 🎯");
      router.push("/login");
    } else {
      router.push("/user/wishlist");
    }
  };

  // Click ngoài dropdown
  const handleClickOutside = (e: MouseEvent) => {
    if (
      userDropdownRef.value &&
      !userDropdownRef.value.contains(e.target as Node)
    )
      closeUserDropdown();
  };

  // Categories + products
  interface Category {
    title: string;
    items: { id: number; name: string; slug: string }[];
  }
  const categories = ref<Category[]>([]);
  const fetchCategoriesAndProducts = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("https://api.mocfurni.shop/api/client/category"),
        fetch("https://api.mocfurni.shop/api/client/products"),
      ]);

      const catJson = await catRes.json();
      const prodJson = await prodRes.json();

      const categoriesData = catJson?.result?.data || [];
      const productsData = prodJson?.result?.data || [];

      categories.value = categoriesData
        .map((cat) => {
          const items = productsData
            .filter((p) => Number(p.category_id) === cat.id)
            .slice(0, 4)
            .map((p) => ({
              id: p.product_id,
              name: p.product_name,
              slug: p.slug,
            }));

          return {
            title: cat.category_name,
            items,
          };
        })
        .filter((c) => c.items.length > 0) // remove empty categories
        .slice(0, 3); // limit to 3 categories
    } catch (error) {
      console.error("❌ Error fetching categories/products:", error);
    }
  };
  // Search
  const searchQuery = ref("");
  const goSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({
        path: "/ProductList",
        query: { search: searchQuery.value.trim() },
      });
    }
  };

  // Mounted / unmounted
  onMounted(() => {
    fetchCategoriesAndProducts();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleClickOutside);
  });
</script>
