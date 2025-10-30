<template>
  <section
    class="relative w-full flex justify-center items-center py-5"
  >
    <div class="relative max-w-[1200px] w-full rounded-2xl overflow-hidden">
      <img
        src="/banner-contact.png"
        alt="sofa"
        class="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      <div
        class="relative bg-black/40 w-full min-h-[260px] flex flex-col items-center justify-center gap-6 text-white text-center px-6 py-10"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-semibold">
            NHẬN PHIẾU GIẢM GIÁ LÊN ĐẾN 20%
          </h2>
          <p class="text-sm md:text-base mt-2 opacity-90">
            Theo dõi để nhận bảng tin mới nhất
          </p>
        </div>

        <!-- FORM -->
        <div class="relative w-full max-w-[500px]">
          <input
            type="email"
            placeholder="Email của bạn"
            class="w-full h-[55px] pl-6 pr-[160px] text-[15px] text-gray-700 outline-none bg-white rounded-[25px] shadow-md"
          />
          <button
            type="submit"
            class="absolute top-1/2 right-[-30px] -translate-y-1/2 bg-[#FED8AE] text-[#4B2E05] font-medium flex items-center justify-center gap-2 w-[140px] h-[50px] rounded-[25px] shadow-lg z-10 hover:shadow-xl hover:-translate-y-[55%] transition-all duration-300"
          >
            Theo dõi
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
        </div>
      </div>
    </div>
  </section>
</template>
