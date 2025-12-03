<template>
  <div class="bg-[#FFFBF8]">
    <div class="p-6 space-y-10 w-full overflow-visible">

      <!-- GRID THÔNG TIN & FORM -->
      <div class="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
        <!-- LEFT -->
        <div class="grid grid-cols-2 gap-6">

          <ModulesContactCard
            icon="heroicons:home"
            title="Địa chỉ văn phòng"
            text="Công viên phần mềm Quang Trung, Quận 12, TP HCM"
          />

          <ModulesContactCard
            icon="heroicons:phone"
            title="Gọi cho chúng tôi"
            text="+84 348 706 723 +84 348 706 723"
          />

          <ModulesContactCard
            icon="heroicons:envelope"
            title="Gửi email cho chúng tôi"
            text="quanltps39861@gmail.com support@example.com"
          />

          <ModulesContactCard
            icon="heroicons:clock"
            title="Giờ mở cửa"
            text="Thứ Hai - Thứ Bảy (10:00 - 17:00) Chủ Nhật - Đóng cửa"
          />

        </div>

        <!-- RIGHT FORM -->
        <ModulesContactForm />
      </div>

      <!-- SUBSCRIBE -->
      <ModulesContactSubscribe />

    </div>

    <!-- MAP -->
    <ModulesContactMap />
  </div>
</template>
