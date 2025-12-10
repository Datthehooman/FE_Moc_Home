<template>
  <header
    :class="[
      'sticky top-0 z-50 flex items-center w-full transition-all duration-500 backdrop-blur-md',
      isScrolled ? 'bg-[#FFF9F3]/80 h-[60px] shadow-md' : 'bg-[#FFF9F3] h-[75px] shadow-sm',
    ]"
  >
    <div class="w-full max-w-[85%] lg:max-w-[90%] mx-auto flex justify-between items-center px-4 lg:px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-gray-800 transition-all duration-500">
        <NuxtImg
          src="/logo.png"
          alt="MỘC HOME"
          :class="isScrolled ? 'w-16 transition-all duration-500' : 'w-20 transition-all duration-500'"
        />
      </NuxtLink>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center">
        <ul class="flex space-x-8 text-[16px] font-medium">
          <li><NuxtLink to="/" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Trang chủ</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Về chúng tôi</NuxtLink></li>

          <!-- Dropdown danh mục -->
          <li class="relative group">
            <button class="flex items-center gap-1 text-black hover:text-[#654538] transition-colors">
              Danh mục
              <UIcon name="heroicons:chevron-down" class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180"/>
            </button>
            <div class="absolute left-1/2 -translate-x-[35%] top-full w-[85vw] max-w-[1200px] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-4 p-8">
              <div class="grid grid-cols-6 gap-10 items-start">
                <div class="col-span-4 grid grid-cols-3 gap-8">
                  <div v-for="(cat, i) in categories" :key="i">
                    <h3 class="ml-4 text-[18px] font-semibold mb-3 text-[#654538]">{{ cat.title }}</h3>
                    <ul class="space-y-1">
                      <li v-for="(item, j) in cat.items" :key="j" class="group/item text-[16px] text-gray-700 hover:text-[#654538] transition-all duration-300 mb-2">
                        <NuxtLink
                          :to="`/san-pham/${item.slug}`"
                          class="inline-flex items-center gap-2 relative transition-all duration-300 group-hover/item:translate-x-[6px]"
                        >
                          <span class="w-2 h-2 rounded-full bg-[#654538] opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300"></span>
                          {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-span-2 flex justify-center items-center">
                  <NuxtImg src="https://live.themewild.com/fameo/assets/img/banner/mega-menu-banner.jpg" class="rounded-lg object-cover w-[377px] h-[200px]" alt="banner"/>
                </div>
              </div>
            </div>
          </li>

          <li><NuxtLink to="/ProductList" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Cửa hàng</NuxtLink></li>
          <li><NuxtLink to="/articles" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Articles</NuxtLink></li>
          <li><NuxtLink to="/contact" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Liên hệ</NuxtLink></li>
        </ul>
      </nav>

      <!-- Tool icons + Search + User -->
      <div class="flex items-center gap-4 text-[#654538] transition-all duration-500">
        <!-- Desktop Search -->
        <div class="relative hidden lg:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            v-model="searchQuery"
            @keydown.enter="goSearch"
            class="border border-[#A77A5D] rounded-lg px-3 py-1.5 pr-8 text-sm focus:border-[#654538] outline-none bg-transparent"
          />
          <UIcon name="heroicons:magnifying-glass" class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#654538]" />
        </div>

        <!-- Mobile Search -->
        <div class="relative flex items-center lg:hidden">
          <input
            v-show="isSearchOpen"
            type="text"
            placeholder="Tìm kiếm..."
            v-model="searchQuery"
            @keydown.enter="goSearch"
            ref="searchInputRef"
            class="border border-[#A77A5D] rounded-lg px-3 py-1.5 pr-8 text-sm focus:border-[#654538] outline-none bg-transparent transition-all duration-300 absolute right-0"
            :class="isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'"
          />
          <button @click="toggleSearch" class="hover:text-[#A77A5D] transition-colors relative z-10">
            <UIcon :name="isSearchOpen ? 'heroicons:x-mark' : 'heroicons:magnifying-glass'" class="w-5 h-5 mt-1 mr-2" />
          </button>
        </div>

        <!-- Icons -->
        <div class="flex items-center gap-4" :class="isSearchOpen ? 'hidden' : 'flex lg:flex'">
          <!-- Wishlist -->
          <button @click="goWishlist" class="hover:text-[#A77A5D]">
            <UIcon name="heroicons:heart" class="w-5 h-6 cursor-pointer" />
          </button>

          <!-- Cart -->
          <NuxtLink to="/cart" class="hover:text-[#A77A5D]">
            <UIcon name="heroicons:shopping-bag" class="w-5 h-5 cursor-pointer" />
          </NuxtLink>

          <!-- User -->
          <div class="relative flex items-center" ref="userDropdownRef">
            <button @click="toggleUserDropdown" class="hover:text-[#A77A5D]">
              <UIcon name="heroicons:user" class="w-5 h-5 cursor-pointer" />
            </button>

            <div
              v-if="isUserDropdownOpen"
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300"
              :class="{ 'opacity-100 translate-y-0': isUserDropdownOpen, 'opacity-0 translate-y-2': !isUserDropdownOpen }"
            >
              <div class="p-4">
                <template v-if="isLogged">
                  <NuxtLink to="/user/profile" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2">Tài khoản của tôi</NuxtLink>
                  <a v-if="authStore.user.role === '1'" href="https://admin.mocfurni.shop" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2">Đi đến trang admin</a>
                  <button @click="logout" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg text-red-600">Đăng xuất</button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2">Đăng nhập</NuxtLink>
                  <NuxtLink to="/register" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">Đăng ký</NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const isLogged = computed(() => authStore.isLogged);


const getToken = () => authStore.activeToken;



// Scroll header
const isScrolled = ref(false);
const handleScroll = () => { isScrolled.value = window.scrollY > 50; };

// Search
const isSearchOpen = ref(false);
const searchQuery = ref("");
const searchInputRef = ref<HTMLInputElement | null>(null);
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (isSearchOpen.value) nextTick(() => searchInputRef.value?.focus());
  else searchQuery.value = "";
};
const goSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/ProductList", query: { search: searchQuery.value.trim() } });
    isSearchOpen.value = false;
  }
};

// User dropdown
const isUserDropdownOpen = ref(false);
const userDropdownRef = ref<HTMLElement | null>(null);
const toggleUserDropdown = () => { isUserDropdownOpen.value = !isUserDropdownOpen.value; };
const closeUserDropdown = () => { isUserDropdownOpen.value = false; };

// Logout
const logout = async () => {
  await authStore.logout();
  closeUserDropdown();
  toast.add({ title: "🎉 Đăng xuất thành công!", icon: "heroicons:check-circle", timeout: 3000, position: "top-right", style: "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);", iconColor: "#ffffff" });
  router.push("/");
};

// Wishlist
const goWishlist = () => {
  if (!authStore.isLogged) {
    toast.add({ title: "Vui lòng đăng nhập để xem danh sách yêu thích", icon: "heroicons:exclamation-circle", timeout: 3000, position: "top-right", style: "color:white; font-weight:600;", iconColor: "#ffffff", color: "error" });
    router.push("/login");
  } else router.push("/user/wishlist");
};

// Click outside
const handleClickOutside = (e: MouseEvent) => {
  if (userDropdownRef.value && !userDropdownRef.value.contains(e.target as Node)) closeUserDropdown();
};

// Categories
interface Category { title: string; items: { id: number; name: string; slug: string }[]; }
const categories = ref<Category[]>([]);

const fetchCategoriesAndProducts = async () => {
  try {
    const token = getToken();
    const [catRes, prodRes] = await Promise.all([
      fetch("https://api.mocfurni.shop/api/client/category", { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
      fetch("https://api.mocfurni.shop/api/client/products", { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
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
          .map((p) => ({ id: p.product_id, name: p.product_name, slug: p.slug }));
        return { title: cat.category_name, items };
      })
      .filter((c) => c.items.length > 0)
      .slice(0, 3);
  } catch (err) { console.error("❌ Error fetching categories/products:", err); }
};

// Mounted
onMounted(async () => {
  await authStore.fetchUser(); // check cookie/token
  fetchCategoriesAndProducts();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
});

// Watch login/logout để render lại menu hoặc fetch data
watch(() => authStore.isLogged, async (logged) => {
  if (logged) await fetchCategoriesAndProducts();
  else categories.value = [];
});
</script>
