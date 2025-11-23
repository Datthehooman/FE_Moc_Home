import { ref } from "vue";
import { useCookie } from "#app";

export function useOrderDetail() {
  const order = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const canceling = ref(false); // trạng thái đang hủy

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

  const fetchOrderDetail = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const res: any = await $fetch(
        `https://api.mocfurni.shop/api/client/orders/${id}`,
        {
          headers: getAuthHeader(),
        }
      );

      const o = res.result.data;

      const statusMap: Record<string, string> = {
        cancelled: "Đã hủy",
        pending: "Chờ xử lý",
        completed: "Hoàn tất",
      };

      order.value = {
        id: o.order_id,
        code: o.order_code,
        address: o.shipping_address,
        subtotal: Number(o.subtotal).toLocaleString("vi-VN") + " ₫",
        discount: Number(o.discount_amount).toLocaleString("vi-VN") + " ₫",
        shipping:
          Number(o.shipping_fee) === 0
            ? "Free"
            : Number(o.shipping_fee).toLocaleString("vi-VN") + " ₫",
        tax: "0 ₫",
        total: Number(o.total_amount).toLocaleString("vi-VN") + " ₫",
        status: o.order_status,
        statusText: statusMap[o.order_status] || o.order_status,

        products: o.order_details.map((d: any) => ({
          name: d.product.product_name,
          code: d.product.sku,
          brand: d.product.brand,
          quantity: d.quantity,
          color: d.product.color,
          total: Number(d.subtotal).toLocaleString("vi-VN") + " ₫",
          image: d.product.thumbnail || "https://via.placeholder.com/64",
        })),
      };
    } catch (err: any) {
      error.value = err?.data?.message || "Không lấy được chi tiết đơn hàng";
    } finally {
      loading.value = false;
    }
  };

  const cancelOrder = async (cancel_reason?: string) => {
    if (!order.value) return;

    if (!cancel_reason) {
      alert("Vui lòng chọn lý do hủy đơn 🤡");
      return;
    }

    if (!confirm("Bạn có chắc muốn hủy đơn hàng này không? 🤡")) return;

    canceling.value = true;

    try {
      await $fetch(
        `https://api.mocfurni.shop/api/client/orders/${order.value.id}/cancel`,
        {
          method: "POST",
          headers: getAuthHeader(),
          body: { cancel_reason },
        }
      );

      order.value.status = "cancelled";
      order.value.statusText = "Đã hủy";

      alert("Hủy đơn hàng thành công 🙂");
    } catch (err: any) {
      alert(err?.data?.message || "Hủy đơn hàng thất bại 🤡");
    } finally {
      canceling.value = false;
    }
  };

  return { order, loading, error, fetchOrderDetail, cancelOrder, canceling };
}
