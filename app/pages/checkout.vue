<template>
  <section class="bg-[#FFFBF8] min-h-screen py-10 px-4">
    <div
      class="max-w-[90%] mx-auto flex flex-col lg:flex-row gap-8 justify-between"
    >
      <!-- FORM THANH TOÁN -->
     <!-- FORM THANH TOÁN -->
      <div
        class="flex-[2.3] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full"
      >
        <h2 class="text-xl font-semibold text-[#6E4E37] mb-6">
          Địa chỉ thanh toán của bạn
        </h2>

        <form class="space-y-6 text-[14px]" @submit.prevent="submitPayment">
          <!-- Họ và tên, email, phone (chỉ hiển thị khi guest) -->
          <div v-if="isLoggedIn">
            <div>
              <label class="block font-medium mb-1 text-[#6E4E37]">Họ và tên</label>
              <input
                v-model="form.full_name"
                placeholder="Nhập họ và tên"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#A77A5D]"
              />
              <p v-if="errors.full_name" class="text-red-500 text-xs mt-1">
                {{ errors.full_name }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Email</label>
                <input
                  v-model="form.email"
                  placeholder="Nhập email"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                  {{ errors.email }}
                </p>
              </div>
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Số điện thoại</label>
                <input
                  v-model="form.phone"
                  placeholder="Nhập số điện thoại"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                  {{ errors.phone }}
                </p>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Họ</label>
                <input
                  v-model="form.firstName"
                  placeholder="Nhập họ"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                  {{ errors.firstName }}
                </p>
              </div>
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Tên</label>
                <input
                  v-model="form.lastName"
                  placeholder="Nhập tên"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Email</label>
                <input
                  v-model="form.email"
                  placeholder="Nhập email"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                  {{ errors.email }}
                </p>
              </div>
              <div>
                <label class="block font-medium mb-1 text-[#6E4E37]">Số điện thoại</label>
                <input
                  v-model="form.phone"
                  placeholder="Nhập số điện thoại"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                  {{ errors.phone }}
                </p>
              </div>
            </div>
          </div>

          <!-- Địa chỉ -->
          <div>
            <label class="block font-medium mb-1 text-[#6E4E37]">Địa chỉ</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="relative">
              <input
                type="text"
                v-model="provinceSearch"
                @focus="showProvinceList = true"
                placeholder="Tìm tỉnh / thành phố..."
                class="w-full border border-gray-300 rounded-xl px-3 py-2"
              />

              <!-- LIST TỈNH -->
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

              <p v-if="errors.province" class="text-red-500 text-xs mt-1">
                {{ errors.province }}
              </p>
            </div>
          <div class="relative">
  <input
    type="text"
    v-model="wardSearch"
    @focus="showWardList = true"
    placeholder="Tìm xã / phường..."
    class="w-full border border-gray-300 rounded-xl px-3 py-2"
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

  <p v-if="errors.ward" class="text-red-500 text-xs mt-1">
    {{ errors.ward }}
  </p>
</div>

            </div>

            <div class="mt-3">
              <input
                type="text"
                v-model="form.addressDetail"
                placeholder="Địa chỉ cụ thể"
                class="w-full border border-gray-300 rounded-xl px-3 py-2 focus:border-[#A77A5D] focus:ring-1 focus:ring-[#A77A5D] transition"
              />
              <p
                v-if="errors.addressDetail"
                class="text-red-500 text-xs mt-1"
              >
                {{ errors.addressDetail }}
              </p>
            </div>
          </div>

          <!-- Ghi chú -->
          <div>
            <label class="block font-medium mb-1 text-[#6E4E37]">Ghi chú</label>
            <textarea
              rows="4"
              v-model="form.note"
              placeholder="Nhập ghi chú (nếu có)"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#A77A5D] focus:ring-1 focus:ring-[#A77A5D] transition"
            ></textarea>
          </div>

          <!-- Hình thức vận chuyển -->
          <div>
            <h3 class="font-medium text-[#6E4E37] mb-3">
              Hình thức vận chuyển
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label
                v-for="(ship, i) in shippingMethods"
                :key="i"
                class="relative border rounded-xl p-4 cursor-pointer flex flex-col gap-1 items-start"
                :class="
                  selectedShipping === ship.name
                    ? 'border-[#A77A5D] bg-[#A77A5D]/10'
                    : ''
                "
              >
                <input
                  type="radio"
                  name="shipping"
                  :value="ship.name"
                  v-model="selectedShipping"
                  class="absolute top-3 right-3 w-4 h-4 accent-[#A77A5D]"
                />
                <strong>{{ ship.name }}</strong>
                <p class="text-xs text-gray-600">{{ ship.desc }}</p>
                <span class="text-sm font-medium text-[#A77A5D]">{{
                  ship.price
                }}</span>
              </label>
            </div>
            <p v-if="errors.shipping" class="text-red-500 text-xs mt-1">
              {{ errors.shipping }}
            </p>
          </div>

          <!-- Phương thức thanh toán -->
          <div>
            <h3 class="font-medium text-[#6E4E37] mb-3">
              Phương thức thanh toán
            </h3>
            <div class="flex flex-col gap-3">
                <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="offline"
                  v-model="paymentMethod"
                  class="accent-[#A77A5D] w-5 h-5"
                />
                <span>Thanh toán khi nhận hàng </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  v-model="paymentMethod"
                  class="accent-[#A77A5D] w-5 h-5"
                />
                <span>Thanh toán Online (VNPAY)</span>
              </label>
            </div>
            <p v-if="errors.paymentMethod" class="text-red-500 text-xs mt-1">
              {{ errors.paymentMethod }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-[#A77A5D] hover:bg-[#8B6145] text-white font-semibold py-2 mt-5 rounded-lg transition"
          >
            Tiến hành thanh toán
          </button>
        </form>
      </div>

      <!-- HÓA ĐƠN -->
      <div
        class="flex-[1] w-full max-w-[360px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"
      >
        <h2 class="text-lg font-semibold mb-4 text-[#6E4E37]">Hóa đơn</h2>

        <div v-if="checkoutItems.length" class="space-y-2 text-sm">
          <div
            v-for="item in checkoutItems"
            :key="item.product_id"
            class="flex justify-between"
          >
            <span>{{ item.product_name }} x {{ item.quantity }}</span>
            <span>{{
              formatPrice(
                item.quantity * (item.product_sale || item.product_price)
              )
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Giảm giá:</span><span class="text-red-500">-0 đ</span>
          </div>
          <div class="flex justify-between">
            <span>Vận chuyển:</span
            ><span>{{
              selectedShipping === "Nhanh" ? "30.000 đ" : "Miễn phí"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Thuế:</span><span>0 đ</span>
          </div>
          <div class="border-t pt-3 flex justify-between font-semibold">
            <span>Tổng tiền:</span>
            <span>{{ formatPrice(totalAmount) }}</span>
          </div>
        </div>

        <div v-else-if="buyNowItem" class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span
              >{{ buyNowItem.product_name }} x {{ buyNowItem.quantity }}</span
            >
            <span>{{
              formatPrice(buyNowItem.price * buyNowItem.quantity)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Giảm giá:</span><span class="text-red-500">-0 đ</span>
          </div>
          <div class="flex justify-between">
            <span>Vận chuyển:</span
            ><span>{{
              selectedShipping === "Nhanh" ? "30.000 đ" : "Miễn phí"
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Thuế:</span><span>0 đ</span>
          </div>
          <div class="border-t pt-3 flex justify-between font-semibold">
            <span>Tổng tiền:</span>
            <span>{{ formatPrice(totalAmount) }}</span>
          </div>
        </div>

        <div v-else class="text-center text-red-500">
          Không có sản phẩm để thanh toán, quay lại sản phẩm để mua
        </div>
<div class="mt-4">
  <label class="text-sm font-medium">Mã giảm giá</label>
  <input
    v-model="form.voucher_code"
    type="text"
    placeholder="Nhập mã giảm giá"
    class="w-full mt-1 px-3 py-2 border rounded-lg"
  />
</div>

        <a
          href="/cart"
          class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline"
        >
          ← Quay lại giỏ hàng
        </a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">


const router = useRouter();
const { buyNow, buyNowGuest, payWithVNPAY } = useCheckout();
const checkoutStore = useCheckoutStore();
const authStore = useAuthStore();

// Token
let tokenCookie = useCookie("tokenLocal");
if (!tokenCookie.value) {
  tokenCookie = useCookie("token", { path: "/", domain: ".mocfurni.shop" });
}
const isLoggedIn = computed(() => !!tokenCookie.value);

// Checkout items
const checkoutItems = computed(() => checkoutStore.cartItems || []);
const buyNowItem = checkoutStore.buyNowItem;

// Form
const form = reactive({
  firstName: "",
  lastName: "",
  full_name: "",
  email: "",
  phone: "",
  addressDetail: "",
  note: "",
  voucher_code: "",
});

// Payment & shipping
const paymentMethod = ref("offline");
const selectedShipping = ref("Tiêu chuẩn");
const shippingMethods = [
  { name: "Tiêu chuẩn", desc: "6–7 ngày", price: "Miễn phí" },
];

// Address
const { provinces, wards, fetchProvinces, fetchWards } = useAddress();
const selectedProvince = ref("");
const selectedWard = ref("");

// Update wards khi chọn province
const updateWards = async () => {
  if (!selectedProvince.value) {
    wards.value = [];
    selectedWard.value = "";
    return;
  }
  await fetchWards(selectedProvince.value);
  selectedWard.value = "";
};

// Errors
const errors = reactive<any>({});

// Validate form
const validate = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  let valid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

  if (isLoggedIn.value) {
    if (!form.full_name) { errors.full_name = "Họ và tên không được để trống"; valid = false; }
    if (!form.email) { errors.email = "Email không được để trống"; valid = false; }
    else if (!emailRegex.test(form.email)) { errors.email = "Email không đúng định dạng"; valid = false; }
    if (!form.phone) { errors.phone = "SĐT không được để trống"; valid = false; }
    else if (!phoneRegex.test(form.phone)) { errors.phone = "SĐT không đúng định dạng"; valid = false; }
  } else {
    if (!form.firstName) { errors.firstName = "Họ không được để trống"; valid = false; }
    if (!form.lastName) { errors.lastName = "Tên không được để trống"; valid = false; }
    if (!form.email) { errors.email = "Email không được để trống"; valid = false; }
    else if (!emailRegex.test(form.email)) { errors.email = "Email không đúng định dạng"; valid = false; }
    if (!form.phone) { errors.phone = "SĐT không được để trống"; valid = false; }
    else if (!phoneRegex.test(form.phone)) { errors.phone = "SĐT không đúng định dạng"; valid = false; }
  }

  if (!selectedProvince.value) { errors.province = "Chọn tỉnh/thành phố"; valid = false; }
  if (!selectedWard.value) { errors.ward = "Chọn xã/phường"; valid = false; }
  if (!form.addressDetail) { errors.addressDetail = "Nhập địa chỉ cụ thể"; valid = false; }
  if (!selectedShipping.value) { errors.shipping = "Chọn hình thức vận chuyển"; valid = false; }
  if (!paymentMethod.value) { errors.paymentMethod = "Chọn phương thức thanh toán"; valid = false; }

  return valid;
};

// Total amount
const totalAmount = computed(() => {
  const items = checkoutItems.value.length ? checkoutItems.value : buyNowItem ? [buyNowItem] : [];
  const total = items.reduce((acc, i) => acc + (i.product_sale || i.product_price || i.price) * i.quantity, 0);
  return total + (selectedShipping.value === "Nhanh" ? 30000 : 0);
});

// Submit payment
const submitPayment = async () => {
  const itemsToPay = checkoutItems.value.length ? checkoutItems.value : buyNowItem ? [buyNowItem] : [];
  if (!itemsToPay.length) { 
    alert("Không có sản phẩm để thanh toán"); 
    router.replace("/error"); 
    return; 
  }
  if (!validate()) { 
    alert("Vui lòng điền đầy đủ thông tin"); 
    return; 
  }

  // Tạo shipping_address dùng tên thay vì code
  const shipping_address = `${form.addressDetail}, ${wardSearch.value}, ${provinceSearch.value}`;
  
  let order_id = 0;

  try {
    const payload = isLoggedIn.value
      ? { 
          user_id: authStore.user.user_id, 
          shipping_address, 
          province_code: selectedProvince.value,
          ward_code: selectedWard.value,
          province_name: provinceSearch.value,
          ward_name: wardSearch.value,
          note: form.note || "", 
          payment_method_id: paymentMethod.value === "online" ? 2 : 1, 
          items: itemsToPay.map(i => ({ product_id: i.product_id, quantity: i.quantity })), 
          voucher_code: form.voucher_code || null 
        }
      : { 
          customer_name: `${form.firstName} ${form.lastName}`, 
          customer_phone: form.phone, 
          customer_email: form.email, 
          shipping_address, 
          province_code: selectedProvince.value,
          ward_code: selectedWard.value,
          province_name: provinceSearch.value,
          ward_name: wardSearch.value,
          note: form.note || "", 
          payment_method_id: paymentMethod.value === "online" ? 2 : 1, 
          items: itemsToPay.map(i => ({ product_id: i.product_id, quantity: i.quantity })), 
          voucher_code: form.voucher_code || null 
        };

    const orderData = isLoggedIn.value ? await buyNow(payload) : await buyNowGuest(payload);
    order_id = Number(orderData.order_id);

    if (paymentMethod.value === "online") {
      await payWithVNPAY({ order_id });
      return;
    }

    alert("Thanh toán thành công! 🎉");
    checkoutStore.clearCheckout();
    router.push({ path: "/thanks", query: { order_code: orderData.order_code } });
  } catch (err: any) {
    console.error("❌ Lỗi khi tạo order:", err);
    alert(err?.message || "Thanh toán thất bại, vui lòng thử lại sau");
  }
};


// On mounted
onMounted(async () => {
  await fetchProvinces();

  if (isLoggedIn.value && authStore.user) {
    form.firstName = authStore.user.firstName || "";
    form.lastName = authStore.user.lastName || "";
    form.full_name = authStore.user.full_name || "";
    form.email = authStore.user.email || "";
    form.phone = authStore.user.phone || "";

    // ✅ Lấy địa chỉ mặc định
    const defaultAddress = authStore.addresses.find(a => a.is_default);
    if (defaultAddress) {
      // Tỉnh
      selectedProvince.value = defaultAddress.province.code;
      provinceSearch.value = defaultAddress.province.name;

      // Load wards cho tỉnh
      await fetchWards(defaultAddress.province.code);

      // Xã
      selectedWard.value = defaultAddress.ward.code;
      wardSearch.value = defaultAddress.ward.name;

      // Địa chỉ chi tiết
      form.addressDetail = defaultAddress.address_line || "";
    }
  }

  if (!checkoutItems.value.length && !buyNowItem) router.replace("/error");
});



// Format price
function formatPrice(value: number | undefined | null) {
  return (Number(value) || 0).toLocaleString("vi-VN") + " đ";
}

function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}


const provinceSearch = ref("");
const showProvinceList = ref(false);

const filteredProvinces = computed(() => {
  const keyword = removeVietnameseTones(provinceSearch.value);
  return provinces.value.filter(p => {
    const name = removeVietnameseTones(p.name);
    const name_en = removeVietnameseTones(p.name_en || "");
    return name.includes(keyword) || name_en.includes(keyword);
  });
});

const selectProvince = (province: any) => {
  selectedProvince.value = province.code;
  provinceSearch.value = province.name;
  showProvinceList.value = false;

  updateWards(); // load lại xã/phường
};

const wardSearch = ref("");
const showWardList = ref(false);

const filteredWards = computed(() => {
  const keyword = removeVietnameseTones(wardSearch.value);
  return wards.value.filter(w => {
    const name = removeVietnameseTones(w.name);
    const name_en = removeVietnameseTones(w.name_en || "");
    return name.includes(keyword) || name_en.includes(keyword);
  });
});

const selectWard = (ward: any) => {
  selectedWard.value = ward.code;
  wardSearch.value = ward.name;
  showWardList.value = false;
};

</script>
