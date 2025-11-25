import { useCheckoutStore } from "@/stores/checkout";
import { useCookie } from "#app";

export function useCheckout() {
  const checkoutStore = useCheckoutStore();
  const authStore = useAuthStore();
  let tokenCookie = useCookie("tokenLocal");

  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

  // ✅ Lưu sản phẩm MUA NGAY
  const setBuyNowItem = (item: any) => {
    console.log("💾 Lưu mua ngay:", item);
    checkoutStore.setBuyNowItem(item);
  };

  // ✅ Lưu toàn bộ giỏ hàng để thanh toán
  const setCartItems = (items: any[]) => {
    console.log("💾 Lưu giỏ hàng trước khi checkout:", items);
    checkoutStore.setCartItems(items);
  };

  // 🔥 Thanh toán 1 sản phẩm buy-now
  const buyNow = async (payload: {
    product_id: number;
    quantity: number;
    shipping_address: string;
    note?: string;
    payment_method_id: number;
      voucher_code?: string | null;   // <<< THÊM
  }) => {
    if (!tokenCookie.value) throw new Error("Vui lòng đăng nhập để thanh toán");

    const user_id = authStore.user.user_id || null;
    const body = { ...payload, user_id };

    return await $fetch("https://api.mocfurni.shop/api/client/buy-now", {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body,
    });
  };

  // 🔥 Thanh toán 1 sản phẩm cho guest
  const buyNowGuest = async (payload: {
    product_id: number;
    quantity: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    shipping_address: string;
    note?: string;
    payment_method_id: number;
      voucher_code?: string | null;  // <<< THÊM
  }) => {
    try {
      return await $fetch(
        "https://api.mocfurni.shop/api/client/buy-now/guest",

        {
          method: "POST",
          body: payload,
        }
      );
    } catch (error: any) {
      console.error("❌ Lỗi server guest:", error.data || error);
      throw new Error("Lỗi server");
    }
  };

  // 🔥 Thanh toán cả giỏ hàng (cart)
  const checkoutCart = async (
    shipping_address: string,
    note = "",
    payment_method_id = 2
  ) => {
    if (!checkoutStore.cartItems.length) throw new Error("Giỏ hàng rỗng");

    const payload = {
      user_id: authStore.user?.user_id || null,
      items: checkoutStore.cartItems.map((i) => ({
        product_id: i.product_id,
        quantity: i.quantity,
      })),
      shipping_address,
      note,
      payment_method_id,
    };

    if (tokenCookie.value) {
      return await $fetch("https://api.mocfurni.shop/api/client/buy-now/cart", {
        method: "POST",
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        body: payload,
      });
    } else {
      // Guest cart
      const guestPayload = {
        items: checkoutStore.cartItems.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        })),
        shipping_address,
        note,
        payment_method_id,
      };
      return await $fetch(
        "https://api.mocfurni.shop/api/client/buy-now/guest-cart",
        {
          method: "POST",
          body: guestPayload,
        }
      );
    }
  };

  // 💳 Thanh toán online qua VNPAY
// 💳 Thanh toán online qua VNPAY
const payWithVNPAY = async (payload: {
  amount: number;
  orderInfo: string;
  order_type: string;
  order_id: string | number;
}) => {
  if (!payload.amount || payload.amount <= 0) return alert("Số tiền thanh toán không hợp lệ");

  // ✅ log ra payload trước khi gửi
  console.log("🔥 VNPAY Payload:", {
    amount: payload.amount,
    orderInfo: payload.orderInfo,
    order_type: payload.order_type,
    order_id: payload.order_id,
  });

  try {
    const res: any = await $fetch("https://api.mocfurni.shop/api/client/vnpay-payment", {
      method: "POST",
      body: payload,
    });

  // const res: any = await $fetch("https://api.mocfurni.shop/api/client/vnpay-payment", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: payload,
  // });


    const queryString = res?.data || res;
    if (queryString) {
      const vnpayBase = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const url = queryString.startsWith("?") ? vnpayBase + queryString : vnpayBase + "?" + queryString;
        window.location.href = url; // redirect sang VNPAY
    } else {
      alert("Không nhận được link thanh toán từ server");
      console.log("VNPAY response:", res);
    }
  } catch (err: any) {
    console.error("❌ Lỗi VNPAY:", err?.data || err);
    alert("Thanh toán VNPAY thất bại!");
  }
};



  const clearCheckout = () => {
    checkoutStore.clearCheckout();
  };

  return {
    setBuyNowItem,
    setCartItems,
    buyNow,
    buyNowGuest,
    checkoutCart,
    payWithVNPAY,
    clearCheckout,
  };
}
