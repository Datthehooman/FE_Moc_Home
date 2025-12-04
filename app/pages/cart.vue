<template>
  <section class="bg-[#FFF8F3] min-h-screen py-10">
    <div class="max-w-[85%] mx-auto flex flex-col md:flex-row gap-10">
      <!-- BẢNG SẢN PHẨM -->
      <div class="flex-1 rounded-2xl p-6">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="pb-3">HÌNH ẢNH</th>
              <th class="pb-3">TÊN SẢN PHẨM</th>
              <th class="pb-3">GIÁ</th>
              <th class="pb-3">SỐ LƯỢNG</th>
              <th class="pb-3">TỔNG</th>
              <th class="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in cart" :key="item.cart_id">
              <tr>
                <td class="py-4">
                  <div
                    class="w-22 h-22 flex items-center justify-center rounded-[10px] border border-[#FED8B3] overflow-hidden"
                  >
                    <img
                      :src="item.thumbnail || '/placeholder.png'"
                      class="object-contain max-w-full max-h-full p-2"
                    />
                  </div>
                </td>
                <td class="font-semibold">{{ item.product_name }}</td>
                <td class="font-semibold">
                  {{ formatPrice(item.product_sale || item.product_price) }}
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <button
                      @click="decreaseQty(item)"
                      class="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-lg font-semibold"
                    >
                      –
                    </button>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="w-10 h-8 text-center text-sm border border-gray-300 rounded outline-none"
                    />
                    <button
                      @click="increaseQty(item)"
                      class="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="font-semibold">
                  {{
                    formatPrice(
                      item.quantity * (item.product_sale || item.product_price)
                    )
                  }}
                </td>
                <td class="text-center">
                  <button
                    @click="removeItemFromCart(item.cart_id)"
                    class="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition"
                  >
                    ×
                  </button>
                </td>
              </tr>
              <tr v-if="index < cart.length - 1">
                <td colspan="6">
                  <hr class="border-t border-gray-200 my-2" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          v-if="cart.length === 0"
          class="flex flex-col items-center justify-center py-5 text-center text-gray-600"
        >
          <!-- ICON GIỎ HÀNG -->
          <div class="w-24 h-24 text-gray-300">
            <UIcon
              name="i-lucide-shopping-cart"
              class="text-6xl text-gray-300"
            />
          </div>

          <!-- TEXT -->

          <h3 class="text-lg font-semibold text-[#6E4E37]">
            Giỏ hàng của bạn đang trống
          </h3>
          <p class="text-sm text-gray-400 mt-1">
            Hãy thêm vài món đồ yêu thích để tiếp tục nhé!
          </p>

          <!-- BUTTON -->

          <a
            href="/"
            class="mt-5 bg-[#F7C59F] hover:bg-[#E8B58C] text-[#6E4E37] font-semibold py-2 px-6 rounded-lg transition"
          >
            Tiếp tục mua sắm
          </a>
        </div>
      </div>

      <!-- HÓA ĐƠN -->
      <div
        class="w-full md:w-[350px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"
      >
        <h2 class="text-lg font-semibold mb-4">Hóa đơn</h2>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Tạm tính:</span><span>{{ formatPrice(apiTotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Giảm giá:</span
            ><span class="text-red-500">-{{ formatPrice(discount) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Vận chuyển:</span><span>Miễn phí</span>
          </div>
          <div class="border-t pt-3 flex justify-between font-semibold">
            <span>Tổng thanh toán:</span>
            <span>{{ formatPrice(apiTotal - discount) }}</span>
          </div>
        </div>

        <!-- NÚT THANH TOÁN -->
        <button
          @click="goCheckout"
          class="w-full bg-[#F7C59F] hover:bg-[#E8B58C] text-[#6E4E37] font-semibold py-2 mt-5 rounded-lg transition"
        >
          Tiến hành thanh toán
        </button>

        <!-- NHẬP MÃ GIẢM GIÁ -->
        <!-- <div class="flex items-stretch mt-5 border border-gray-300 rounded-lg overflow-hidden">
          <input v-model="discountCode" placeholder="Nhập mã giảm giá" class="px-3 py-2 flex-1 text-[14px] focus:outline-none" />
          <button @click="applyDiscount" class="bg-[#F7C59F] text-[#6E4E37] px-4 font-medium text-[13px]">Xác nhận</button>
        </div> -->

        <a
          href="/"
          class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline"
        >
          ← Tiếp tục mua sắm
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useCart } from "~/composables/useCart";
  import { useCheckout } from "~/composables/useCheckout";
  import { useProduct } from "~/composables/useProduct"; // cần để lấy thumbnail

  const router = useRouter();
  const toast = useToast();
  const { cart, getCart, removeItem, updateQuantity } = useCart();
  const { setCartItems } = useCheckout();
  const { products, fetchProducts } = useProduct(); // danh sách sản phẩm

  const discount = ref(0);
  const discountCode = ref("");
  const apiTotal = ref(0);

  async function fetchCartData() {
    const data = await getCart();

    if (data && data.items) {
      apiTotal.value = data.total;
      cart.value = data.items.map((item: any) => {
        const price = Number(item.product_sale || item.product_price);
        const quantity = Number(item.quantity);
        return {
          ...item,
          thumbnail: item.product_image || "/placeholder.png",
          quantity,
          subtotal: price * quantity,
        };
      });
    } else {
      apiTotal.value = 0;
      cart.value = [];
    }
  }

  onMounted(fetchCartData);

  async function increaseQty(item: any) {
    item.quantity++;
    await updateQuantity(item.product_id, item.quantity);
    fetchCartData();
  }

  async function decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      await updateQuantity(item.product_id, item.quantity);
      fetchCartData();
    }
  }

  async function removeItemFromCart(cart_id: number) {
    await removeItem(cart_id);
    fetchCartData();
  }

  function applyDiscount() {
    discount.value = discountCode.value === "giam-50" ? 50000 : 0;
  }

  function formatPrice(num: number) {
    return Number(num).toLocaleString("vi-VN");
  }

  function goCheckout() {
    if (!cart.value.length) {
      toast.add({
        title: "Giỏ hàng trống",
        color: "warning",
      });
      return;
    }
    setCartItems(cart.value);
    router.push("/checkout");
  }
</script>

<style>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
