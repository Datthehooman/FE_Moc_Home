// file: useReview.ts
import { ref } from "vue";
// Giả định bạn đang dùng Nuxt 3 hoặc môi trường tương đương
import { useCookie } from "#app";

// Định nghĩa cấu trúc dữ liệu cho chi tiết sản phẩm cần đánh giá
interface DetailToReview {
  order_detail_id: number;
  product_id: number | null;
  name: string;
  image: string;
  price: string; // Giá đã được format
  quantity: number;
  color: string | null;
  order_code: string | null; // Mã đơn hàng
}

export function useReview() {
  const toast = useToast();

  const loading = ref(false);
  const error = ref<string | null>(null);
  const detailToReview = ref<DetailToReview | null>(null);
  const isReviewed = ref<boolean>(false);
  const creatingReview = ref(false);
  const latestReviews = ref<any[]>([]);
  const productReviews = ref<any[]>([]);
  const ratingStats = ref<any>(null);
  const userReviews = ref<any[]>([]);
  const productsToReview = ref<DetailToReview[]>([]);

  // AUTH
  let tokenCookie = useCookie("tokenLocal");

  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

  const getAuthHeader = () =>
    tokenCookie.value ? { Authorization: `Bearer ${tokenCookie.value}` } : {};

  const BASE_URL = "https://api.mocfurni.shop/api/client";

  const fetchAllProductsToReview = async (orderId: number) => {
    loading.value = true;
    productsToReview.value = []; // Reset danh sách trước khi load
    
    // Lấy giá trị chuỗi từ Ref
    const token = tokenCookie.value; 

    try {
      // 1. Lấy chi tiết đơn hàng
      const res: any = await $fetch(`${BASE_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Lưu ý: Kiểm tra đúng cấu trúc trả về của API của bạn
      const details = res.result.data.order_details || [];

      const filteredProducts = [];
      
      // 2. Kiểm tra từng sản phẩm
      for (const d of details) {
        const detailId = d.order_detail_id || d.id;
        try {
          const checkRes: any = await $fetch(
            `${BASE_URL}/reviews/order-detail/${detailId}/check`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          // CHỈ thêm vào nếu reviewed là false
          if (checkRes?.result?.data?.reviewed === false) {
            filteredProducts.push({
              order_detail_id: detailId,
              name: d.product.product_name,
              image: d.product.thumbnail || "https://via.placeholder.com/150",
              color: d.product.color,
              quantity: d.quantity
            });
          }
        } catch (e) {
          console.error("Lỗi check sản phẩm:", detailId, e);
        }
      }
      
      productsToReview.value = filteredProducts;
    } catch (err) {
      console.error("Lỗi tải đơn hàng:", err);
      error.value = "Không thể tải dữ liệu đơn hàng.";
    } finally {
      loading.value = false;
    }
  };

  // ---------------------
  // FETCH DETAIL TO REVIEW
  // ---------------------
  const fetchDetailToReview = async (orderDetailId: number) => {
    loading.value = true;
    error.value = null;
    detailToReview.value = null;

    if (!tokenCookie.value) {
      error.value = "Người dùng chưa đăng nhập.";
      toast.add({ title: error.value, color: "warning" });
      loading.value = false;
      return;
    }

    try {
      const res: any = await $fetch(
        `${BASE_URL}/reviews/order-detail/${orderDetailId}/detail`,
        { headers: getAuthHeader() }
      );

      detailToReview.value = res.result.data;
    } catch (err: any) {
      const msg = err?.data?.message || "Không thể tải chi tiết sản phẩm.";
      error.value = msg;

      toast.add({
        title: msg,
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  // ---------------------
  // CREATE REVIEW
  // ---------------------
  const createReview = async (reviewData: {
    order_detail_id: number;
    rating: number;
    comment: string;
  }) => {
    if (!tokenCookie.value) {
      const msg = "Người dùng chưa đăng nhập.";
      toast.add({ title: msg, color: "warning" });
      throw new Error(msg);
    }

    try {
      creatingReview.value = true;

      await $fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: getAuthHeader(),
        body: reviewData,
      });

      toast.add({
        title: "Gửi đánh giá thành công 🎉",
        color: "success",
      });
    } catch (err: any) {
      const message = err?.data?.message || "Tạo đánh giá thất bại 🤡";

      toast.add({
        title: message,
        color: "error",
      });

      throw new Error(message);
    } finally {
      creatingReview.value = false;
    }
  };

  // ---------------------
  // CHECK ITEM REVIEW STATUS
  // ---------------------
  const checkOrderDetailReviewed = async (orderDetailId: number) => {
    if (!tokenCookie.value) return false;

    try {
      const res: any = await $fetch(
        `${BASE_URL}/reviews/order-detail/${orderDetailId}/check`,
        { headers: getAuthHeader() }
      );

      return res.result.data.is_reviewed;
    } catch {
      return false;
    }
  };

  const checkOrderFullyReviewed = async (orderDetails: any[]) => {
    if (!orderDetails || orderDetails.length === 0) return true;

    const checks = await Promise.all(
      orderDetails.map((d) => checkOrderDetailReviewed(d.order_detail_id))
    );

    return checks.every((v) => v === true);
  };

  // ---------------------
  // LATEST REVIEWS
  // ---------------------
  const fetchLatestReviews = async (limit = 5) => {
    try {
      const res: any = await $fetch(
        `${BASE_URL}/reviews/latest?limit=${limit}`
      );
      latestReviews.value = res.result.data;
    } catch {
      latestReviews.value = [];
    }
  };

  // ---------------------
  // PRODUCT REVIEWS
  // ---------------------
  const fetchProductReviews = async (productId: number, page = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const apiUrl = `${BASE_URL}/reviews/product/${productId}?page=${page}&per_page=10`;

      const res: any = await $fetch(apiUrl);

      if (res?.result?.data) {
        productReviews.value = res.result.data.reviews.data || [];
        ratingStats.value = res.result.data.stats || null;
      } else {
        error.value = "Lỗi dữ liệu server: Thiếu result.data";
        toast.add({
          title: error.value,
          color: "error",
        });
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Lỗi tải đánh giá sản phẩm";
      error.value = msg;
      productReviews.value = [];
      ratingStats.value = null;

      toast.add({
        title: msg,
        color: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  // ---------------------
  // PRODUCT STATS
  // ---------------------
  const fetchProductRatingStats = async (productId: number) => {
    try {
      const res: any = await $fetch(
        `${BASE_URL}/reviews/product/${productId}/stats`
      );
      ratingStats.value = res.result.data;
    } catch {
      ratingStats.value = null;
    }
  };

  // ---------------------
  // RETURN
  // ---------------------
  return {
    loading,
    error,
    detailToReview,
    creatingReview,
    isReviewed,
    latestReviews,
    productReviews,
    ratingStats,
    userReviews,
    productsToReview,

    createReview,
    fetchDetailToReview,
    checkOrderDetailReviewed,
    fetchLatestReviews,
    fetchProductReviews,
    fetchProductRatingStats,
    checkOrderFullyReviewed,
    fetchAllProductsToReview,
  };
}
