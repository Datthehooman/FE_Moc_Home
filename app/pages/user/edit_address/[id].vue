<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAddressUser } from '~/composables/useAddressUser'
import { useAddress } from '~/composables/useAddress'

const router = useRouter()
const route = useRoute()
const addressId = route.params.id as string

const { addresses, updateAddress, fetchAddresses } = useAddressUser()
const { provinces, wards, fetchProvinces, fetchWards } = useAddress()

// ================= FORM =================
const form = ref({
  fullName: '',
  phone: '',
  address: ''
})

const formError = ref('')

// ================= SEARCH =================
const provinceSearch = ref('')
const wardSearch = ref('')
const showProvinceList = ref(false)
const showWardList = ref(false)

const selectedProvince = ref<number | null>(null)
const selectedWard = ref<number | null>(null)

// ================= FLAGS =================
const isInit = ref(true)
const originalAddress = ref<any>(null)

// ================= UTILS =================
const removeVietnameseTones = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// ================= FILTER =================
const filteredProvinces = computed(() => {
  const key = removeVietnameseTones(provinceSearch.value)
  return provinces.value.filter(
    p =>
      removeVietnameseTones(p.name).includes(key) ||
      removeVietnameseTones(p.name_en).includes(key)
  )
})

const filteredWards = computed(() => {
  const key = removeVietnameseTones(wardSearch.value)
  return wards.value.filter(
    w =>
      removeVietnameseTones(w.name).includes(key) ||
      removeVietnameseTones(w.name_en).includes(key)
  )
})

// ================= LIFECYCLE =================
onMounted(async () => {
  await fetchProvinces()
  await fetchAddresses()

  const addr = addresses.value.find(a => a.id === +addressId)
  if (!addr) return

  // fill form
  form.value.fullName = addr.full_name
  form.value.phone = addr.phone
  form.value.address = addr.address_line

  selectedProvince.value = addr.province.code
  provinceSearch.value = addr.province.name

  await fetchWards(addr.province.code)

  selectedWard.value = addr.ward.code
  wardSearch.value = addr.ward.name

  // lưu data gốc để check trùng
  originalAddress.value = {
    full_name: addr.full_name,
    phone: addr.phone,
    province_code: addr.province.code,
    ward_code: addr.ward.code,
    address_line: addr.address_line
  }

  isInit.value = false
})

// ================= WATCH =================
watch(selectedProvince, async (newCode) => {
  if (!newCode || isInit.value) return
  await fetchWards(newCode)
  selectedWard.value = null
  wardSearch.value = ''
})

// ================= SELECT =================
const selectProvince = (p: any) => {
  selectedProvince.value = p.code
  provinceSearch.value = p.name
  showProvinceList.value = false
}

const selectWard = (w: any) => {
  selectedWard.value = w.code
  wardSearch.value = w.name
  showWardList.value = false
}

// ================= SAVE =================
const saveAddress = async () => {
  // validate rỗng
  if (
    !form.value.fullName.trim() ||
    !form.value.phone.trim() ||
    !form.value.address.trim() ||
    !selectedProvince.value ||
    !selectedWard.value
  ) {
    formError.value = 'Vui lòng nhập đầy đủ thông tin.'
    return
  }

  // validate phone
  if (!/^0\d{9,10}$/.test(form.value.phone)) {
    formError.value = 'Số điện thoại không hợp lệ.'
    return
  }

  // check không thay đổi gì
  const isSame =
    originalAddress.value &&
    originalAddress.value.full_name === form.value.fullName &&
    originalAddress.value.phone === form.value.phone &&
    originalAddress.value.province_code === selectedProvince.value &&
    originalAddress.value.ward_code === selectedWard.value &&
    originalAddress.value.address_line === form.value.address

  if (isSame) {
    formError.value = 'Địa chỉ này đã tồn tại, không có thay đổi để lưu.'
    return
  }

  formError.value = ''

  const success = await updateAddress(addressId, {
    full_name: form.value.fullName.trim(),
    phone: form.value.phone.trim(),
    province_code: selectedProvince.value,
    ward_code: selectedWard.value,
    address_line: form.value.address.trim(),
    address_type: 'shipping'
  })

  if (success) router.push('/user/address')
}
</script>

<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <ModulesUserAccountSidebar />

      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">
            Chỉnh sửa địa chỉ
          </h3>
          <hr class="border-t border-gray-200 my-4" />

          <form @submit.prevent="saveAddress" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="form.fullName"
                placeholder="Họ và tên"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
              <input
                v-model="form.phone"
                placeholder="Số điện thoại"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
            </div>

            <input
              v-model="form.address"
              placeholder="Địa chỉ cụ thể"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            />

            <!-- Province -->
            <div class="relative">
              <input
                v-model="provinceSearch"
                @focus="showProvinceList = true"
                placeholder="Tỉnh / thành phố"
                class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
              />
              <ul
                v-if="showProvinceList"
                class="absolute top-full left-0 right-0 bg-white border rounded-xl shadow max-h-52 overflow-auto z-50"
              >
                <li
                  v-for="p in filteredProvinces"
                  :key="p.code"
                  @click="selectProvince(p)"
                  class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ p.name }}
                </li>
              </ul>
            </div>

            <!-- Ward -->
            <div class="relative">
              <input
                v-model="wardSearch"
                @focus="showWardList = true"
                placeholder="Xã / phường"
                class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
              />
              <ul
                v-if="showWardList"
                class="absolute top-full left-0 right-0 bg-white border rounded-xl shadow max-h-52 overflow-auto z-50"
              >
                <li
                  v-for="w in filteredWards"
                  :key="w.code"
                  @click="selectWard(w)"
                  class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ w.name }}
                </li>
              </ul>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <NuxtLink
                to="/user/address"
                class="px-6 py-3 bg-gray-200 rounded-[10px] font-medium"
              >
                Quay lại
              </NuxtLink>

              <button
                class="px-6 py-3 bg-[#FED8B2] rounded-[10px] font-medium shadow"
              >
                Lưu địa chỉ
              </button>
            </div>

            <p v-if="formError" class="text-red-500 text-sm">
              {{ formError }}
            </p>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>
