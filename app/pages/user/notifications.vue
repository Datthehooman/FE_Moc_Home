<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX THÔNG BÁO -->
        <section class="bg-white rounded-xl p-5 shadow">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Thông báo</h3>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
          <div class="grid grid-cols-4 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>Thông báo</div>
            <div>Ngày</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

          <!-- LIST -->
          <div class="space-y-2">
            <div
              v-for="(item, i) in paginatedNotifications"
              :key="i"
              class="grid grid-cols-4 items-center bg-[#F5F7FA] min-h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="truncate max-w-[240px]">{{ item.message }}</div>
              <div>{{ item.date }}</div>

              <!-- STATUS -->
              <div>
                <span
                  :class="{
                    'text-blue-500 bg-blue-100 px-2 py-1 rounded': !item.read,
                    'text-green-500 bg-green-100 px-2 py-1 rounded': item.read
                  }"
                >{{ item.read ? 'Đã xem' : 'Chưa xem' }}</span>
              </div>

              <!-- TOGGLE READ -->
              <div>
                <button
                  @click="toggleRead(i)"
                  class="h-[33px] px-3 flex items-center gap-2 border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black group"
                >
                  <UIcon
                    :name="item.read ? 'heroicons:eye-slash' : 'heroicons:eye'"
                    class="w-5 h-5 text-gray-500 group-hover:text-white transition"
                  />

                  <span class="text-gray-600 text-sm group-hover:text-white transition">
                    {{ item.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc' }}
                  </span>
                </button>
              </div>

            </div>
          </div>

          <!-- PHÂN TRANG -->
          <ModulesUserPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :pages-around="pagesAround"
            @prev="prevPage"
            @next="nextPage"
            @go="(p) => currentPage = p"
          />

        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref, computed } from 'vue'

const currentPage = ref(1)
const perPage = 7

const notifications = ref([
  { message: 'Giảm giá 30% cho đơn hàng hôm nay!', date: '05/10/2025', read: false },
  { message: 'Đơn hàng #MD1234 đã được giao thành công.', date: '04/10/2025', read: true },
  { message: 'Nhận mã giảm 50k cho lần mua tiếp theo!', date: '03/10/2025', read: false },
  { message: 'Chương trình ngày lễ sắp diễn ra!', date: '02/10/2025', read: true },
  { message: 'Hệ thống vừa cập nhật thành công.', date: '01/10/2025', read: false },
  { message: 'Mật khẩu của bạn đã được thay đổi.', date: '30/09/2025', read: true },
  { message: 'Nhận quà tặng miễn phí trong hôm nay!', date: '29/09/2025', read: false },
  { message: 'Điểm tích lũy của bạn đã tăng.', date: '28/09/2025', read: true },
  { message: 'Chương trình Flash Sale sắp bắt đầu.', date: '27/09/2025', read: false },
])

const totalPages = computed(() => Math.ceil(notifications.value.length / perPage))

const paginatedNotifications = computed(() =>
  notifications.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const pagesAround = computed(() => {
  let pages = []
  let p = currentPage.value
  let t = totalPages.value

  for (let i = p - 1; i <= p + 1; i++) {
    if (i > 1 && i < t) pages.push(i)
  }

  return pages
})

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

const toggleRead = (index) => {
  notifications.value[index].read = !notifications.value[index].read
}
</script>
