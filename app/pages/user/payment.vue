<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">

        <!-- PAYMENT LIST -->
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Phương thức thanh toán</h3>

            <!-- NÚT THÊM -->
            <button
              class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
            >
              <span class="absolute inset-0 flex justify-center items-center">
                <span
                  class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"
                ></span>
              </span>
              <a href="/user/add_payment">
                <span class="relative z-10 text-[15px] group-hover:text-white transition">Thêm phương thức thanh toán</span>
              </a>
            </button>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
          <div class="grid grid-cols-4 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>Thông tin thẻ</div>
            <div>Tên chủ thẻ</div>
            <div>Số thẻ</div>
            <div>Hành động</div>
          </div>

          <!-- LIST -->
          <div class="space-y-2">
            <div
              v-for="(item, i) in paginatedMethods"
              :key="i"
              class="grid grid-cols-4 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="flex items-center gap-2">
                <img :src="item.bankLogo" alt="bank" class="w-8 h-8 object-contain" />
                <span class="text-[#A77A5D] font-medium">{{ item.bankName }}</span>
              </div>

              <div>{{ item.cardHolder }}</div>

              <div>{{ maskCardNumber(item.cardNumber) }}</div>

              <!-- ACTION -->
              <div class="flex items-center gap-2">
                
                <!-- EDIT -->
                <div
                  class="group w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black"
                >
                  <UIcon
                    name="heroicons:pencil-square"
                    class="w-5 h-5 text-gray-500 group-hover:text-white transition"
                  />
                </div>

                <!-- DELETE -->
                <div
                  @click="removeMethod(i)"
                  class="group w-[34px] h-[34px] flex items-center justify-center border border-red-400 rounded-[5px] cursor-pointer transition hover:bg-red-500 hover:border-red-500"
                >
                  <UIcon
                    name="heroicons:x-mark"
                    class="w-5 h-5 text-red-500 group-hover:text-white transition"
                  />
                </div>

              </div>
            </div>
          </div>

          <!-- PAGINATION -->
          <div class="mt-5">
            <ModulesUserPagination
              :current-page="currentPage"
              :total-pages="totalPages"
              :pages-around="pagesAround"
              @prev="prevPage"
              @next="nextPage"
              @go="(p) => currentPage = p"
            />
          </div>

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

const methods = ref([
  { bankName: 'Vietcombank', bankLogo: 'https://tse1.mm.bing.net/th/id/OIP.FCOsyWba4BiGoSt5jPl1dgHaFj?pid=Api&P=0&h=220', cardHolder: 'NGUYEN VAN A', cardNumber: '4111111111111234' },
  { bankName: 'Techcombank', bankLogo: '/banks/tcb.png', cardHolder: 'TRAN THI B', cardNumber: '5222334455667788' },
  { bankName: 'ACB', bankLogo: '/banks/acb.png', cardHolder: 'PHAM MINH C', cardNumber: '4532123412345678' },
  { bankName: 'MB Bank', bankLogo: '/banks/mb.png', cardHolder: 'LE THANH D', cardNumber: '4023456765432109' },
  { bankName: 'VPBank', bankLogo: '/banks/vp.png', cardHolder: 'VU MINH E', cardNumber: '5123456789012345' },
  { bankName: 'Agribank', bankLogo: '/banks/agr.png', cardHolder: 'LAM K', cardNumber: '4111222233334444' },
])

const currentPage = ref(1)
const perPage = 5

const totalPages = computed(() => Math.ceil(methods.value.length / perPage))

const paginatedMethods = computed(() =>
  methods.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
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

const maskCardNumber = (num) => num.replace(/\d(?=\d{4})/g, "*")

const removeMethod = (index) => {
  methods.value.splice((currentPage.value - 1) * perPage + index, 1)
}
</script>
