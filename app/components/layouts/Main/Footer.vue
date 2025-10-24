<template>
  <UFooter
    :ui="{
      container: 'lg:p-0',
      root: 'bg-[url(/footer.png)] bg-cover bg-center min-h-[526px] px-4 md:px-[95px] pb-[30px] pt-[60px]',
      top: 'py-0 -mt-10',
      bottom: 'py-0 -mt-20',
    }"
    class="text-white"
  >
    <template #top>
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <!-- First column with logo -->
          <div>
            <div class="flex justify-center">
              <img src="/logo2.png" alt="MỘC HOME1" class="w-[117px]" />
            </div>
            <ul class="space-y-4 font-medium">
              <li class="text-sm">
                Chúng tôi mang đến nội thất đẹp, bền và tinh tế, giúp không gian
                sống của bạn trở nên hiện đại và tiện nghi hơn.
              </li>
              <li class="text-sm flex items-center gap-2.5">
                <div
                  class="size-8 bg-primary rounded-full flex justify-center items-center"
                >
                  <UIcon name="i-lucide-phone" />
                </div>
                +84 348 706 723
              </li>
              <li class="text-sm flex items-center gap-2.5">
                <div
                  class="size-8 bg-primary rounded-full flex justify-center items-center"
                >
                  <UIcon name="i-lucide-map-pin" />
                </div>
                Công viên Quang Trung, HCM
              </li>
              <li class="text-sm flex items-center gap-2.5">
                <div
                  class="size-8 bg-primary rounded-full flex justify-center items-center"
                >
                  <UIcon name="i-lucide-mail" />
                </div>
                mochome@gmail.com
              </li>
              <li class="text-sm flex items-center gap-2.5">
                <div
                  class="size-8 bg-primary rounded-full flex justify-center items-center"
                >
                  <UIcon name="i-lucide-clock-3" />
                </div>
                Thứ hai - bảy (7:00 am - 5:00 pm)
              </li>
            </ul>
          </div>

          <!-- Middle columns -->
          <div
            v-for="(column, index) in columns.slice(0, -1)"
            :key="index"
            class="pt-[17px]"
          >
            <h3 class="text-lg font-semibold mb-[17px]">{{ column.label }}</h3>
            <div class="flex items-center mb-6">
              <div class="h-[2px] w-2.5 bg-secondary mr-1"></div>
              <div class="h-[2px] w-[27px] bg-primary"></div>
            </div>
            <ul class="space-y-4 font-medium">
              <li v-for="(link, linkIndex) in column.children" :key="linkIndex">
                <ULink
                  v-if="link.to"
                  :to="link.to"
                  class="text-sm hover:text-default transition-colors text-white"
                >
                  {{ link.label }}
                </ULink>
                <span v-else class="text-sm">
                  {{ link.label }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Last column with payment methods -->
          <div class="pt-[17px]">
            <h3 class="text-lg font-semibold mb-[17px]">
              {{ columns[3]?.label || "" }}
            </h3>
            <div class="flex items-center mb-6">
              <div class="h-[2px] w-2.5 bg-secondary mr-1"></div>
              <div class="h-[2px] w-[27px] bg-primary"></div>
            </div>
            <div class="space-y-4 font-medium">
              <p class="text-sm">
                {{ columns[3]?.children?.[0]?.label || "" }}
              </p>
              <p class="text-sm">
                {{ columns[3]?.children?.[1]?.label || "" }}
              </p>
              <!-- Payment method images -->
              <div class="flex items-center gap-1.5 pt-2">
                <img src="/visa.png" alt="Visa" class="h-8 object-contain" />
                <img
                  src="/mcard.png"
                  alt="MasterCard"
                  class="h-8 object-contain"
                />
                <img
                  src="/am.png"
                  alt="American Express"
                  class="h-8 object-contain"
                />
                <img
                  src="/dnetwork.png"
                  alt="Discover"
                  class="h-8 object-contain"
                />
                <img
                  src="/paypal.png"
                  alt="PayPal"
                  class="h-8 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </template>
    <template #bottom>
      <UContainer>
        <!-- Divider -->
        <div class="h-px bg-white/20 mb-6"></div>

        <!-- Bottom content -->
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Copyright/License -->
          <p class="text-sm font-medium">
            © Bản quyền 2025 <span class="text-success">Mộc Home</span>
          </p>

          <!-- Social links -->
          <div class="flex items-center gap-4">
            <p>Theo dõi:</p>
            <ULink
              to="https://facebook.com"
              target="_blank"
              class="text-white hover:text-primary transition-colors"
            >
              <UIcon name="i-lucide-facebook" class="size-5" />
            </ULink>
            <ULink
              to="https://instagram.com"
              target="_blank"
              class="text-white hover:text-primary transition-colors"
            >
              <UIcon name="i-lucide-instagram" class="size-5" />
            </ULink>
            <ULink
              to="https://twitter.com"
              target="_blank"
              class="text-white hover:text-primary transition-colors"
            >
              <UIcon name="i-tabler-brand-tiktok" class="size-5" />
            </ULink>
            <ULink
              to="https://youtube.com"
              target="_blank"
              class="text-white hover:text-primary transition-colors"
            >
              <UIcon name="i-lucide-youtube" class="size-5" />
            </ULink>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
  interface Link {
    label: string;
    to?: string;
  }

  interface Column {
    label: string;
    children: Link[];
  }

  const columns: Column[] = [
    {
      label: "Liên kết nhanh",
      children: [
        { label: "Giới thiệu", to: "/gioi-thieu" },
        { label: "Thông tin giao hàng", to: "/thong-tin-giao-hang" },
        { label: "Liên hệ", to: "/lien-he" },
        { label: "Cập nhật tin tức", to: "/tin-tuc" },
        { label: "Lời chứng thực", to: "/loi-chung-thuc" },
        { label: "Điều khoản dịch vụ", to: "/dieu-khoan" },
        { label: "Chính sách bảo mật", to: "/chinh-sach-bao-mat" },
      ],
    },
    {
      label: "Duyệt danh mục",
      children: [
        { label: "Phòng ngủ", to: "/phong-ngu" },
        { label: "Văn phòng", to: "/van-phong" },
        { label: "Phòng khách", to: "/phong-khach" },
        { label: "Phòng tắm", to: "/phong-tam" },
        { label: "Trang trí", to: "/trang-tri" },
        { label: "Nhà bếp", to: "/nha-bep" },
        { label: "Ghế bành", to: "/ghe-banh" },
      ],
    },
    {
      label: "Trung tâm Hỗ trợ",
      children: [
        { label: "Câu hỏi thường gặp", to: "/faq" },
        { label: "Cách mua hàng", to: "/cach-mua-hang" },
        { label: "Trung tâm Hỗ trợ", to: "/ho-tro" },
        { label: "Theo dõi đơn hàng", to: "/theo-doi-don-hang" },
        { label: "Chính sách Đổi trả", to: "/doi-tra" },
        { label: "Đối tác của chúng tôi", to: "/doi-tac" },
        { label: "Sơ đồ trang web", to: "/site-map" },
      ],
    },
    {
      label: "Các hình thức thanh toán",
      children: [
        {
          label: "Bạn có thể dễ dàng thanh toán khi đặt hàng",
        },
        { label: "Chúng tôi chấp nhận:" },
      ],
    },
  ];
</script>
