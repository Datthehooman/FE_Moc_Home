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
      // Mapping trạng thái theo logic hiện tại của bạn:
      order_status:
        o.order_status === "pending"
        ? "Chờ xác nhận"
        : o.order_status === "confirmed"
        ? "Đã xác nhận"
        : o.order_status === "processing"
        ? "Đang xử lý"
        : o.order_status === "completed"
        ? "Hoàn tất"
        : o.order_status === "cancelled"
        ? "Đã hủy"
        : o.order_status,
      // 🔥 ĐÃ THÊM: Đảm bảo order_details có sẵn (cần cho việc kiểm tra review)
      order_details: o.order_details || [],
    }));

    console.log("Mapped orders:", orders.value);
  } catch (err: any) {
    error.value = err?.data?.message || "Không lấy được danh sách đơn hàng";
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