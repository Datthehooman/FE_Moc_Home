<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
import { ref, computed } from 'vue'

const { addresses, loading, removeAddress, setDefaultAddress } = useAddressUser()
const authStore = useAuthStore()

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

const handleRemove = (id: number | string) => removeAddress(id)
</script>

<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <ModulesUserAccountSidebar />

      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-4 shadow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700 text-[20px]">Danh sách địa chỉ</h3>
            <button class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
              <span class="absolute inset-0 flex justify-center items-center">
                <span class="w-1 h-1 bg-[#000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
              </span>
              <a href="/user/add_address">
                <span class="relative z-10 text-[15px] group-hover:text-white transition">Thêm địa chỉ</span>
              </a>
            </button>
          </div>

          <hr class="border-t border-gray-200 mb-4">

          <div class="grid grid-cols-5 text-[#6E4E37] font-semibold text-sm px-2 mb-3">
            <div>Tên</div>
            <div>Địa chỉ</div>
            <div>Email</div>
            <div>Số điện thoại</div>
            <div>Hành động</div>
          </div>

          <div class="space-y-2" v-if="!loading">
            <div v-for="item in paginatedAddresses" :key="item.id" class="grid grid-cols-5 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition">
              <div class="text-[#A77A5D] font-medium">{{ item.full_name }}</div>
              <div>{{ item.address_line }}, {{ item.ward?.name }}, {{ item.province?.name }}</div>
              <div>{{ authStore.user.email || '' }}</div>
              <div>{{ item.phone }}</div>

              <div class="flex items-center gap-2">
                <NuxtLink :to="`/user/edit_address/${item.id}`" class="group w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black">
                  <UIcon name="heroicons:pencil-square" class="w-5 h-5 text-gray-500 group-hover:text-white transition"/>
                </NuxtLink>

                <div @click="handleRemove(item.id)" class="group w-[34px] h-[34px] flex items-center justify-center border border-red-400 rounded-[5px] cursor-pointer transition hover:bg-red-500 hover:border-red-500">
                  <UIcon name="heroicons:x-mark" class="w-5 h-5 text-red-500 group-hover:text-white transition"/>
                </div>

                <button v-if="!item.is_default" @click="setDefaultAddress(item.id)" class="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 transition">
                  Đặt mặc định
                </button>
                <span v-else class="px-2 py-1 text-xs bg-green-200 text-green-800 rounded">Mặc định</span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-10">Đang tải địa chỉ...</div>

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
