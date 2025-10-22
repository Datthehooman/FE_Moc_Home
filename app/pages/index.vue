<template>
  <UContainer class="lg:px-0">
    <ModulesHomeTitle title="Danh mục hàng đầu" />
    <div class="flex justify-between">
      <ModulesHomeCateCard /><ModulesHomeCateCard /><ModulesHomeCateCard /><ModulesHomeCateCard /><ModulesHomeCateCard /><ModulesHomeCateCard />
    </div>
    <ModulesHomeTitle title="Sản phẩm thịnh hành" />
    <div class="flex justify-between items-center">
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
      <SharedProductCard :stars="3.5" />
    </div>
    <ModulesHomeBanner2 />
    <ModulesHomeTitle title="Sản phẩm nổi bật" />
    <div class="flex justify-between mb-20">
      <SharedProductCard :big="true" :stars="5" />
      <SharedProductCard :big="true" :stars="5" />
      <SharedProductCard :big="true" :stars="5" />
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
    <ModulesHomePopularProducts class="mb-[86px]" />
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
        Có nhiều nơi bán nội thất, nhưng chúng tôi tạo nên sản phẩm độc đáo ngay
        từ đầu, pha chút vui nhộn, thêm chút ngẫu hứng và quan trọng là luôn
        đáng tin cậy để bạn yên tâm lựa chọn.
      </p>
      <NuxtImg src="/Rectangle 41.png" class="w-[410px]" />
    </div>
    <!-- <div class="flex justify-between items-center">
      <div class="w-[407px] flex justify-between">
        <div
          class="size-20 bg-success rounded-full flex items-center justify-center"
        >
          <NuxtImg src="/image 21.png" class="size-[55px]" />
          <div class="w-[407px]">
            <p class="font-semibold text-2xl leading-[28px] mb-[9px]">
              Bảo hành 3 năm
            </p>
            <p class="font-semibold text-2xl leading-[28px]">
              Tất cả sản phẩm đều được bảo hành 3 năm – cam kết chất lượng, an
              tâm sử dụng lâu dài.
            </p>
          </div>
        </div>
      </div>
    </div> -->
  </UContainer>
</template>
<script setup lang="ts"></script>
