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

  // Hàm gọi API kiểm tra trạng thái đánh giá của chi tiết đơn hàng
  const checkProductReviewStatus = async (orderDetailId: number | string) => {
    // Ngăn chặn gọi API nếu ID không hợp lệ
    if (!orderDetailId) {
        console.warn("⚠️ Bỏ qua checkProductReviewStatus: orderDetailId không hợp lệ (undefined/null/0).");
        return false;
    }

    try {
      const res: any = await $fetch(
        `https://api.mocfurni.shop/api/client/reviews/order-detail/${orderDetailId}/check`, 
        {
          headers: getAuthHeader(),
        }
      );
      
      // Lấy giá trị reviewed từ response
      return res?.result?.data?.reviewed ?? false; 
      
    } catch (err) {
      console.error(`Error checking review status for detail ${orderDetailId}:`, err);
      // Nếu API lỗi, mặc định là chưa đánh giá
      return false; 
    }
  };

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
      
      // 🔥 DEBUG: Log cấu trúc chi tiết sản phẩm đầu tiên để kiểm tra ID
      if (o.order_details && o.order_details.length > 0) {
        console.log('DEBUG: Cấu trúc chi tiết sản phẩm đầu tiên (o.order_details[0]):', o.order_details[0]);
      }
      
      const statusMap: Record<string, string> = {
        cancelled: "Đã hủy",
        pending: "Chờ xử lý",
        paid: "Hoàn tất", 
        completed: "Hoàn tất", 
      };

      // 1. Lấy trạng thái đánh giá cho TẤT CẢ sản phẩm (order_details)
      const productsWithReviewStatus = await Promise.all(
        o.order_details.map(async (d: any) => {
          
          // ✅ FIX: Linh hoạt lấy Order Detail ID
          // Ưu tiên d.order_detail_id, nếu không có thì dùng d.id
          const detailId = d.order_detail_id || d.id;
          
          const canReview = o.order_status === 'paid' || o.order_status === 'completed';

          const isReviewed = canReview
            ? await checkProductReviewStatus(detailId) // <--- Dùng detailId đã được xử lý
            : false; 

          return {
            name: d.product.product_name,
            code: d.product.sku,
            brand: d.product.brand,
            quantity: d.quantity,
            color: d.product.color,
            total: Number(d.subtotal).toLocaleString("vi-VN") + " ₫",
            image: d.product.thumbnail || "https://via.placeholder.com/64",
            orderDetailId: detailId,            // Gán ID đã được xác định
            isReviewed: isReviewed,           
          };
        })
      );

      // 2. Cập nhật order.value với danh sách sản phẩm đã được xử lý (productsWithReviewStatus)
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

        // Gán dữ liệu sản phẩm đã có trạng thái đánh giá
        products: productsWithReviewStatus, 
      };
    } catch (err: any) {
      error.value = err?.data?.message || "Không lấy được chi tiết đơn hàng";
    } finally {
      loading.value = false;
    }
  };

  // -------------------------
  // Hàm hủy đơn hàng (giữ nguyên logic gốc)
  // -------------------------
  const cancelOrder = async (cancel_reason?: string) => {
    if (!order.value) return;

    if (!cancel_reason) {
      console.error("Vui lòng chọn lý do hủy đơn!");
      return;
    }
    
    // Bắt đầu trạng thái hủy
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

      console.log("Hủy đơn hàng thành công");
    } catch (err: any) {
      console.error("Hủy đơn hàng thất bại:", err?.data?.message);
    } finally {
      canceling.value = false;
    }
  };

  return { order, loading, error, fetchOrderDetail, cancelOrder, canceling };
}