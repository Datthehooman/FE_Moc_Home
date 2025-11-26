<template>
  <section class="bg-[#FFFBF8] min-h-screen py-10 px-4">
    <div
      class="max-w-[90%] mx-auto flex flex-col lg:flex-row gap-8 justify-between"
    >
      <!-- FORM THANH TOÁN -->
      <div
        class="flex-[2.3] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full"
      >
        <h2 class="text-xl font-semibold text-[#6E4E37] mb-6">
          Địa chỉ thanh toán của bạn
        </h2>

        <form class="space-y-6 text-[14px]" @submit.prevent="submitPayment">
          <!-- Họ và tên, email, phone (chỉ hiển thị khi guest) -->
<!-- Họ và tên -->
<!-- Nếu đã đăng nhập -->
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

<!-- Nếu chưa đăng nhập -->
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative">
                <select
                  v-model="selectedProvince"
                  @change="updateDistricts"
                  class="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white appearance-none focus:border-[#A77A5D] focus:ring-1 focus:ring-[#A77A5D] transition"
                >
                  <option disabled value="">Tỉnh / Thành phố</option>
                  <option v-for="p in provinces" :key="p.name" :value="p.name">
                    {{ p.name }}
                  </option>
                </select>
                <svg
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <p v-if="errors.province" class="text-red-500 text-xs mt-1">
                  {{ errors.province }}
                </p>
              </div>
              <div class="relative">
                <select
                  v-model="selectedDistrict"
                  @change="updateWards"
                  class="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white appearance-none focus:border-[#A77A5D] focus:ring-1 focus:ring-[#A77A5D] transition"
                >
                  <option disabled value="">Quận / Huyện</option>
                  <option v-for="d in districts" :key="d.name" :value="d.name">
                    {{ d.name }}
                  </option>
                </select>
                <svg
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <p v-if="errors.district" class="text-red-500 text-xs mt-1">
                  {{ errors.district }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="relative">
                <select
                  v-model="selectedWard"
                  class="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white appearance-none focus:border-[#A77A5D] focus:ring-1 focus:ring-[#A77A5D] transition"
                >
                  <option disabled value="">Xã / Phường</option>
                  <option v-for="w in wards" :key="w" :value="w">
                    {{ w }}
                  </option>
                </select>
                <p v-if="errors.ward" class="text-red-500 text-xs mt-1">
                  {{ errors.ward }}
                </p>
              </div>
              <div>
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
  import { reactive, ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useCheckoutStore } from "@/stores/checkout";
  import { useCheckout } from "@/composables/useCheckout";
  import { useCookie } from "#app";

  const router = useRouter();
  const { buyNow, buyNowGuest, payWithVNPAY } = useCheckout();
  const checkoutStore = useCheckoutStore();
  const buyNowItem = checkoutStore.buyNowItem;
  const authStore = useAuthStore();
  let tokenCookie = useCookie("tokenLocal");

  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }
  const isLoggedIn = computed(() => !!tokenCookie.value);

  // Cart items
  const checkoutItems = computed(() => checkoutStore.cartItems || []);

  // Nếu không có sản phẩm => redirect /error
onMounted(() => {
  // Nếu đã login thì điền sẵn thông tin
  if (isLoggedIn.value && authStore.user) {
    form.firstName = authStore.user.firstName || "";
    form.lastName = authStore.user.lastName || "";
      form.full_name = authStore.user.full_name || "";
    form.email = authStore.user.email || "";
    form.phone = authStore.user.phone || "";
  }

  // Nếu không có sản phẩm => redirect /error
  if (!checkoutItems.value.length && !buyNowItem) {
    router.replace("/error");
  }
});


  // Form
  const form = reactive({
    firstName: "",
    lastName: "",
    full_name:"",
    email: "",
    phone: "",
    addressDetail: "",
    note: "",
    voucher_code: ""   // <<< THÊM DÒNG NÀY
  });

  // Payment & shipping
  const paymentMethod = ref("offline");
  const selectedShipping = ref("Tiêu chuẩn");

  // Location
  const selectedProvince = ref("");
  const selectedDistrict = ref("");
  const selectedWard = ref("");
  const districts = ref([]);
  const wards = ref([]);

  const provinces = ref([
    {
      name: "TP Hồ Chí Minh",
      districts: [
        { name: "Quận 1", wards: ["Bến Nghé", "Bến Thành"] },
        { name: "Quận 3", wards: ["Phường 1", "Phường 2"] },
      ],
    },
    {
      name: "Cần Thơ",
      districts: [{ name: "Ninh Kiều", wards: ["An Bình", "An Khánh"] }],
    },
  ]);

  function updateDistricts() {
    const province = provinces.value.find(
      (p) => p.name === selectedProvince.value
    );
    districts.value = province ? province.districts : [];
    selectedDistrict.value = "";
    wards.value = [];
  }

  function updateWards() {
    const district = districts.value.find(
      (d) => d.name === selectedDistrict.value
    );
    wards.value = district ? district.wards : [];
    selectedWard.value = "";
  }

  const shippingMethods = [
    { name: "Tiêu chuẩn", desc: "6–7 ngày", price: "Miễn phí" },
    // { name: "Nhanh", desc: "3–4 ngày", price: "30.000 đ" },
  ];

  const errors = reactive({});

function validate() {
// Reset errors
Object.keys(errors).forEach((key) => (errors[key] = ""));
let valid = true;

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;


if (isLoggedIn.value) {
// User đã đăng nhập
if (!form.full_name) {
errors.full_name = "Họ và tên không được để trống";
valid = false;
}


if (!form.email) {
  errors.email = "Email không được để trống";
  valid = false;
} else if (!emailRegex.test(form.email)) {
  errors.email = "Email không đúng định dạng";
  valid = false;
}

if (!form.phone) {
  errors.phone = "SĐT không được để trống";
  valid = false;
} else if (!phoneRegex.test(form.phone)) {
  errors.phone = "Số điện thoại không đúng định dạng";
  valid = false;
}


} else {
// Guest
if (!form.firstName) {
errors.firstName = "Họ không được để trống";
valid = false;
}
if (!form.lastName) {
errors.lastName = "Tên không được để trống";
valid = false;
}
if (!form.email) {
errors.email = "Email không được để trống";
valid = false;
} else if (!emailRegex.test(form.email)) {
errors.email = "Email không đúng định dạng";
valid = false;
}
if (!form.phone) {
errors.phone = "SĐT không được để trống";
valid = false;
} else if (!phoneRegex.test(form.phone)) {
errors.phone = "Số điện thoại không đúng định dạng";
valid = false;
}
}

// Địa chỉ
if (!selectedProvince.value) {
errors.province = "Chọn tỉnh/thành phố";
valid = false;
}
if (!selectedDistrict.value) {
errors.district = "Chọn quận/huyện";
valid = false;
}
if (!selectedWard.value) {
errors.ward = "Chọn xã/phường";
valid = false;
}
if (!form.addressDetail) {
errors.addressDetail = "Nhập địa chỉ cụ thể";
valid = false;
}

// Vận chuyển & thanh toán
if (!selectedShipping.value) {
errors.shipping = "Chọn hình thức vận chuyển";
valid = false;
}
if (!paymentMethod.value) {
errors.paymentMethod = "Chọn phương thức thanh toán";
valid = false;
}

return valid;
}



  const totalAmount = computed(() => {
    const items = checkoutItems.value.length
      ? checkoutItems.value
      : buyNowItem
      ? [buyNowItem]
      : [];
    const total = items.reduce(
      (acc, i) =>
        acc + (i.product_sale || i.product_price || i.price) * i.quantity,
      0
    );
    return total + (selectedShipping.value === "Nhanh" ? 30000 : 0);
  });

  async function submitPayment() {
  const itemsToPay = checkoutItems.value.length
    ? checkoutItems.value
    : buyNowItem
    ? [buyNowItem]
    : [];

  if (!itemsToPay.length) {
    alert("Không có sản phẩm để thanh toán");
    router.replace("/error");
    return;
  }

  if (!validate()) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  const shipping_address = `${form.addressDetail}, ${selectedWard.value}, ${selectedDistrict.value}, ${selectedProvince.value}`;
  let order_id: number = 0;

  try {
    // Nếu chọn thanh toán online VNPAY
    if (paymentMethod.value === "online") {
      let orderData: any;

      if (isLoggedIn.value) {
        const payloadUser = {
          user_id: authStore.user.user_id,
          shipping_address,
          note: form.note || "",
          payment_method_id: 2, // 2 = VNPAY
          items: itemsToPay.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          voucher_code: form.voucher_code || null
        };
        orderData = await buyNow(payloadUser);
      } else {
        const payloadGuest = {
          customer_name: `${form.firstName} ${form.lastName}`,
          customer_phone: form.phone,
          customer_email: form.email,
          shipping_address,
          note: form.note || "",
          payment_method_id: 2,
          items: itemsToPay.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          voucher_code: form.voucher_code || null
        };
        orderData = await buyNowGuest(payloadGuest);
      }

      order_id = Number(orderData.order_id); // Ép sang number
      const totalAmountToPay = totalAmount.value;

      await payWithVNPAY({
        amount: totalAmountToPay,
        orderInfo: `Thanh toán đơn hàng #${order_id}`,
        order_type: "product",
        order_id,
      });

      return; // redirect sang VNPAY xong
    }

    // Nếu thanh toán offline (COD)
    if (paymentMethod.value === "offline") {
      let orderData: any;
      if (isLoggedIn.value) {
        const payloadUser = {
          user_id: authStore.user.user_id,
          shipping_address,
          note: form.note || "",
          payment_method_id: 1, // offline
          items: itemsToPay.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          voucher_code: form.voucher_code || null
        };
        orderData = await buyNow(payloadUser);
      } else {
        const payloadGuest = {
          customer_name: `${form.firstName} ${form.lastName}`,
          customer_phone: form.phone,
          customer_email: form.email,
          shipping_address,
          note: form.note || "",
          payment_method_id: 1,
          items: itemsToPay.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          voucher_code: form.voucher_code || null
        };
        orderData = await buyNowGuest(payloadGuest);
      }

      alert("Thanh toán thành công! 🎉");
      checkoutStore.clearCheckout();
      router.push({ path: "/thanks", query: { order_code: Number(orderData.order_code) } });
    }
  } catch (err: any) {
    console.error("❌ Lỗi khi tạo order:", err);
    alert(err?.message || "Thanh toán thất bại, vui lòng thử lại sau");
  }
}




function formatPrice(value: number | undefined | null) {
  const v = Number(value) || 0;
  return v.toLocaleString("vi-VN") + " đ";
}

</script>