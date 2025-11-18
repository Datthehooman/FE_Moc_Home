<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">

        <!-- BOX HỖ TRỢ -->
        <section class="bg-white rounded-xl p-5 shadow">

          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Hỗ trợ</h3>

            <!-- TÌM KIẾM + LỌC -->
            <div class="flex items-center gap-3">

              <!-- SEARCH -->
              <div class="h-[45px] px-4 flex items-center border border-gray-300 rounded-[10px] bg-transparent gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="w-5 h-5 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                </svg>

                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm hỗ trợ..."
                  class="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>

              <!-- FILTER TRẠNG THÁI -->
              <div class="relative">
                <button 
                  @click="showFilter = !showFilter"
                  class="h-[45px] px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-transparent cursor-pointer w-[180px]"
                >
                  <span class="text-gray-600 text-sm">
                    {{ filterStatus || 'Tất cả trạng thái' }}
                  </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div 
                  v-if="showFilter"
                  class="absolute top-[48px] left-0 w-full bg-white border border-gray-200 rounded-[10px] shadow-md overflow-hidden z-20"
                >
                  <div @click="applyFilter('')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Tất cả trạng thái</div>
                  <div @click="applyFilter('Đang chờ phản hồi')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang chờ phản hồi</div>
                  <div @click="applyFilter('Đang xử lý')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang xử lý</div>
                  <div @click="applyFilter('Đã phản hồi')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đã phản hồi</div>
                </div>
              </div>

            </div>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
          <div class="grid grid-cols-6 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>Mã</div>
            <div>Ngày gửi</div>
            <div>Nội dung</div>
            <div>Trạng thái</div>
            <div>Ưu tiên</div>
            <div>Hành động</div>
          </div>

          <!-- LIST -->
          <div class="space-y-2">
            <div
              v-for="(item, i) in paginatedSupports"
              :key="i"
              class="grid grid-cols-6 items-center bg-[#F5F7FA] min-h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="text-[#A77A5D] font-semibold cursor-pointer">{{ item.code }}</div>
              <div>{{ item.date }}</div>
              <div class="truncate max-w-[180px]">{{ item.content }}</div>

              <div>
                <span
                  :class="{
                    'text-yellow-500 bg-yellow-100 px-2 py-1 rounded': item.status === 'Đang chờ phản hồi',
                    'text-blue-500 bg-blue-100 px-2 py-1 rounded': item.status === 'Đang xử lý',
                    'text-green-500 bg-green-100 px-2 py-1 rounded': item.status === 'Đã phản hồi'
                  }"
                >{{ item.status }}</span>
              </div>

              <div>
                <span
                  :class="{
                    'text-red-500 bg-red-100 px-2 py-1 rounded': item.priority === 'Cao',
                   'text-yellow-500 bg-yellow-100 px-2 py-1 rounded': item.priority === 'Trung bình',
                    'text-gray-500 bg-gray-200 px-2 py-1 rounded': item.priority === 'Thấp'
                  }"
                >{{ item.priority }}</span>
              </div>

              <div
               class="w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
   stroke-width="1.5" stroke="currentColor"
   class="w-5 h-5 text-gray-500 group-hover:text-white transition">
   <path stroke-linecap="round" stroke-linejoin="round"
     d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 8.354 7.36 5.25 12 
     5.25c4.638 0 8.574 3.103 9.963 6.433.07.162.07.353 0 .515C20.574 
     15.646 16.637 18.75 12 18.75c-4.64 0-8.577-3.103-9.964-6.428z" />
   <path stroke-linecap="round" stroke-linejoin="round"
     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
              </div>
            </div>
          </div>

          <!-- PAGINATION -->
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

const searchQuery = ref("")
const filterStatus = ref("")
const currentPage = ref(1)
const perPage = 7
const showFilter = ref(false)

const supports = ref([
  { code: '#SP001', date: '01/10/2025', content: 'Mình muốn đổi địa chỉ nhận hàng.', status: 'Đang chờ phản hồi', priority: 'Trung bình' },
  { code: '#SP002', date: '02/10/2025', content: 'Sản phẩm bị lỗi.', status: 'Đang xử lý', priority: 'Cao' },
  { code: '#SP003', date: '03/10/2025', content: 'Cho hỏi phương thức thanh toán.', status: 'Đã phản hồi', priority: 'Thấp' },
   { code: '#SP001', date: '01/10/2025', content: 'Mình muốn đổi địa chỉ nhận hàng.', status: 'Đang chờ phản hồi', priority: 'Trung bình' },
  { code: '#SP002', date: '02/10/2025', content: 'Sản phẩm bị lỗi.', status: 'Đang xử lý', priority: 'Cao' },
  { code: '#SP003', date: '03/10/2025', content: 'Cho hỏi phương thức thanh toán.', status: 'Đã phản hồi', priority: 'Thấp' },
   { code: '#SP001', date: '01/10/2025', content: 'Mình muốn đổi địa chỉ nhận hàng.', status: 'Đang chờ phản hồi', priority: 'Trung bình' },
  { code: '#SP002', date: '02/10/2025', content: 'Sản phẩm bị lỗi.', status: 'Đang xử lý', priority: 'Cao' },
  { code: '#SP003', date: '03/10/2025', content: 'Cho hỏi phương thức thanh toán.', status: 'Đã phản hồi', priority: 'Thấp' },
])

const filteredSupports = computed(() =>
  supports.value.filter(s =>
    s.code.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (filterStatus.value === "" || s.status === filterStatus.value)
  )
)

const totalPages = computed(() => Math.ceil(filteredSupports.value.length / perPage))
const paginatedSupports = computed(() =>
  filteredSupports.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const pagesAround = computed(() => {
  let pages = []
  let p = currentPage.value
  let t = totalPages.value
  for (let i = p - 1; i <= p + 1; i++) if (i > 1 && i < t) pages.push(i)
  return pages
})

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }

const applyFilter = (val) => {
  filterStatus.value = val
  showFilter.value = false
}
</script>
