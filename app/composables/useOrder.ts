// app/composables/useOrder.ts
import { ref } from "vue";
import { useCookie } from "#app";

export function useOrder() {

  const orders = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 🔥 ƯU TIÊN tokenLocal (chạy localhost)
  let tokenCookie = useCookie("tokenLocal");

  // 🔥 Nếu không có thì fallback token domain .mocfurni.shop
  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

const fetchOrders = async () => {
  if (!tokenCookie.value) return;

  loading.value = true;
  error.value = null;

  try {
    const res: any = await $fetch(
      "https://api.mocfurni.shop/api/client/orders",
      {
        headers: getAuthHeader(),
      }
    );

    console.log("Raw orders response:", res);

    // Pagination object
    const pagination = res?.result?.data;
    const raw: any[] = pagination?.data ?? [];

    orders.value = raw.map((o: any) => ({
      ...o,
      order_date: o.order_date
        ? new Date(o.order_date).toLocaleDateString("vi-VN")
        : "",
      total_amount: o.total_amount
        ? Number(o.total_amount).toLocaleString("vi-VN")
        : 0,
      order_status:
        o.order_status === "pending"
          ? "Đang chờ"
          : o.order_status === "processing"
          ? "Đang xử lý"
          : o.order_status === "completed"
          ? "Hoàn thành"
          : o.order_status === "cancelled"
          ? "Đã hủy"
          : o.order_status,
    }));

    console.log("Mapped orders:", orders.value);
  } catch (err: any) {
    error.value = err?.data?.message || "Lỗi khi lấy danh sách đơn hàng";
    console.error("Order error:", err);
  } finally {
    loading.value = false;
  }
};


  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
}
