<template>
  <UHeader>
    <template #left>
      <NuxtImg src="/logo.png" />
      <UNavigationMenu :items="items" />
    </template>

    <template #right>
      <UInput
        color="primary"
        :highlight="true"
        trailing-icon="i-lucide-search"
        size="md"
        variant="outline"
        placeholder="Tìm kiếm..."
      />

      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-heart"
        aria-label="Sản phẩm yêu thích"
      />
      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-shopping-cart"
        aria-label="Giỏ hàng"
      />
      <UButton
        color="primary"
        variant="ghost"
        to="https://github.com/nuxt/ui"
        icon="i-lucide-user"
        aria-label="Thông tin cá nhân"
      />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
<<<<<<< HEAD
  const auth = useAuth();
  const router = useRouter();

  // Reactive isLogged
  const isLogged = ref(auth.isLogged.value);
  watchEffect(() => {
    isLogged.value = auth.isLogged.value;
  });

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
=======
  import type { NavigationMenuItem } from "@nuxt/ui";

  const route = useRoute();

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: "Trang chủ",
      to: "/docs/getting-started",
      active: route.path.startsWith("/docs/getting-started"),
    },
    {
      label: "Về chúng tôi",
      to: "/docs/components",
      active: route.path.startsWith("/docs/components"),
    },
    {
      label: "Tài khoản",
      to: "https://go.nuxt.com/figma-ui",
      target: "_blank",
    },
    {
      label: "Menu",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Cửa hàng",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Blog",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
    {
      label: "Liên hệ",
      to: "https://github.com/nuxt/ui/releases",
      target: "_blank",
    },
  ]);
>>>>>>> 41b8537d79da7bc1f9880b29500e03873ebe6546
</script>
