<script setup lang="ts">
definePageMeta({ middleware: "auth" });

import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { createAddress } = useAddressUser();
const { provinces, wards, fetchProvinces, fetchWards } = useAddress();

/* ================= FORM ================= */
const form = ref({
  fullName: "",
  phone: "",
  address: "",
});

/* ================= VALIDATE ERRORS ================= */
const errors = ref<{
  fullName?: string;
  phone?: string;
  address?: string;
  province?: string;
  ward?: string;
}>({});

/* ================= SEARCH ================= */
const provinceSearch = ref("");
const wardSearch = ref("");
const showProvinceList = ref(false);
const showWardList = ref(false);

const selectedProvince = ref<any>(null);
const selectedWard = ref<any>(null);

/* ================= UTILS ================= */
const removeVietnameseTones = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* ================= FILTER ================= */
const filteredProvinces = computed(() => {
  const key = removeVietnameseTones(provinceSearch.value);
  return provinces.value.filter(
    (p) =>
      removeVietnameseTones(p.name).includes(key) ||
      removeVietnameseTones(p.name_en).includes(key)
  );
});

const filteredWards = computed(() => {
  const key = removeVietnameseTones(wardSearch.value);
  return wards.value.filter(
    (w) =>
      removeVietnameseTones(w.name).includes(key) ||
      removeVietnameseTones(w.name_en).includes(key)
  );
});

/* ================= LIFECYCLE ================= */
onMounted(fetchProvinces);

watch(
  () => selectedProvince.value,
  (val) => {
    if (!val) return;
    fetchWards(val.code);
    selectedWard.value = null;
    wardSearch.value = "";
  }
);

/* ================= SELECT ================= */
const selectProvince = (p: any) => {
  selectedProvince.value = p;
  provinceSearch.value = p.name;
  showProvinceList.value = false;
  errors.value.province = undefined;
};

const selectWard = (w: any) => {
  selectedWard.value = w;
  wardSearch.value = w.name;
  showWardList.value = false;
  errors.value.ward = undefined;
};

/* ================= VALIDATE ================= */
const validateForm = () => {
  const e: any = {};

  if (!form.value.fullName.trim()) {
    e.fullName = "Vui lòng nhập họ và tên";
  }

  if (!form.value.phone.trim()) {
    e.phone = "Vui lòng nhập số điện thoại";
  } else if (!/^(0[0-9]{8,10})$/.test(form.value.phone)) {
    e.phone = "Số điện thoại không đúng định dạng";
  }

  if (!form.value.address.trim()) {
    e.address = "Vui lòng nhập địa chỉ cụ thể";
  }

  if (!selectedProvince.value) {
    e.province = "Vui lòng chọn tỉnh / thành phố";
  }

  if (!selectedWard.value) {
    e.ward = "Vui lòng chọn xã / phường";
  }

  errors.value = e;
  return Object.keys(e).length === 0;
};

/* ================= SAVE ================= */
const saveAddress = async () => {
  if (!validateForm()) return;

  // 🔥 CHECK TRÙNG
  const existed = authStore.addresses?.some(
    (a: any) =>
      a.phone === form.value.phone &&
      a.province?.code === selectedProvince.value.code &&
      a.ward?.code === selectedWard.value.code &&
      a.address_line?.trim() === form.value.address.trim()
  );

  if (existed) {
    errors.value.address = "Địa chỉ này đã tồn tại";
    return;
  }

  const res = await createAddress({
    full_name: form.value.fullName.trim(),
    phone: form.value.phone.trim(),
    province_code: selectedProvince.value.code,
    ward_code: selectedWard.value.code,
    address_line: form.value.address.trim(),
    address_type: "shipping",
    is_default: 0,
  });

  if (res) router.push("/user/address");
};

/* ================= CLEAR ERROR WHEN INPUT ================= */
watch(
  () => ({ ...form.value }),
  () => {
    errors.value.fullName = undefined;
    errors.value.phone = undefined;
    errors.value.address = undefined;
  }
);
</script>

<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <ModulesUserAccountSidebar />

      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-5 shadow">
          <h3 class="text-[20px] font-semibold">Thêm địa chỉ mới</h3>
          <hr class="my-4 text-gray-300" />

          <form @submit.prevent="saveAddress" class="space-y-4">
            <!-- Họ tên + SĐT -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input v-model="form.fullName" placeholder="Họ và tên" class="input" />
                <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">
                  {{ errors.fullName }}
                </p>
              </div>

              <div>
                <input v-model="form.phone" placeholder="Số điện thoại" class="input" />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- Address -->
            <div>
              <input v-model="form.address" placeholder="Địa chỉ cụ thể" class="input w-full" />
              <p v-if="errors.address" class="text-red-500 text-sm mt-1">
                {{ errors.address }}
              </p>
            </div>

            <!-- Province -->
            <div class="relative">
              <input
                v-model="provinceSearch"
                @focus="showProvinceList = true"
                placeholder="Tỉnh / thành phố"
                class="input w-full"
              />
              <ul v-if="showProvinceList" class="dropdown">
                <li
                  v-for="p in filteredProvinces"
                  :key="p.code"
                  @click="selectProvince(p)"
                >
                  {{ p.name }}
                </li>
              </ul>
              <p v-if="errors.province" class="text-red-500 text-sm mt-1">
                {{ errors.province }}
              </p>
            </div>

            <!-- Ward -->
            <div class="relative">
              <input
                v-model="wardSearch"
                @focus="showWardList = true"
                placeholder="Xã / phường"
                class="input w-full"
              />
              <ul v-if="showWardList" class="dropdown">
                <li
                  v-for="w in filteredWards"
                  :key="w.code"
                  @click="selectWard(w)"
                >
                  {{ w.name }}
                </li>
              </ul>
              <p v-if="errors.ward" class="text-red-500 text-sm mt-1">
                {{ errors.ward }}
              </p>
            </div>

            <div class="flex gap-3">
              <NuxtLink to="/user/address" class="btn-gray">Quay lại</NuxtLink>
              <button class="btn-main">Thêm địa chỉ</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.input {
  height: 50px;
  padding: 0 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}
.dropdown {
  position: absolute;
  z-index: 50;
  background: white;
  width: 100%;
  max-height: 220px;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.dropdown li {
  padding: 10px 14px;
  cursor: pointer;
}
.dropdown li:hover {
  background: #f3f3f3;
}
.btn-main {
  padding: 12px 24px;
  background: #fed8b2;
  border-radius: 10px;
  font-weight: 500;
}
.btn-gray {
  padding: 12px 24px;
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
