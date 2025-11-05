<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6">

        <!-- DANH SÁCH ĐỊA CHỈ -->
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Danh sách địa chỉ</h3>

            <!-- NÚT THÊM ĐỊA CHỈ -->
            <button
              class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
            >
              <span class="absolute inset-0 flex justify-center items-center">
                <span
                  class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"
                ></span>
              </span>
              <a href="/user/add_address">
              <span class="relative z-10 text-[15px] group-hover:text-white transition">Thêm địa chỉ</span></a>
            </button>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <!-- HEADER -->
          <div class="grid grid-cols-5 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>Tên</div>
            <div>Địa chỉ</div>
            <div>Email</div>
            <div>Số điện thoại</div>
            <div>Hành động</div>
          </div>

          <!-- LIST -->
          <div class="space-y-2">
            <div
              v-for="(item, i) in paginatedAddresses"
              :key="i"
              class="grid grid-cols-5 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"
            >
              <div class="text-[#A77A5D] font-medium">{{ item.name }}</div>
              <div>{{ item.address }}</div>
              <div>{{ item.email }}</div>
              <div>{{ item.phone }}</div>

              <!-- HÀNH ĐỘNG -->
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
    @click="removeAddress(i)"
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
import { ref, computed } from 'vue'

const addresses = ref([
  { name: 'Nguyễn Văn A', address: '123 Nguyễn Trãi, Q.1, TP.HCM', email: 'a@gmail.com', phone: '0987654321' },
  { name: 'Trần Thị B', address: '56 Lê Lợi, Q.3, TP.HCM', email: 'b@yahoo.com', phone: '0931123123' },
  { name: 'Phạm Minh C', address: '88 Võ Văn Tần, Q.10, TP.HCM', email: 'c@outlook.com', phone: '0944556677' },
  { name: 'Lê Thanh D', address: '10 Cách Mạng, Q. Tân Bình, TP.HCM', email: 'd@gmail.com', phone: '0912345678' },
  { name: 'Vũ Minh E', address: '35 Hai Bà Trưng, Q.1, TP.HCM', email: 'e@gmail.com', phone: '0988899988' },
  { name: 'Trịnh Tân F', address: '98 Nguyễn Du, Q.5, TP.HCM', email: 'f@gmail.com', phone: '0902223344' },
  { name: 'Lâm K', address: '01 Nguyễn Huệ, Q.1, TP.HCM', email: 'k@gmail.com', phone: '0974445566' },
  
  
])

const currentPage = ref(1)
const perPage = 5

const totalPages = computed(() => Math.ceil(addresses.value.length / perPage))

const paginatedAddresses = computed(() =>
  addresses.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
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


const removeAddress = (index) => {
  addresses.value.splice((currentPage.value - 1) * perPage + index, 1)
}

</script>
