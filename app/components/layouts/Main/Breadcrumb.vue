<template>
  <section 
    class="w-full h-[150px] bg-[url('/banner-breadcumb.png')] bg-cover bg-center relative flex flex-col justify-center"
  >
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="w-[85%] mx-auto relative z-10">
      <!-- Tiêu đề lấy theo route -->
      <h1 class="text-white text-[24px] font-bold mb-2 capitalize">
        {{ pageTitle }}
      </h1>

      <!-- Breadcrumb -->
      <div class="flex items-center space-x-2 text-white text-[18px] font-medium">
        <!-- Icon Trang chủ -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m10-11v10a1 1 0 01-1 1h-5" />
        </svg>

        <NuxtLink to="/" class="hover:text-[#ffd8ad] text-[16px] transition-all duration-300 ease-in-out">Trang chủ</NuxtLink>

        <!-- Icon >> -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 5l6 7-6 7m4-14l6 7-6 7" />
        </svg>

        <!-- Tên trang hiện tại -->
        <span class="text-[#ffd8ad] text-[16px] capitalize">{{ pageTitle }}</span>
      </div>
    </div>
  </section>
</template><script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const titles = {
  login: 'Đăng nhập',
  register: 'Đăng ký',
  about: 'Giới thiệu',
  contact: 'Liên hệ',
  product: 'Sản phẩm',
  cart: 'Giỏ hàng',
  checkout: 'Thanh toán',
  ProductList: 'Cửa hàng',
  OtpVerify: 'Xác minh OTP',
  'reset-password': 'Đặt lại mật khẩu',
}

// pageTitle sẽ tự động cập nhật khi route thay đổi
const pageTitle = computed(() => {
  if (route.path.startsWith('/san-pham/')) return 'Chi tiết sản phẩm'
  return titles[route.name] || 'Trang'
})
</script>
