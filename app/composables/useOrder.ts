// app/composables/useOrder.ts
import { ref } from "vue";
import { useCookie } from "#app";

export function useOrder() {
  const orders = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();

  // Determine token name based on environment
  const tokenName = config.public.isDevelopment ? "tokenLocal" : "token";
  const tokenDomain = config.public.isDevelopment
    ? undefined
    : ".mocfurni.shop";

  const tokenCookie = useCookie(tokenName, {
    path: "/",
    domain: tokenDomain,
  })?.value;

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/orders",
        {
          headers: getAuthHeader(),
        }
      );

      const raw: Order[] = res.result.data.data;

      // Giữ nguyên API nhưng xử lý hiển thị
      orders.value = raw.map((o: Order) => ({
        ...o,
        order_date: new Date(o.order_date).toLocaleDateString("vi-VN"),
        total_amount: Number(o.total_amount).toLocaleString("vi-VN"),
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
    } catch (err: any) {
      error.value = err?.data?.message || "Lỗi khi lấy danh sách đơn hàng";
    } finally {
      loading.value = false;
    }
  };

  return { orders, loading, error, fetchOrders };
}
