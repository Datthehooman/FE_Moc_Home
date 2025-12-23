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

  // =========================
  // ✅ THÊM: PREVIEW BILL
  // =========================
 const previewInvoice = async ({
  province_id,
  district_id,
  ward_id,
  voucher_code, // ✅ thêm
}: {
  province_id: number;
  district_id: number;
  ward_id: number;
  voucher_code?: string | null;
}) => {
  if (!checkoutStore.cartItems.length && !checkoutStore.buyNowItem) {
    throw new Error("Không có sản phẩm để preview");
  }

  // 👉 phân biệt cart / buy-now
  const items =
    checkoutStore.checkoutMode === "buy-now"
      ? [
          {
            product_id:
              checkoutStore.buyNowItem.product_id ||
              checkoutStore.buyNowItem.product?.id,
            quantity: checkoutStore.buyNowItem.quantity,
          },
        ]
      : checkoutStore.cartItems.map((i) => ({
          product_id: i.product_id || i.product?.id,
          quantity: i.quantity,
        }));

  const payload: any = {
    items,
    shipping_address: {
      province_id,
      district_id,
      ward_id,
    },
  };

  // ✅ gửi voucher nếu có
  if (voucher_code) payload.voucher_code = voucher_code;

  const res: any = await $fetch(
    "https://api.mocfurni.shop/api/client/orders/preview-invoice",
    {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );

  checkoutStore.setInvoicePreview(res?.result?.data);
  return res?.result?.data;
};


  // 🔥 Thanh toán 1 sản phẩm buy-now
  const buyNow = async (payload: {
    product_id: number;
    quantity: number;
    shipping_address: string;
    note?: string;
    payment_method_id: number;
    voucher_code?: string | null;
  }) => {
    if (!tokenCookie.value) throw new Error("Vui lòng đăng nhập để thanh toán");

    const user_id = authStore.user.user_id || null;
    const body = { ...payload, user_id };

    const res: any = await $fetch("https://api.mocfurni.shop/api/client/buy-now", {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body,
    });

    return res?.result?.data || res;
  };

  // 🔥 Thanh toán 1 sản phẩm cho guest
  const buyNowGuest = async (payload: any) => {
  try {
    const body = {
      ...payload,
      province_code: Number(payload.province_code),
      ward_code: Number(payload.ward_code),
      items: payload.items.map(i => ({
        product_id: Number(i.product_id),
        quantity: Number(i.quantity)
      }))
    };
    if (!payload.voucher_code) delete body.voucher_code;

    const res: any = await $fetch(
      "https://api.mocfurni.shop/api/client/buy-now/guest",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      }
    );
    return res?.result?.data || res;
  } catch (error: any) {
    console.error("❌ Lỗi server guest:", error.data || error);
    throw new Error(error?.data?.message || "Lỗi server");
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
        product_id: i.product_id || i.product?.id,
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
      return await $fetch(
        "https://api.mocfurni.shop/api/client/buy-now/guest-cart",
        {
          method: "POST",
          body: payload,
        }
      );
    }
  };

  // 💳 Thanh toán online qua VNPAY
  const payWithVNPAY = async (payload) => {
    const formData = new URLSearchParams();
    formData.append("order_id", String(payload.order_id));

    const res = await $fetch(
      "https://api.mocfurni.shop/api/client/vnpay-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    const url = res?.data || res;
    window.location.href = url;
  };
  // =========================
// ✅ THÊM: PREVIEW BILL GUEST
// =========================
const previewInvoiceGuest = async ({
  province_id,
  district_id,
  ward_id,
  voucher_code, // ✅ voucher
}: {
  province_id: number;
  district_id: number;
  ward_id: number;
  voucher_code?: string | null;
}) => {
  if (!checkoutStore.cartItems.length && !checkoutStore.buyNowItem) {
    throw new Error("Không có sản phẩm để preview");
  }

  // 👉 phân biệt cart / buy-now
  const items =
    checkoutStore.checkoutMode === "buy-now"
      ? [
          {
            product_id:
              checkoutStore.buyNowItem.product_id ||
              checkoutStore.buyNowItem.product?.id,
            quantity: checkoutStore.buyNowItem.quantity,
          },
        ]
      : checkoutStore.cartItems.map((i) => ({
          product_id: i.product_id || i.product?.id,
          quantity: i.quantity,
        }));

  const payload = {
    items,
    address: {
      province_id,
      district_id,
      ward_id,
    },
  };

  if (voucher_code) payload.voucher_code = voucher_code;

  try {
    const res: any = await $fetch(
      "https://api.mocfurni.shop/api/client/orders/preview-invoice/guest",
      {
        method: "POST",
        body: payload, // gửi raw JSON
      }
    );

    checkoutStore.setInvoicePreview(res?.result?.data);
    return res?.result?.data;
  } catch (error: any) {
    console.error("❌ Lỗi preview guest:", error.data || error);
    throw new Error("Lỗi server preview guest");
  }
};


  const clearCheckout = () => {
    checkoutStore.clearCheckout();
  };

  return {
    setBuyNowItem,
    setCartItems,

    // ✅ expose thêm
    previewInvoice,
      previewInvoiceGuest, 

    buyNow,
    buyNowGuest,
    checkoutCart,
    payWithVNPAY,
    clearCheckout,
  };
}
