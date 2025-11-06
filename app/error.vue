<!-- pages/404.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#FFF8F3] p-6 text-center">
    <!-- Hình ảnh -->
    <img
      src="/error.png" 
      alt="404 Not Found"
      class="w-[405px] h-[330px] object-cover mb-6"
    />

    <!-- Tiêu đề -->
    <h1 class="text-[32px] font-bold text-gray-800 mb-3">OMG... Không tìm thấy trang!</h1>

    <!-- Mô tả -->
    <p class="text-[15px] text-gray-600 mb-6">
      Trang bạn đang tìm kiếm không tìm thấy có thể là do nó không tồn tại hoặc đã bị xóa.
    </p>

    <!-- Nút quay về trang chủ -->
    <NuxtLink
      to="/"
      class="px-6 py-3 bg-[#F7C59F] text-[#6E4E37] font-semibold rounded-lg shadow hover:bg-[#E8B58C] transition"
    >
      Quay về trang chủ
    </NuxtLink>
  </div>
</template>
