<template>
  <div class="bg-white shadow-md rounded-xl p-6 space-y-4">
    <h2 class="text-xl font-semibold">Liên hệ</h2>
    <p class="text-gray-600 text-sm">
      Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi của bạn. Liên hệ ngay để được tư vấn chi tiết.
    </p>

    <form class="space-y-3">
      <input
        type="text"
        placeholder="Tên"
        class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"
      />
      <input
        type="text"
        placeholder="Tiêu đề"
        class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"
      />
      <textarea
        placeholder="Viết tin nhắn của bạn..."
        class="w-full h-[150px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none resize-none"
      ></textarea>
<button
  type="submit"
  class="text-[15px] rounded-[10px]  hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
  style="background-color: #FED8AE; color: #4B2E05; height: 40px; width: 150px; line-height: 80px; padding: 0;"
>
  Gửi tin nhắn
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 3l16.5 9-16.5 9 3-9-3-9z"
    />
  </svg>
</button>






    </form>
  </div>
</template>

<script setup>
</script>
