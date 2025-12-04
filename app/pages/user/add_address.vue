<script setup lang="ts">
  definePageMeta({ middleware: "auth" });

  import { ref, computed, watch, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAddressUser } from "~/composables/useAddressUser";
  import { useAddress } from "~/composables/useAddress";

  const router = useRouter();
  const { createAddress } = useAddressUser();
  const { provinces, wards, fetchProvinces, fetchWards } = useAddress();

  // Form
  const form = ref({
    fullName: "",
    phone: "",
    address: "",
    provinceCode: "",
    wardCode: "",
  });

  const formError = ref("");

  // Search & dropdown
  const provinceSearch = ref("");
  const showProvinceList = ref(false);
  const wardSearch = ref("");
  const showWardList = ref(false);

  const selectedProvince = ref("");
  const selectedWard = ref("");

  // Remove Vietnamese tones
  function removeVietnameseTones(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  // Filter provinces & wards by name OR name_en
  const filteredProvinces = computed(() => {
    const keyword = removeVietnameseTones(provinceSearch.value);
    return provinces.value.filter(
      (p) =>
        removeVietnameseTones(p.name).includes(keyword) ||
        removeVietnameseTones(p.name_en).includes(keyword)
    );
  });

  const filteredWards = computed(() => {
    const keyword = removeVietnameseTones(wardSearch.value);
    return wards.value.filter(
      (w) =>
        removeVietnameseTones(w.name).includes(keyword) ||
        removeVietnameseTones(w.name_en).includes(keyword)
    );
  });

  // Load provinces on mount
  onMounted(() => {
    fetchProvinces();
  });

  // Khi chọn tỉnh -> load wards
  watch(
    () => selectedProvince.value,
    (newCode) => {
      if (!newCode) return;
      fetchWards(newCode);
      selectedWard.value = "";
      wardSearch.value = "";
    }
  );

  // Chọn tỉnh / xã
  const selectProvince = async (province: any) => {
    selectedProvince.value = province.code;
    provinceSearch.value = province.name;
    showProvinceList.value = false;
  };

  const selectWard = (ward: any) => {
    selectedWard.value = ward.code;
    wardSearch.value = ward.name;
    showWardList.value = false;
  };

  // Lưu địa chỉ
  const saveAddress = async () => {
    if (
      !form.value.fullName ||
      !form.value.phone ||
      !form.value.address ||
      !selectedProvince.value ||
      !selectedWard.value
    ) {
      formError.value = "Vui lòng nhập đầy đủ thông tin.";
      return;
    }
    if (!/^[0-9]{9,11}$/.test(form.value.phone)) {
      formError.value = "Số điện thoại không hợp lệ.";
      return;
    }

    formError.value = "";

    const success = await createAddress({
      full_name: form.value.fullName,
      phone: form.value.phone,
      province_code: selectedProvince.value, // thêm dòng này
      ward_code: selectedWard.value,
      address_line: form.value.address,
      address_type: "shipping",
      is_default: 1,
    });

    if (success) router.push("/user/address");
  };
</script>

<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <ModulesUserAccountSidebar />
      <main class="flex-1 p-6">
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">
            Thêm địa chỉ mới
          </h3>
          <hr class="border-t border-gray-200 my-4" />

          <form @submit.prevent="saveAddress" class="space-y-4">
            <!-- Họ và tên + SĐT -->
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Họ và tên"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
              <input
                v-model="form.phone"
                type="text"
                placeholder="Số điện thoại"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
            </div>

            <!-- Địa chỉ cụ thể -->
            <input
              v-model="form.address"
              type="text"
              placeholder="Địa chỉ cụ thể"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            />

            <!-- Tỉnh / Thành phố -->
            <div class="relative">
              <input
                type="text"
                v-model="provinceSearch"
                @focus="showProvinceList = true"
                placeholder="Tìm tỉnh / thành phố..."
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

            <!-- Xã / Phường -->
            <div class="relative">
              <input
                type="text"
                v-model="wardSearch"
                @focus="showWardList = true"
                placeholder="Tìm xã / phường..."
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

            <!-- Nút quay lại & lưu -->
            <div class="flex items-center gap-3 pt-2">
              <NuxtLink
                to="/user/address"
                class="px-6 py-3 bg-gray-200 rounded-[10px] text-gray-700 font-medium shadow hover:bg-gray-300 transition"
              >
                Quay lại
              </NuxtLink>

              <button
                class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
              >
                <span class="absolute inset-0 flex justify-center items-center">
                  <span
                    class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"
                  ></span>
                </span>
                <span
                  class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"
                >
                  Thêm địa chỉ
                </span>
              </button>
            </div>

            <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
          </form>
        </section>
      </main>
    </div>
  </div>
</template>
