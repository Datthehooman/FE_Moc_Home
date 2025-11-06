<template>
  <div>
    <UContainer class="lg:px-0">
      <ModulesHomeBanner1 class="mb-[55px]" />
      <ModulesHomeTitle title="Danh mục hàng đầu" />
      <div class="flex justify-between flex-wrap gap-4">
        <ModulesHomeCateCard
          v-for="room in rooms"
          :key="room.id"
          :image="room.full_image_url"
          :title="room.room_name"
          :quantity="30"
        />
      </div>
      <ModulesHomeTitle title="Sản phẩm thịnh hành" />
      <div v-if="isLoadingProducts" class="text-center py-10">
        Đang tải sản phẩm...
      </div>

      <div v-else class="flex flex-wrap justify-between items-center">
        <SharedProductCard
          v-for="product in products.slice(0, 5)"
          :key="product.product_id"
          :title="product.product_name"
          :image="product.thumbnail"
          :price="Number(product.price).toLocaleString('vi-VN')"
          :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
          :stars="product.rating"
          :badge="product.badge || 'Hot'"
        />
      </div>
      <ModulesHomeBanner2 />
      <ModulesHomeTitle title="Sản phẩm nổi bật" />
      <div v-if="isLoadingProducts" class="text-center py-10">Đang tải...</div>

      <div v-else class="flex justify-between flex-wrap mb-20">
        <SharedProductCard
          v-for="product in products.slice(5, 8)"
          :key="product.product_id"
          :big="true"
          :title="product.product_name"
          :image="product.thumbnail"
          :price="Number(product.price).toLocaleString('vi-VN')"
          :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
          :stars="product.rating"
          :badge="product.badge || 'Nổi bật'"
        />
      </div>
      <div
        class="flex justify-between items-center pt-10.5 pb-9.5 pl-[72px] pr-16 border border-success rounded-2xl mb-[55px]"
      >
        <div class="flex justify-center items-center">
          <UBadge
            class="text-white bg-secondary rounded-full size-[65px] justify-center"
            :ui="{ leadingIcon: 'size-10' }"
            icon="i-lucide-truck"
          />
          <div class="border-r border-success pr-3 pl-3.5">
            <p class="font-bold text-lg mb-3">Giao hàng miễn phí</p>
            <p class="text-sm">Đơn hàng trên 5 triệu</p>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <UBadge
            class="text-white bg-secondary rounded-full size-[65px] justify-center"
            :ui="{ leadingIcon: 'size-10' }"
            icon="i-lucide-truck"
          />
          <div class="border-r border-success pr-3 pl-3.5">
            <p class="font-bold text-lg mb-3">Giao hàng miễn phí</p>
            <p class="text-sm">Đơn hàng trên 5 triệu</p>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <UBadge
            class="text-white bg-secondary rounded-full size-[65px] justify-center"
            :ui="{ leadingIcon: 'size-10' }"
            icon="i-lucide-truck"
          />
          <div class="border-r border-success pr-3 pl-3.5">
            <p class="font-bold text-lg mb-3">Giao hàng miễn phí</p>
            <p class="text-sm">Đơn hàng trên 5 triệu</p>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <UBadge
            class="text-white bg-secondary rounded-full size-[65px] justify-center"
            :ui="{ leadingIcon: 'size-10' }"
            icon="i-lucide-truck"
          />
          <div class="pr-3 pl-3.5">
            <p class="font-bold text-lg mb-3">Giao hàng miễn phí</p>
            <p class="text-sm">Đơn hàng trên 5 triệu</p>
          </div>
        </div>
      </div>
      <ModulesHomePopularProducts :products="products" class="mb-[86px]" />
      <div class="flex justify-between items-center mb-[37px]">
        <div class="w-[410px]">
          <p class="font-bold text-secondary uppercase">
            TẠI SAO NÊN CHỌN CHÚNG TÔI
          </p>
          <p class="font-bold text-3xl pt-4">
            Chúng tôi cung cấp đồ nội thất chất lượng cao cho bạn
          </p>
        </div>
        <p class="font-medium leading-[28px] w-[410px]">
          Có nhiều nơi bán nội thất, nhưng chúng tôi tạo nên sản phẩm độc đáo
          ngay từ đầu, pha chút vui nhộn, thêm chút ngẫu hứng và quan trọng là
          luôn đáng tin cậy để bạn yên tâm lựa chọn.
        </p>
        <NuxtImg src="/Rectangle 41.png" class="w-[410px]" />
      </div>
      <div class="flex justify-between gap-8 mb-[63px]">
        <div class="flex items-start gap-6 w-1/3">
          <div
            class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"
          >
            <img src="/image 21.png" alt="Warranty icon" class="size-[55px]" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-xl mb-2">Bảo hành 3 năm</p>
            <p class="text-gray-600 leading-relaxed">
              Tất cả sản phẩm đều được bảo hành 3 năm – cam kết chất lượng, an
              tâm sử dụng lâu dài.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-6 w-1/3">
          <div
            class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"
          >
            <img src="/image 22.png" alt="Price icon" class="size-[55px]" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-xl mb-2">Giá cả phải chăng</p>
            <p class="text-gray-600 leading-relaxed">
              Sản phẩm chất lượng với mức giá phải chăng, phù hợp mọi nhu cầu và
              ngân sách.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-6 w-1/3">
          <div
            class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"
          >
            <img src="/image 23.png" alt="Delivery icon" class="size-[55px]" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-xl mb-2">Bảo hành 3 năm</p>
            <p class="text-gray-600 leading-relaxed">
              Miễn phí vận chuyển, giao hàng nhanh chóng chống tận nơi để bạn
              yên tâm mua sắm.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-[49px] relative mb-16.5">
        <div class="relative h-[538px] min-w-[630px]">
          <div
            class="absolute top-[66px] left-4 z-30 rounded-lg flex justify-center items-center bg-white w-[191px] h-[88px]"
          >
            <div
              class="bg-success size-[70px] flex justify-center items-center rounded-full mr-1.5"
            >
              <img src="/image 25.png" alt="experience" class="size-12.5" />
            </div>
            <p class="font-semibold w-[97px]">30 năm<br />Kinh nghiệm</p>
          </div>

          <img
            class="absolute top-1 -left-13.5 z-0 w-[152px] h-[137px]"
            src="/Group 90.png"
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
                <UIcon name="i-lucide-check-check" />
              </div>
              <span class="font-bold max-w-[253px]"
                >Trải nghiệm vận chuyển hợp lý</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon name="i-lucide-check-check" />
              </div>
              <span class="font-bold max-w-[253px]"
                >Giá cả cạnh tranh & Dễ dàng mua sắm</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon name="i-lucide-check-check" />
              </div>
              <span class="font-bold max-w-[253px]"
                >Thiết kế hiện đại, giá cả phải chăng</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div
                class="size-[35px] flex justify-center items-center bg-success rounded-full"
              >
                <UIcon name="i-lucide-check-check" />
              </div>
              <span class="font-bold max-w-[253px]"
                >Chúng tôi tạo ra những sản phẩm tuyệt vời</span
              >
            </div>
          </div>
          <UButton
            size="xl"
            variant="solid"
            class="relative bg-success text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
          >
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
            ></span>
            <span
              class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
            >
              <span>Khám phá thêm</span>
              <UIcon name="i-lucide-arrow-right"></UIcon>
            </span>
          </UButton>
        </div>
      </div>
    </UContainer>
    <ModulesHomeBanner3 class="mb-[118px]" />
    <UContainer class="lg:px-0">
      <div class="grid grid-cols-3 gap-[31px] text-black mb-[57px]">
        <!-- Đang giảm giá -->
        <div>
          <div
            class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"
          >
            <p class="font-semibold text-2xl">Đang giảm giá</p>
            <div class="absolute w-10.5 h-0.5 bg-secondary bottom-0" />
          </div>

          <div v-if="isLoadingProducts" class="text-center py-6">
            Đang tải...
          </div>
          <div v-else class="flex flex-col gap-6.5">
            <ModulesHomeSmallProductCard
              v-for="product in products.slice(0, 3)"
              :key="product.product_id"
              :title="product.product_name"
              :image="product.thumbnail"
              :price="Number(product.price).toLocaleString('vi-VN')"
              :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
              :stars="product.rating || 4"
            />
          </div>
        </div>

        <!-- Bán chạy nhất -->
        <div>
          <div
            class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"
          >
            <p class="font-semibold text-2xl">Bán chạy nhất</p>
            <div class="absolute w-10.5 h-0.5 bg-secondary bottom-0" />
          </div>

          <div v-if="isLoadingProducts" class="text-center py-6">
            Đang tải...
          </div>
          <div v-else class="flex flex-col gap-6.5">
            <ModulesHomeSmallProductCard
              v-for="product in products.slice(0, 3)"
              :key="product.product_id"
              :title="product.product_name"
              :image="product.thumbnail"
              :price="Number(product.price).toLocaleString('vi-VN')"
              :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
              :stars="product.rating"
            />
          </div>
        </div>

        <!-- Đánh giá cao nhất -->
        <div>
          <div
            class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"
          >
            <p class="font-semibold text-2xl">Đánh giá cao nhất</p>
            <div class="absolute w-10.5 h-0.5 bg-secondary bottom-0" />
          </div>

          <div v-if="isLoadingProducts" class="text-center py-6">
            Đang tải...
          </div>
          <div v-else class="flex flex-col gap-6.5">
            <ModulesHomeSmallProductCard
              v-for="product in products.slice(0, 3)"
              :key="product.product_id"
              :title="product.product_name"
              :image="product.thumbnail"
              :price="Number(product.price).toLocaleString('vi-VN')"
              :salePrice="Number(product.price_down).toLocaleString('vi-VN')"
              :stars="product.rating || 5"
            />
          </div>
        </div>
      </div>
    </UContainer>
    <ModulesHomeBanner4 class="mb-[65px]" />
    <UContainer class="lg:px-0">
      <div class="text-center mb-11.5">
        <p class="font-bold text-primary uppercase mb-4">THƯ VIỆN ẢNH</p>
        <p class="text-[32px] font-semibold">
          Hãy cùng xem qua <span class="text-info">Thư viện ảnh</span> của chúng
          tôi
        </p>
      </div>
      <div class="grid grid-cols-4 gap-7.5 mb-16">
        <div class="col-span-2 rounded-xl overflow-hidden relative">
          <div class="absolute top-51.5 left-[49px]">
            <UTooltip
              :delay-duration="0"
              :content="{ side: 'bottom', sideOffset: 45, align: 'start' }"
              :ui="{
                content: 'ring-0 p-0',
              }"
            >
              <div class="relative inline-flex">
                <div
                  class="absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75"
                ></div>

                <div
                  class="relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center"
                >
                  <UIcon name="i-lucide-plus" class="text-2xl" />
                </div>
              </div>
              <template #content>
                <div class="flex items-center rounded-3xl bg-white p-3">
                  <NuxtImg src="/image 10.png" class="size-[81px] mr-3" />
                  <div>
                    <p class="font-bold text-[16px] mb-1">Ghế sofa mini</p>
                    <p class="text-[16px] mb-1">
                      Giá:
                      <span class="text-[#FF0000] font-semibold text-[13px]"
                        >180.000 đ</span
                      >
                    </p>
                    <UButton
                      size="xl"
                      variant="solid"
                      class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                    >
                      <span
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
                      ></span>
                      <span
                        class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
                      >
                        <span>Mua ngay</span>
                        <UIcon name="i-lucide-arrow-right"></UIcon>
                      </span>
                    </UButton>
                  </div>
                </div>
              </template>
            </UTooltip>
          </div>

          <div class="absolute top-53.5 right-31.5">
            <UTooltip
              :delay-duration="0"
              :content="{ side: 'bottom', sideOffset: 45, align: 'start' }"
              :ui="{
                content: 'ring-0 p-0',
              }"
            >
              <div class="relative inline-flex">
                <div
                  class="absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75"
                ></div>

                <div
                  class="relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center"
                >
                  <UIcon name="i-lucide-plus" class="text-2xl" />
                </div>
              </div>
              <template #content>
                <div class="flex items-center rounded-3xl bg-white p-3">
                  <NuxtImg src="/image 10.png" class="size-[81px] mr-3" />
                  <div>
                    <p class="font-bold text-[16px] mb-1">Ghế sofa mini</p>
                    <p class="text-[16px] mb-1">
                      Giá:
                      <span class="text-[#FF0000] font-semibold text-[13px]"
                        >180.000 đ</span
                      >
                    </p>
                    <UButton
                      size="xl"
                      variant="solid"
                      class="relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                    >
                      <span
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
                      ></span>
                      <span
                        class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
                      >
                        <span>Mua ngay</span>
                        <UIcon name="i-lucide-arrow-right"></UIcon>
                      </span>
                    </UButton>
                  </div>
                </div>
              </template>
            </UTooltip>
          </div>
          <NuxtImg src="/Rectangle 52.png" class="w-full object-cover" />
        </div>
        <div class="col-span-1 rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/Rectangle 52.png"
            class="h-full object-cover relative z-0"
          />
          <div
            class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"
          >
            <div class="h-1/2 bg-success/50"></div>
            <div class="h-1/2 bg-success"></div>
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"
          >
            <div
              class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"
            >
              <UIcon name="i-lucide-plus" class="text-4xl text-success" />
            </div>
          </div>
        </div>
        <div class="col-span-1 rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/Rectangle 52.png"
            class="h-full object-cover relative z-0"
          />
          <div
            class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"
          >
            <div class="h-1/2 bg-success/50"></div>
            <div class="h-1/2 bg-success"></div>
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"
          >
            <div
              class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"
            >
              <UIcon name="i-lucide-plus" class="text-4xl text-success" />
            </div>
          </div>
        </div>

        <div class="col-span-1 rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/Rectangle 52.png"
            class="h-full object-cover relative z-0"
          />
          <div
            class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"
          >
            <div class="h-1/2 bg-success/50"></div>
            <div class="h-1/2 bg-success"></div>
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"
          >
            <div
              class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"
            >
              <UIcon name="i-lucide-plus" class="text-4xl text-success" />
            </div>
          </div>
        </div>
        <div class="col-span-1 rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/Rectangle 52.png"
            class="h-full object-cover relative z-0"
          />
          <div
            class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"
          >
            <div class="h-1/2 bg-success/50"></div>
            <div class="h-1/2 bg-success"></div>
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"
          >
            <div
              class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"
            >
              <UIcon name="i-lucide-plus" class="text-4xl text-success" />
            </div>
          </div>
        </div>
        <div class="col-span-2 rounded-xl overflow-hidden relative group">
          <NuxtImg
            src="/Rectangle 52.png"
            class="w-full relative z-0 object-cover"
          />
          <div
            class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"
          >
            <div class="h-1/2 bg-success/50"></div>
            <div class="h-1/2 bg-success"></div>
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"
          >
            <div
              class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"
            >
              <UIcon name="i-lucide-plus" class="text-4xl text-success" />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <ModulesHomeBanner5 class="mb-15.5" />
    <UContainer class="lg:px-0">
      <ModulesHomeBlog class="mb-17.5" />
      <ModulesHomeBanner6 class="mb-14.5" />
      <ModulesHomeFacebookImages class="mb-[51px]" />
    </UContainer>
  </div>
</template>
<script setup lang="ts">
  const { rooms, fetchRooms, isLoading: isLoadingRooms } = useRooms();

  const {
    products,
    isLoading: isLoadingProducts,
    fetchProducts,
  } = useProducts();
</script>
