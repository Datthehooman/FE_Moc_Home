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
        color: "warning",
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
        color: "warning",
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
          color: "warning",
        });
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Lỗi tải đánh giá sản phẩm";
      error.value = msg;
      productReviews.value = [];
      ratingStats.value = null;

      toast.add({
        title: msg,
        color: "warning",
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

    createReview,
    fetchDetailToReview,
    checkOrderDetailReviewed,
    fetchLatestReviews,
    fetchProductReviews,
    fetchProductRatingStats,
    checkOrderFullyReviewed,
  };
}
