<template>
  <UContainer class="lg:px-0 pt-16.5 flex justify-between">
    <div class="flex-1">
      <NuxtImg src="/Blog 2.png" class="w-full h-auto rounded-md mb-[23px]" />
      <div class="flex justify-between mb-[27px]">
        <div class="flex gap-7.5">
          <UButton
            variant="link"
            size="xs"
            color="primary"
            icon="i-lucide-circle-user-round"
            label="Lê Phùng Tiến Quân"
            :ui="{
              base: 'hover:!text-black',
              leadingIcon: '!text-primary !size-3',
            }"
            class="text-black font-semibold"
          /><UButton
            variant="link"
            size="xs"
            color="primary"
            icon="i-lucide-messages-square"
            label="3.2k Bình luận"
            :ui="{
              leadingIcon: '!text-primary !size-3', // Force icon color (use !important with !)
            }"
            class="text-black cursor-pointer font-semibold"
          /><UButton
            variant="link"
            size="xs"
            color="primary"
            icon="i-lucide-thumbs-up"
            label="1.4k thích"
            :ui="{
              leadingIcon: '!text-primary !size-3', // Force icon color (use !important with !)
            }"
            class="text-black cursor-pointer font-semibold"
          />
        </div>
        <UButton
          variant="link"
          size="xs"
          color="primary"
          icon="i-lucide-share-2"
          label="Chia sẻ"
          :ui="{
            leadingIcon: '!size-3', // Force icon color (use !important with !)
          }"
          class="text-black cursor-pointer font-semibold"
        />
      </div>
      <h1 class="font-semibold text-[32px]">
        Xu hướng nội thất 2025: Tối giản nhưng vẫn tinh tế
      </h1>
      <MdPreview :id="id" :modelValue="text" />
    </div>
    <div class="w-[410px]"></div>
  </UContainer>
</template>

<script setup lang="ts">
  import { MdPreview, MdCatalog } from "md-editor-v3";
  import "md-editor-v3/lib/preview.css";

  const id = "preview-only";
  const text =
    ref(`Trong những năm gần đây, phong cách nội thất tối giản (minimalism) đang dần trở thành lựa chọn ưu tiên của nhiều gia đình trẻ. Không chỉ mang đến sự gọn gàng, phong cách này còn giúp tối ưu không gian, tạo cảm giác thoáng đãng và hiện đại. Theo các chuyên gia nội thất, năm 2025 sẽ tiếp tục chứng kiến sự lên ngôi của vật liệu tự nhiên như gỗ, đá, mây tre kết hợp cùng kim loại nhẹ. Đây là sự pha trộn giữa truyền thống và hiện đại, vừa gần gũi, vừa bền vững.

Ngoài ra, xu hướng "nội thất xanh" cũng được dự đoán phát triển mạnh. Việc sử dụng vật liệu thân thiện môi trường, kết hợp cùng cây xanh trong nhà không chỉ nâng cao tính thẩm mỹ mà còn mang lại sự cân bằng, thư giãn cho gia chủ. Nhiều thương hiệu nội thất lớn cũng đã bắt đầu chú trọng hơn đến yếu tố tái chế và giảm thiểu rác thải trong sản xuất.

> "Thiết kế nội thất không chỉ tạo nên một ngôi nhà đẹp, mà còn xây dựng nên lối sống và giá trị của con người."  
> **— Steve Jobs**

Một điểm đáng chú ý khác là sự phát triển của nội thất thông minh. Từ bàn làm việc tích hợp sạc không dây, tủ quần áo cảm biến đèn, đến ghế sofa có thể tùy chỉnh tư thế... tất cả đều hướng đến mục tiêu nâng cao trải nghiệm sống, đáp ứng nhu cầu tiện nghi ngày càng cao của người tiêu dùng.

| ![Phòng khách hiện đại](/Blog%201.png) | ![Phòng khách hiện đại](/Blog%201.png) |
|:---:|:---:|

Với sự thay đổi này, ngành nội thất không chỉ dừng lại ở chức năng cơ bản, mà còn trở thành yếu tố thể hiện phong cách sống và cá tính riêng của mỗi người. Đầu tư cho nội thất giờ đây không đơn thuần là trang trí, mà còn là cách tạo dựng một không gian sống cân bằng, tiện nghi và bền vững.
`);
  const scrollElement = ref("html");
</script>
<style scoped>
  #preview-only {
    @apply bg-[#FFFBF8];
  }
</style>
