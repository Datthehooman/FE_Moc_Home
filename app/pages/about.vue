<template>
  <div>
    <UContainer class="lg:px-0">
      <div
        class="grid grid-cols-2 gap-[49px] relative mb-16.5 pt-[100px] pb-[100px]"
      >
        <div class="relative h-[538px] min-w-[630px]">
          <div
            class="absolute top-[66px] left-4 z-30 rounded-lg flex justify-center items-center bg-white w-[191px] h-[88px]"
          >
            <div
              class="bg-success size-[70px] flex justify-center items-center rounded-full mr-1.5"
            >
              <UIcon
                name="i-heroicons-bolt-20-solid"
                class="size-12.5 text-white"
              />
            </div>
            <p class="font-semibold w-[97px]">2000 năm<br />Kinh nghiệm</p>
          </div>

          <img
            class="absolute top-1 -left-13.5 z-0 w-[152px] h-[137px]"
            src="/Group 90.png"
            alt="Decorative group"
          />
          <img
            src="/Rectangle 42.png"
            alt="Blue armchair"
            class="absolute top-[43px]"
          />
          <img
            src="/Rectangle 44.png"
            alt="white shelf"
            class="absolute top-0 right-0"
          />
          <img
            src="/Rectangle 43.png"
            alt="white box"
            class="absolute bottom-0 right-0"
          />
        </div>
        <div class="flex flex-col">
          <p class="font-bold text-primary text- uppercase mb-4">
            VỀ CHÚNG TÔI
          </p>
          <h2 class="text-3xl font-bold mb-4 text-black">
            Chúng tôi mang đến nội thất
            <span class="text-info">chất lượng, tốt nhất</span> cho bạn.
          </h2>
          <p class="text-black mb-6">
            Chúng tôi là văn bản chuẩn mực kể từ khi một thợ in vô danh lấy một
            galley chữ và xáo trộn nó để tạo ra một cuốn sách mẫu chữ. Nó đã tồn
            tại không chỉ năm năm mà còn qua nhiều bước nhảy vọt vào điện tử mà
            về cơ bản vẫn giữ nguyên được sự hài hước được tiềm vào.
          </p>
          <div class="grid grid-cols-2 gap-4 mb-8 text-black">
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-white"
                />
              </div>
              <span class="font-bold max-w-[253px]"
                >Trải nghiệm vận chuyển hợp lý</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-white"
                />
              </div>
              <span class="font-bold max-w-[253px]"
                >Giá cả cạnh tranh & Dễ dàng mua sắm</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-white"
                />
              </div>
              <span class="font-bold max-w-[253px]"
                >Thiết kế hiện đại, giá cả phải chăng</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-white"
                />
              </div>
              <span class="font-bold max-w-[253px]"
                >Chúng tôi tạo ra những sản phẩm tuyệt vời</span
              >
            </div>
          </div>
          <UButton
            size="xl"
            variant="solid"
            class="relative bg-success text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit cursor-pointer"
          >
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
            ></span>
            <span
              class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
            >
              <span>Khám phá thêm</span>
              <UIcon name="i-heroicons-arrow-right-20-solid"></UIcon>
            </span>
          </UButton>
        </div>
      </div>
    </UContainer>
    <div
      class="font-sans min-h-screen relative flex flex-col items-center p-4 sm:p-0 bg-white"
    >
      <section
        class="w-full relative z-10 overflow-hidden flex flex-col items-center bg-[#F5E7D5] pt-16 pb-20"
      >
        <div class="absolute inset-0 z-0 pointer-events-none">
          <div
            class="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-br from-white/60 to-yellow-200/50 transform rotate-45"
          ></div>
          <div
            class="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-tl from-[#E8C59A]/60 to-[#F5E7D5]/60 transform -rotate-45"
          ></div>
        </div>

        <div class="relative z-10 w-full max-w-7xl px-4">
          <div class="text-center mb-12">
            <p
              class="text-xl text-amber-900/70 uppercase tracking-widest mb-2 font-medium"
            >
              Lời Chứng Thực
            </p>
            <h2 class="text-4xl sm:text-5xl text-amber-900">
              Những gì khách hàng của chúng tôi nói
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              class="bg-white p-6 rounded-xl shadow-xl relative transform transition duration-300 hover:shadow-2xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#F5E7D5] to-transparent transform translate-x-1 translate-y-1 rounded-xl -z-10"
              ></div>
              <div class="flex items-center mb-5">
                <img
                  src="/avatar.png"
                  alt="Ảnh khách hàng 1"
                  class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#E8C59A]"
                />
                <div>
                  <p class="font-bold text-lg text-amber-900">
                    Lê Phùng Tiến Quân
                  </p>
                  <p class="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-5">
                Nội thất ở đây đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô
                tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất
                đáng để tin tưởng và lựa chọn lâu dài.
              </p>
              <div class="text-yellow-500 text-lg">
                <UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" />
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow-xl relative transform transition duration-300 hover:shadow-2xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#F5E7D5] to-transparent transform translate-x-1 translate-y-1 rounded-xl -z-10"
              ></div>
              <div class="flex items-center mb-5">
                <img
                  src="/avatar.png"
                  alt="Ảnh khách hàng 2"
                  class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#E8C59A]"
                />
                <div>
                  <p class="font-bold text-lg text-amber-900">
                    Lê Phùng Tiến Quân
                  </p>
                  <p class="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-5">
                Nội thất ở đây đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô
                tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất
                đáng để tin tưởng và lựa chọn lâu dài.
              </p>
              <div class="text-yellow-500 text-lg">
                <UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" />
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow-xl relative transform transition duration-300 hover:shadow-2xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#F5E7D5] to-transparent transform translate-x-1 translate-y-1 rounded-xl -z-10"
              ></div>
              <div class="flex items-center mb-5">
                <img
                  src="/avatar.png"
                  alt="Ảnh khách hàng 3"
                  class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#E8C59A]"
                />
                <div>
                  <p class="font-bold text-lg text-amber-900">
                    Lê Phùng Tiến Quân
                  </p>
                  <p class="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-5">
                Nội thất ở đây đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô
                tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất
                đáng để tin tưởng và lựa chọn lâu dài.
              </p>
              <div class="text-yellow-500 text-lg">
                <UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" />
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow-xl relative transform transition duration-300 hover:shadow-2xl"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#F5E7D5] to-transparent transform translate-x-1 translate-y-1 rounded-xl -z-10"
              ></div>
              <div class="flex items-center mb-5">
                <img
                  src="/avatar.png"
                  alt="Ảnh khách hàng 4"
                  class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#E8C59A]"
                />
                <div>
                  <p class="font-bold text-lg text-amber-900">
                    Lê Phùng Tiến Quân
                  </p>
                  <p class="text-sm text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-5">
                Nội thất ở đây đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô
                tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất
                đáng để tin tưởng và lựa chọn lâu dài.
              </p>
              <div class="text-yellow-500 text-lg">
                <UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" /><UIcon
                  name="i-heroicons-star-20-solid"
                /><UIcon name="i-heroicons-star-20-solid" />
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-10 space-x-3">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-900"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-900/50"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-900/50"></span>
          </div>
        </div>
      </section>

      <section
        class="w-full relative z-10 flex flex-col items-center bg-[#FDF8F0] pt-16 pb-20"
      >
        <div class="relative z-10 w-full max-w-7xl px-4">
          <div class="text-center mb-16">
            <p
              class="text-xl text-amber-900/70 uppercase tracking-widest mb-2 font-medium"
            >
              Đội Ngũ Của Chúng Tôi
            </p>
            <h2 class="text-4xl sm:text-5xl text-amber-900">
              Gặp gỡ đội ngũ chuyên gia của chúng tôi
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              class="bg-white p-4 pt-0 rounded-xl shadow-lg border-t-8 border-transparent transition duration-300 hover:shadow-xl hover:border-amber-900/50"
            >
              <div class="mb-4 bg-[#EED7C8] rounded-t-xl overflow-hidden">
                <img
                  src="/member1.jpg"
                  alt="Ảnh thành viên 1"
                  class="w-full h-80 object-cover object-top rounded-t-lg"
                />
              </div>

              <div class="text-center">
                <p class="font-bold text-xl text-amber-900 mt-2">
                  Bùi Nguyên Đạt
                </p>
                <p class="text-md text-gray-600 mb-4">Good General Knowledge</p>

                <div class="flex justify-center space-x-3 pb-2">
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                  >
                    <UIcon name="i-lucide-facebook" class="text-lg" />
                  </a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                  >
                    <UIcon name="i-lucide-instagram" class="text-lg" />
                  </a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                  >
                    <UIcon name="i-lucide-github" class="text-lg" />
                  </a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                  >
                    <UIcon name="i-lucide-youtube" class="text-lg" />
                  </a>
                </div>
              </div>
            </div>

            <div
              class="bg-white p-4 pt-0 rounded-xl shadow-lg border-t-8 border-transparent transition duration-300 hover:shadow-xl hover:border-amber-900/50"
            >
              <div class="mb-4 bg-[#EADCCB] rounded-t-xl overflow-hidden">
                <img
                  src="/member2.jpg"
                  alt="Ảnh thành viên 2"
                  class="w-full h-80 object-cover object-top rounded-t-lg"
                />
              </div>
              <div class="text-center">
                <p class="font-bold text-xl text-amber-900 mt-2">
                  Lê Phùng Tiến Quân
                </p>
                <p class="text-md text-gray-600 mb-4">Good Research</p>
                <div class="flex justify-center space-x-3 pb-2">
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-facebook" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-instagram" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-github" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-youtube" class="text-lg"
                  /></a>
                </div>
              </div>
            </div>

            <div
              class="bg-white p-4 pt-0 rounded-xl shadow-lg border-t-8 border-transparent transition duration-300 hover:shadow-xl hover:border-amber-900/50"
            >
              <div class="mb-4 bg-[#D1C6BB] rounded-t-xl overflow-hidden">
                <img
                  src="/member3.jpg"
                  alt="Ảnh thành viên 3"
                  class="w-full h-80 object-cover object-top rounded-t-lg"
                />
              </div>
              <div class="text-center">
                <p class="font-bold text-xl text-amber-900 mt-2">
                  Huỳnh Anh Quốc
                </p>
                <p class="text-md text-gray-600 mb-4">Good Morning</p>
                <div class="flex justify-center space-x-3 pb-2">
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-facebook" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-instagram" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-github" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-youtube" class="text-lg"
                  /></a>
                </div>
              </div>
            </div>

            <div
              class="bg-white p-4 pt-0 rounded-xl shadow-lg border-t-8 border-transparent transition duration-300 hover:shadow-xl hover:border-amber-900/50"
            >
              <div class="mb-4 bg-[#EED7C8] rounded-t-xl overflow-hidden">
                <img
                  src="/member4.jpg"
                  alt="Ảnh thành viên 4"
                  class="w-full h-80 object-cover object-top rounded-t-lg"
                />
              </div>
              <div class="text-center">
                <p class="font-bold text-xl text-amber-900 mt-2">
                  Đỗ Thành Nhựt
                </p>
                <p class="text-md text-gray-600 mb-4">Good Leadership</p>
                <div class="flex justify-center space-x-3 pb-2">
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-facebook" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-instagram" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-github" class="text-lg"
                  /></a>
                  <a
                    href="#"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-[#EADCCB] text-amber-900 hover:bg-amber-900 hover:text-white transition-colors"
                    ><UIcon name="i-lucide-youtube" class="text-lg"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div
      class="font-sans min-h-screen relative flex flex-col items-center bg-[#FDF8F0]"
    >
      <section
        class="w-full relative z-10 flex flex-col items-center pt-16 pb-20 bg-[#FDF8F0]"
      >
        <div
          class="w-full max-w-7xl rounded-xl shadow-lg p-8 mb-16 mx-4"
          style="background-color: #f8efe4"
        >
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div class="flex flex-col items-center">
              <div
                class="w-14 h-14 flex items-center justify-center rounded-full bg-[#E4C7A7] text-amber-900 mb-2"
              >
                <UIcon name="i-lucide-truck" class="text-2xl" />
              </div>
              <p class="font-bold text-lg text-amber-900">Giao hàng miễn phí</p>
              <p class="text-sm text-gray-600">Đơn hàng trên 5 triệu</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="w-14 h-14 flex items-center justify-center rounded-full bg-[#E4C7A7] text-amber-900 mb-2"
              >
                <UIcon name="i-lucide-undo-2" class="text-2xl" />
              </div>
              <p class="font-bold text-lg text-amber-900">Nhận hoàn tiền</p>
              <p class="text-sm text-gray-600">Trả hàng trong vòng 30 ngày</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="w-14 h-14 flex items-center justify-center rounded-full bg-[#E4C7A7] text-amber-900 mb-2"
              >
                <UIcon name="i-lucide-shield-check" class="text-2xl" />
              </div>
              <p class="font-bold text-lg text-amber-900">Uy tín</p>
              <p class="text-sm text-gray-600">Thanh toán an toàn 100%</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="w-14 h-14 flex items-center justify-center rounded-full bg-[#E4C7A7] text-amber-900 mb-2"
              >
                <UIcon name="i-lucide-headphones" class="text-2xl" />
              </div>
              <p class="font-bold text-lg text-amber-900">Hỗ trợ 24/7</p>
              <p class="text-sm text-gray-600">Hãy gọi cho chúng tôi</p>
            </div>
          </div>
        </div>
      </section>

      <div class="bg-stone-100 p-8 md:pt-16 lg:p-16">
        <div
          class="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16"
        >
          <div class="text-gray-500 flex items-center space-x-1">
            <span class="text-3xl font-serif italic">Ingoude</span>
            <span class="text-sm">company</span>
          </div>

          <div class="text-gray-600">
            <span class="text-3xl font-serif">ginyard</span>
          </div>

          <div class="text-gray-500 text-center">
            <span class="text-4xl font-serif italic tracking-wider"
              >ingoude</span
            >
            <div class="text-xs tracking-widest uppercase">Company</div>
          </div>

          <div class="text-gray-700 text-center">
            <span class="text-3xl font-sans font-bold uppercase">velvet.</span>
            <div class="text-xs tracking-widest uppercase">cosmetics</div>
          </div>

          <div class="text-gray-700 text-center">
            <span
              class="text-3xl font-sans font-extrabold uppercase tracking-widest"
              >habur</span
            >
            <div class="text-xs tracking-widest uppercase">furniture</div>
          </div>

          <div class="text-gray-700 text-center">
            <span class="text-3xl font-sans font-extrabold lowercase"
              >coconut.</span
            >
            <div class="text-xs tracking-widest uppercase">cosmetics</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-20">
      <p class="font-semibold text-[30px] mb-[29px] text-center p-8">
        Facebook <span class="text-primary">@MộcHome</span>
      </p>
      <UCarousel
        v-slot="{ item }"
        :items="items"
        :slides-to-scroll="1"
        :autoplay="{ delay: 2000 }"
        :ui="{
          container: 'gap-4', 
          item: 'basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
        }"
      >
        <div class="size-[250px] rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/blog 1.png"
            class="w-full h-full object-cover relative z-0"
          />

          <div
            class="absolute inset-0 -translate-x-full bg-black/25 group-hover:translate-x-0 transition-transform duration-500 z-10"
          ></div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div
              class="size-[40px] rounded-full bg-primary text-primary overflow-hidden relative"
            >
              <UIcon
                name="i-uil-facebook-f"
                class="size-10 text-white absolute -bottom-1 left-0.5"
              />
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const items = [
    "https://picsum.photos/468/468?random=1",
    "https://picsum.photos/468/468?random=2",
    "https://picsum.photos/468/468?random=3",
    "https://picsum.photos/468/468?random=4",
    "https://picsum.photos/468/468?random=5",
    "https://picsum.photos/468/468?random=6",
    "https://picsum.photos/468/468?random=1",
    "https://picsum.photos/468/468?random=2",
    "https://picsum.photos/468/468?random=3",
    "https://picsum.photos/468/468?random=4",
    "https://picsum.photos/468/468?random=5",
    "https://picsum.photos/468/468?random=6",
  ];
</script>
