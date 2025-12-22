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
   <!-- GUEST INFO -->
<div
  v-if="!isLoggedIn"
  class="bg-[#FFF7ED] border border-[#FFE4C7] text-[#8A5A2B]
         rounded-lg p-3 mb-3 space-y-2 text-sm"
>
  <div class="flex gap-2 items-start">
    <UIcon name="heroicons:information-circle" class="w-5 h-5 mt-[2px]" />
    <span>
      Bạn đang mua hàng với tư cách <b>khách</b>.
      <br />
      <NuxtLink to="/login" class="underline font-medium"><i>Đăng nhập</i></NuxtLink>
      hoặc
      <NuxtLink to="/register" class="underline font-medium"><i>Đăng ký</i></NuxtLink>
      để trãi nghiệm nhiều dịch vụ hấp dẫn hơn!
    </span>
  </div>
</div>

<!-- ⚠️ CẢNH BÁO KHI SUBMIT -->
<div
  v-if="submitWarning"
  class="bg-[#FFF7ED] border border-[#FFE4C7] text-[#8A5A2B]
         rounded-lg p-3 mb-6 text-sm flex gap-2 items-start"
>
  <UIcon name="heroicons:exclamation-triangle" class="w-5 h-5 mt-[2px]" />
  <span class="italic">
    {{ submitWarning }}
  </span>
</div>



        <form class="space-y-6 text-[14px]" @submit.prevent="submitPayment">
          <!-- Họ và tên, email, phone (chỉ hiển thị khi guest) -->
          <div v-if="isLoggedIn">
            <div>
              <label class="block font-medium mb-1 text-[#6E4E37]">
                Họ và tên <span class="text-red-500">*</span>
              </label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">
                  Email <span class="text-red-500">*</span>
                </label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">
                  Số điện thoại <span class="text-red-500">*</span>
                </label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">Họ <span class="text-red-500">*</span></label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">Tên <span class="text-red-500">*</span></label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">Email <span class="text-red-500">*</span></label>
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
                <label class="block font-medium mb-1 text-[#6E4E37]">Số điện thoại <span class="text-red-500">*</span></label>
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
            <label class="block font-medium mb-1 text-[#6E4E37]">
              Địa chỉ <span class="text-red-500">*</span>
            </label>

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
          <!-- <div>
            <h3 class="font-medium text-[#6E4E37] mb-3">
              Hình thức vận chuyển <span class="text-red-500">*</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
             <label
              v-for="(ship, i) in shippingMethods"
              :key="i"
              class="relative border rounded-xl p-4 cursor-pointer flex flex-col gap-1 items-start"
              :class="[
                selectedShipping === ship.name
                  ? 'border-[#A77A5D] bg-[#A77A5D]/10'
                  : '',
                !hasAddress ? 'opacity-60 cursor-not-allowed' : ''
              ]"
            >
              <input
                type="radio"
                name="shipping"
                :value="ship.name"
                v-model="selectedShipping"
                class="absolute top-3 right-3 w-4 h-4 accent-[#A77A5D]"
                :disabled="!hasAddress"
              />
                <strong>{{ ship.name }}</strong>
                <p class="text-xs text-gray-600">{{ ship.desc }}</p>
               <span class="text-sm font-medium text-[#A77A5D]">
                  {{
                    hasAddress && invoice
                      ? formatPrice(invoice.shipping_fee)
                      : "Chưa tính"
                  }}
                </span>
              </label>
            </div>
            <p v-if="!hasAddress" class="text-xs  mt-1 text-red-500">
* Vui lòng thêm địa chỉ để tính phí vận chuyển
</p>

            <p v-if="errors.shipping" class="text-red-500 text-xs mt-1">
              {{ errors.shipping }}
            </p>
          </div> -->

          <!-- Phương thức thanh toán -->
          <div>
            <h3 class="font-medium text-[#6E4E37] mb-3">
              Phương thức thanh toán <span class="text-red-500">*</span>
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
  <span>Thanh toán khi nhận hàng</span>
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

<label class="flex items-center gap-3 cursor-pointer">
  <input
    type="radio"
    name="payment"
    value="deposit"
    v-model="paymentMethod"
    class="accent-[#A77A5D] w-5 h-5"
  />
  <span>Đặt cọc 30%</span>
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

  <!-- PREVIEW BILL -->
  <div v-if="invoice" class="space-y-2 text-sm">
    <div
      v-for="item in invoice.items"
      :key="item.product_id"
      class="flex justify-between"
    >
      <span>{{ item.product_name }} x {{ item.quantity }}</span>
      <span>{{ formatPrice(item.subtotal) }}</span>
    </div>

    <hr />

    <div class="flex justify-between">
      <span>Tạm tính:</span>
      <span>{{ formatPrice(invoice.subtotal) }}</span>
    </div>

    <div class="flex justify-between">
      <span>Giảm giá:</span>
      <span class="text-red-500">
        -{{ formatPrice(invoice.discount_amount || 0) }}
      </span>
    </div>

    <div class="flex justify-between">
      <span>Vận chuyển:</span>
      <span>
        {{ hasAddress ? formatPrice(invoice.shipping_fee) : "—" }}
      </span>
    </div>

    <!-- THÔNG BÁO CHƯA CÓ ĐỊA CHỈ -->
    <p
      v-if="!hasAddress"
      class="text-xs text-orange-600 italic mt-1"
    >
      * Vui lòng thêm địa chỉ để tính phí vận chuyển
    </p>

    <div class="border-t pt-3 flex justify-between font-semibold">
      <span>Tổng cộng:</span>
     <span>
  {{
    formatPrice(
      paymentMethod === "deposit"
        ? Math.ceil((hasAddress ? invoice.total_amount : invoice.subtotal - (invoice.discount_amount || 0)) * 0.3)
        : (hasAddress ? invoice.total_amount : invoice.subtotal - (invoice.discount_amount || 0))
    )
  }}
</span>

    </div>
  </div>

  <!-- FALLBACK -->
  <div v-else class="text-center text-gray-500 text-sm">
    Đang tính hóa đơn...
  </div>

  <!-- Voucher -->
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
const { buyNow, buyNowGuest, payWithVNPAY, previewInvoice, previewInvoiceGuest   } = useCheckout();
const checkoutStore = useCheckoutStore();
const authStore = useAuthStore();
const invoice = computed(() => checkoutStore.invoicePreview);
const { addresses, createAddress, setDefaultAddress, fetchAddresses } = useAddressUser();
  const toast = useToast();

const showSuccessToast = (msg: string) => {
  toast.add({
    title: msg,
    icon: "heroicons:check-circle",
    timeout: 3000,
    position: "bottom-right",
    style:
      "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
    iconColor: "#ffffff",
    color: "success",
  });
};
const submitWarning = ref("");
const LIMIT_AMOUNT = 5000000;

const checkPaymentEligibility = () => {
  submitWarning.value = "";
  const total = totalAmount.value;

  // 🚫 COD trên 5tr
if (paymentMethod.value === "offline" && total >= LIMIT_AMOUNT) {
  submitWarning.value =
    "Đơn hàng từ 5.000.000đ trở lên vui lòng chọn Thanh toán Online hoặc Đặt cọc.";

  showErrorToast("Vui lòng đổi phương thức thanh toán");
  return false;
}


  // 🚫 Đặt cọc dưới 5tr
  if (paymentMethod.value === "deposit" && total < LIMIT_AMOUNT) {
    submitWarning.value =
      "Đơn hàng dưới 5.000.000đ không thể sử dụng phương thức Đặt cọc.";
    return false;
  }

  return true;
};



// Hàm toast error
const showErrorToast = (msg: string) => {
  toast.add({
    title: msg,
    icon: "heroicons:information-circle",
    timeout: 3000,
    position: "bottom-right",
    style:
      "color:white; font-weight:600; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
    iconColor: "#ffffff",
    color: "warning",
  });
};



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
  { name: "Tiêu chuẩn", desc: "6–7 ngày" },
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
  // Thêm sau validate paymentMethod
  const total = totalAmount.value;



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

const buildAddressPayload = () => {
  const payload: any = {
    address_line: form.addressDetail,
    province_code: selectedProvince.value,
    ward_code: selectedWard.value,
    province_name: provinces.value.find(p => p.code === selectedProvince.value)?.name || "",
    ward_name: wards.value.find(w => w.code === selectedWard.value)?.name || "",
    is_default: 1,
    full_name: isLoggedIn.value ? form.full_name : `${form.firstName} ${form.lastName}`,
    phone: form.phone,
    ...( !isLoggedIn.value && { email: form.email } ),
  };
  return payload;
};



// Submit payment
const submitPayment = async () => {
  submitWarning.value = "";

  const itemsToPay =
    checkoutItems.value.length
      ? checkoutItems.value
      : buyNowItem
      ? [buyNowItem]
      : [];

  if (!itemsToPay.length) {
    router.replace("/error");
    return;
  }

  if (!checkPaymentEligibility()) return;

  if (!validate()) {
    showErrorToast("Vui lòng điền đầy đủ thông tin");
    return;
  }

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
          payment_method_id:
            paymentMethod.value === "online"
              ? 3
              : paymentMethod.value === "deposit"
              ? 2
              : 1,
          items: itemsToPay.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
          })),
          voucher_code: form.voucher_code || null,
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
          payment_method_id:
            paymentMethod.value === "online"
              ? 3
              : paymentMethod.value === "deposit"
              ? 2
              : 1,
          items: itemsToPay.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
          })),
          voucher_code: form.voucher_code || null,
        };

    const orderData = isLoggedIn.value
      ? await buyNow(payload)
      : await buyNowGuest(payload);

    order_id = Number(orderData.order_id);

    // Lưu địa chỉ mặc định khi login
    if (isLoggedIn.value) {
      const addressPayload = buildAddressPayload();

      const isDuplicate = addresses.value.some(
        (a) =>
          a.address_line === addressPayload.address_line &&
          a.province.code === addressPayload.province_code &&
          a.ward.code === addressPayload.ward_code &&
          a.full_name === addressPayload.full_name &&
          a.phone === addressPayload.phone
      );

      if (!isDuplicate) {
        const newAddress = await createAddress(addressPayload);
        if (newAddress?.id) await setDefaultAddress(newAddress.id);
      }
    }

    // Chỉ redirect khi offline
if (paymentMethod.value === "offline") {
  showSuccessToast("Thanh toán thành công! 🎉");
  checkoutStore.clearCheckout();

  // kiểm tra order_code fallback sang order_id
  const orderCode = orderData.order_code || orderData.order_id;

  // dùng await + nextTick để đảm bảo redirect chạy
  await nextTick(() => {
    router.push({
      path: "/thanks",
      query: { order_code: orderCode },
    });
  });
  return;
}


    // Với online hoặc deposit → vẫn gọi VNPAY
    if (paymentMethod.value === "online") {
      await payWithVNPAY({ order_id });
      return;
    }

    if (paymentMethod.value === "deposit") {
      const subtotal = Number(invoice.value?.total_amount || 0);
      const depositAmount = Math.ceil(subtotal * 0.3);

      await payWithVNPAY({
        order_id,
        amount: depositAmount,
      });
      return;
    }

  } catch (err: any) {
    console.error("❌ Lỗi khi tạo order:", err);
    showErrorToast(err?.message || "Thanh toán thất bại, vui lòng thử lại");
  }
};


// On mounted
onMounted(async () => {
  
  await fetchProvinces();

  if (isLoggedIn.value && authStore.user) {
    // gán thông tin user
    form.firstName = authStore.user.firstName || "";
    form.lastName = authStore.user.lastName || "";
    form.full_name = authStore.user.full_name || "";
    form.email = authStore.user.email || "";
    form.phone = authStore.user.phone || "";

    // ✅ fetch addresses trước
    await fetchAddresses(); // <- quan trọng
    const defaultAddress = authStore.addresses.find(a => a.is_default);

    if (defaultAddress) {
      selectedProvince.value = defaultAddress.province.code;
      provinceSearch.value = defaultAddress.province.name;
      await fetchWards(defaultAddress.province.code);
      selectedWard.value = defaultAddress.ward.code;
      wardSearch.value = defaultAddress.ward.name;
      form.addressDetail = defaultAddress.address_line || "";
    }
  }

  if (!checkoutItems.value.length && !buyNowItem) router.replace("/error");
 if (!checkoutStore.invoicePreview) {
  if (isLoggedIn.value) {
    await previewInvoice({
      province_id: null,
      district_id: null,
      ward_id: null,
      voucher_code: form.voucher_code || null,
    });
  } else {
    await previewInvoiceGuest({
      province_id: null,
      district_id: null,
      ward_id: null,
      voucher_code: form.voucher_code || null,
    });
  }
}

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
let previewTimeout: any = null;

watch(
  () => [selectedProvince.value, selectedWard.value],
  async ([p, w]) => {
    clearTimeout(previewTimeout);

    // ❌ Chưa đủ địa chỉ → reset phí ship
    if (!p || !w) {
      if (checkoutStore.invoicePreview) {
        checkoutStore.setInvoicePreview({
          ...checkoutStore.invoicePreview,
          shipping_fee: 0,
          total_amount:
            checkoutStore.invoicePreview.subtotal -
            (checkoutStore.invoicePreview.discount_amount || 0),
        });
      }
      return;
    }

   previewTimeout = setTimeout(async () => {
  try {
    if (isLoggedIn.value) {
      await previewInvoice({
        province_id: Number(p),
        district_id: 760, // tạm
        ward_id: Number(w),
        voucher_code: form.voucher_code || null,
      });
    } else {
      await previewInvoiceGuest({
        province_id: Number(p),
        district_id: 760, // tạm
        ward_id: Number(w),
        voucher_code: form.voucher_code || null,
      });
    }
  } catch (e) {
    console.error("Preview invoice error", e);
  }
}, 400);

  }
);


const hasAddress = computed(() => {
  return !!selectedProvince.value && !!selectedWard.value;
});

// Debounce preview khi voucher thay đổi
watch(
  () => form.voucher_code,
  (newVoucher) => {
    clearTimeout(previewTimeout);

    previewTimeout = setTimeout(async () => {
      try {
        if (!selectedProvince.value || !selectedWard.value) return;

        if (isLoggedIn.value) {
          await previewInvoice({
            province_id: Number(selectedProvince.value),
            district_id: 760,
            ward_id: Number(selectedWard.value),
            voucher_code: newVoucher || null,
          });
        } else {
          await previewInvoiceGuest({
            province_id: Number(selectedProvince.value),
            district_id: 760,
            ward_id: Number(selectedWard.value),
            voucher_code: newVoucher || null,
          });
        }
      } catch (e) {
        console.error("Preview invoice error", e);
      }
    }, 400);
  }
);


</script>
