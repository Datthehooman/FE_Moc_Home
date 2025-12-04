import { ref } from "vue";

export function useAddress() {
  const provinces = ref([]);
  const wards = ref([]);

  const provinceDetail = ref(null);
  const wardDetail = ref(null);
  const fullAddress = ref("");

  // ==========================
  // 1. Lấy danh sách TỈNH
  // ==========================
  const fetchProvinces = async () => {
    const { data, error } = await useCustomFetch(
      "https://api.mocfurni.shop/api/client/province"
    );

    if (!error.value && data.value?.result?.data) {
      provinces.value = data.value.result.data;
    } else {
      provinces.value = [];
    }
  };

  // ==========================
  // 2. Lấy danh sách XÃ theo TỈNH
  // ==========================
  const fetchWards = async (provinceCode) => {
    if (!provinceCode) {
      wards.value = [];
      return;
    }

    const { data, error } = await useCustomFetch(
      `https://api.mocfurni.shop/api/client/ward/${provinceCode}`
    );

    if (!error.value && data.value?.result?.data) {
      wards.value = data.value.result.data;
    } else {
      wards.value = [];
    }
  };

  // ==========================
  // 3. Chi tiết TỈNH
  // ==========================
  const fetchProvinceDetail = async (provinceCode) => {
    if (!provinceCode) return;
    const { data } = await useCustomFetch(
      `https://api.mocfurni.shop/api/client/province-detail/${provinceCode}`
    );
    provinceDetail.value = data.value?.result?.data || null;
  };

  // ==========================
  // 4. Chi tiết XÃ / PHƯỜNG
  // ==========================
  const fetchWardDetail = async (wardCode) => {
    if (!wardCode) return;
    const { data } = await useCustomFetch(
      `https://api.mocfurni.shop/api/client/ward-detail/${wardCode}`
    );
    wardDetail.value = data.value?.result?.data || null;
  };

  // ==========================
  // 5. Full address (TỈNH + XÃ)
  // ==========================
  const fetchFullAddress = async (provinceCode, wardCode) => {
    if (!provinceCode || !wardCode) return;
    const { data } = await useCustomFetch(
      `https://api.mocfurni.shop/api/client/full-address/${provinceCode}/${wardCode}`
    );
    fullAddress.value = data.value?.result?.data?.full_address || "";
  };

  return {
    provinces,
    wards,
    provinceDetail,
    wardDetail,
    fullAddress,

    fetchProvinces,
    fetchWards,
    fetchProvinceDetail,
    fetchWardDetail,
    fetchFullAddress,
  };
}
