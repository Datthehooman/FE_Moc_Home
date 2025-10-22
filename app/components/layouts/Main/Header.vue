<template>
  <header
    :class="[
      'sticky top-0 z-50 flex items-center w-full transition-all duration-500 backdrop-blur-md',
      isScrolled ? 'bg-[#FFF9F3]/80 h-[60px] shadow-md' : 'bg-[#FFF9F3] h-[75px] shadow-sm'
    ]"
  >
    <div class="max-w-[85%] mx-auto flex justify-between items-center w-full px-6 transition-all duration-500">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-gray-800 transition-all duration-500">
        <NuxtImg src="/logo.png" alt="MỘC HOME" :class="isScrolled ? 'w-16 transition-all duration-500' : 'w-20 transition-all duration-500'" />
      </NuxtLink>

      <!-- Menu -->
      <nav class="flex items-center">
        <ul class="flex space-x-8 text-[16px] font-medium">
          <li><NuxtLink to="/" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Trang chủ</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Về chúng tôi</NuxtLink></li>

          <!-- Dropdown danh mục -->
          <li class="relative group">
            <button class="flex items-center gap-1 text-black hover:text-[#654538] transition-colors">
              Danh mục
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Mega menu -->
            <div class="absolute left-1/2 -translate-x-[39%] top-full w-[85vw] max-w-[1500px] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-4 p-8">
              <div class="grid grid-cols-6 gap-10 items-start">
                <!-- Cột menu -->
                <div class="col-span-4 grid grid-cols-4 gap-8">
                  <div v-for="(cat, i) in categories" :key="i">
                    <h3 class="text-[18px] font-semibold mb-7 text-[#654538]">{{ cat.title }}</h3>
                    <ul class="space-y-1">
                      <li v-for="(item, j) in cat.items" :key="j" class="group/item text-[16px] text-gray-700 hover:text-[#654538] transition-all duration-300 mb-2">
                        <a href="#" class="inline-flex items-center gap-2 relative transition-all duration-300 group-hover/item:translate-x-[6px]">
                          <span class="w-2 h-2 rounded-full bg-[#654538] opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300"></span>
                          {{ item }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- Ảnh banner -->
                <div class="col-span-2 flex justify-center items-center">
                  <NuxtImg src="https://live.themewild.com/fameo/assets/img/banner/mega-menu-banner.jpg" class="rounded-lg object-cover w-[377px] h-[200px]" alt="banner"/>
                </div>
              </div>
            </div>
          </li>

          <li><NuxtLink to="/ProductList" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Cửa hàng</NuxtLink></li>
          <li><NuxtLink to="/blog" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact" class="text-black hover:text-[#654538]" active-class="text-[#654538]">Liên hệ</NuxtLink></li>
        </ul>
      </nav>

      <!-- Tool icons -->
      <div class="flex items-center gap-4 text-[#654538] transition-all duration-500">
        <div class="relative">
          <input type="text" placeholder="Tìm kiếm..." class="border border-[#A77A5D] rounded-lg px-3 py-1.5 pr-8 text-sm focus:border-[#654538] outline-none bg-transparent"/>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#654538]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/>
          </svg>
        </div>
  <Icon name="heroicons:heart" class="w-5 h-6 cursor-pointer hover:text-[#A77A5D]" />
  <!-- Shopping bag -->
  <Icon name="heroicons:shopping-bag" class="w-5 h-5 cursor-pointer hover:text-[#A77A5D]" />
  <!-- User -->
  <div class="relative flex items-center" ref="userDropdownRef">
    <Icon name="heroicons:user" class="w-5 h-5 cursor-pointer hover:text-[#A77A5D]" @click="toggleUserDropdown" />
  <!-- Dropdown -->
  <div
    v-if="isUserDropdownOpen"
    class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 translate-y-2 transition-all duration-300"
    :class="{'opacity-100 translate-y-0': isUserDropdownOpen}"
  >
    <div class="p-4">
      <!-- Nếu đã đăng nhập -->
      <template v-if="auth.isLogged">
        <div class="text-sm text-gray-700 mb-2">Xin chào, {{ auth.authUser.user.full_name }}</div>
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
        >
          Đăng xuất
        </button>
      </template>

      <!-- Nếu chưa đăng nhập -->
      <template v-else>
        <NuxtLink to="/login" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2">
          Đăng nhập
        </NuxtLink>
        <NuxtLink
          to="/register" class="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">
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
import { ref, onMounted, onUnmounted } from 'vue'

const auth = useAuthStore()

// Header scroll
const isScrolled = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 50 }

// User dropdown
const isUserDropdownOpen = ref(false)
const userDropdownRef = ref<HTMLElement | null>(null)
const toggleUserDropdown = () => { isUserDropdownOpen.value = !isUserDropdownOpen.value }
const closeUserDropdown = () => { isUserDropdownOpen.value = false }
const logout = () => {
  auth.logout()
  closeUserDropdown()
  alert('Đăng xuất thành công 🎉') // thêm thông báo
}
  

const handleClickOutside = (e: MouseEvent) => {
  if (userDropdownRef.value && !userDropdownRef.value.contains(e.target as Node)) {
    closeUserDropdown()
  }
}

// Categories
interface Category { title: string; items: string[] }
const categories: Category[] = [
  { title: 'Phòng khách', items: ['Sofa', 'Bàn trà', 'Tủ TV', 'Ghế đơn'] },
  { title: 'Phòng ngủ', items: ['Giường', 'Tủ quần áo', 'Bàn trang điểm', 'Kệ đầu giường'] },
  { title: 'Nhà bếp', items: ['Tủ bếp', 'Bàn ăn', 'Ghế ăn', 'Phụ kiện'] },
  { title: 'Trang trí', items: ['Đèn', 'Tranh treo tường', 'Thảm', 'Decor'] }
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})

</script>
