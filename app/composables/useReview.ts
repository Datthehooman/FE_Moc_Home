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
  // --- STATE ---
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Dùng để lưu thông tin chi tiết đơn hàng/sản phẩm cần review
  const detailToReview = ref<DetailToReview | null>(null); 

  // Các state liên quan đến review khác (giữ nguyên)
  const isReviewed = ref<boolean>(false); // State này có thể dùng để lưu kết quả kiểm tra tạm thời
  const creatingReview = ref(false); 
  const latestReviews = ref<any[]>([]);
  const productReviews = ref<any[]>([]);
  const ratingStats = ref<any>(null);
  const userReviews = ref<any[]>([]);


  // --- AUTH SETUP ---
  // Thiết lập cookie token (giả định theo cấu trúc dự án của bạn)
  let tokenCookie = useCookie("tokenLocal");

  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

  const getAuthHeader = () => {
    if (!tokenCookie.value) return {};
    return {
      Authorization: `Bearer ${tokenCookie.value}`,
    };
  };

  // Cấu hình URL API
  const BASE_URL = "https://api.mocfurni.shop/api/client";

  // --- CORE METHODS ---

  /**
   * Lấy chi tiết đơn hàng/sản phẩm cần đánh giá (authenticated)
   */
  const fetchDetailToReview = async (orderDetailId: number) => {
    loading.value = true;
    error.value = null; 
    detailToReview.value = null; 

    if (!tokenCookie.value) {
        error.value = "Người dùng chưa đăng nhập.";
        loading.value = false;
        return;
    }

    try {
        const res: any = await $fetch(`${BASE_URL}/reviews/order-detail/${orderDetailId}/detail`, {
            headers: getAuthHeader(), // Yêu cầu Auth
        });
        detailToReview.value = res.result.data as DetailToReview; 
    } catch (err: any) {
        const message = err?.data?.message || "Không thể tải chi tiết sản phẩm.";
        error.value = message;
    } finally {
        loading.value = false;
    }
  };


  /**
   * Tạo đánh giá mới (authenticated)
   * Hàm này giờ chỉ throw error hoặc resolve, không xử lý alert/toast.
   */
  const createReview = async (reviewData: { order_detail_id: number; rating: number; comment: string }) => {
    if (!tokenCookie.value) {
        throw new Error("Người dùng chưa đăng nhập.");
    }

    try {
      creatingReview.value = true; 
      await $fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: reviewData,
      });

      // 🔥 THAY ĐỔI: Bỏ alert, tầng View sẽ xử lý thông báo/chuyển hướng
      // alert("Gửi đánh giá thành công! 🎉"); 
      
    } catch (err: any) {
      const message = err?.data?.message || "Tạo đánh giá thất bại 🤡";
      // alert(message);
      throw new Error(message); // Throw error để tầng View bắt và hiển thị thông báo
    } finally {
        creatingReview.value = false;
    }
  };

  /**
   * 🔥 THÊM: Kiểm tra xem chi tiết đơn hàng đã được đánh giá chưa (authenticated)
   * Sử dụng API bạn cung cấp: /reviews/order-detail/{orderDetailId}/check
   */
  const checkOrderDetailReviewed = async (orderDetailId: number): Promise<boolean> => {
    if (!tokenCookie.value) {
        // Nếu không có token, không thể kiểm tra, hoặc không có quyền truy cập
        return false; 
    }
    
    try {
        // Gọi API kiểm tra trạng thái đánh giá
        const res: any = await $fetch(`${BASE_URL}/reviews/order-detail/${orderDetailId}/check`, {
            headers: getAuthHeader(), // Yêu cầu xác thực (Auth)
        });
        
        // Giả định API trả về một object có thuộc tính is_reviewed là boolean
        return res.result.data.is_reviewed as boolean;
    } catch (err) {
        console.error(`Lỗi khi kiểm tra trạng thái đánh giá cho ID ${orderDetailId}. (ID này không tồn tại hoặc đã bị thu hồi):`, err);
        return false; // Mặc định là chưa đánh giá/không truy cập được nếu có lỗi
    }
  };
  /**
   * Lấy danh sách đánh giá mới nhất (Không cần Auth)
   * Route: /reviews/latest
   */
  const fetchLatestReviews = async (limit: number = 5) => {
      try {
          const res: any = await $fetch(`${BASE_URL}/reviews/latest?limit=${limit}`);
          latestReviews.value = res.result.data; 
      } catch (err) {
          console.error("Lỗi khi tải đánh giá mới nhất:", err);
          latestReviews.value = [];
      }
  };

  /**
   * Lấy danh sách đánh giá theo Product ID (Không cần Auth)
   * Route: /reviews/product/{productId}
   * NOTE: API này trả về cả reviews và stats (Theo ReviewController.php)
   */
  const fetchProductReviews = async (productId: number, page: number = 1) => {
    loading.value = true;
    error.value = null; // Reset lỗi
    
    try {
        const apiUrl = `${BASE_URL}/reviews/product/${productId}?page=${page}&per_page=10`;
        console.log(`[useReview] GỌI API: ${apiUrl}`); 
        
        const res: any = await $fetch(apiUrl);
        
        // 🔥 LOG QUAN TRỌNG: Kiểm tra phản hồi thô từ API
        console.log(`[useReview] API Response Reviews/Stats thô:`, res); 

        // ⚠️ Kiểm tra và gán dữ liệu theo cấu trúc backend (res.result.data)
        if (res?.result?.data) {
            // Giả định backend trả về { reviews: PaginatorObject, stats: StatsObject }
            productReviews.value = res.result.data.reviews.data || [];
            ratingStats.value = res.result.data.stats || null;
            console.log('[useReview] Tải đánh giá thành công.');
        } else {
            // Trường hợp response OK nhưng không có result.data (Lỗi cấu trúc)
            console.error('[useReview] Lỗi cấu trúc response: Thiếu res.result.data.');
            error.value = "Lỗi dữ liệu server: Thiếu result.data";
        }
    } catch (err: any) {
        const msg = err?.data?.message || err.toString();
        console.error(`[useReview] LỖI API ĐÁNH GIÁ cho ID ${productId}:`, msg, err);
        error.value = `Lỗi API Đánh giá: ${msg}`;
        productReviews.value = null;
        ratingStats.value = null;
    } finally {
        loading.value = false;
    }
};

  /**
   * Lấy thống kê rating theo Product ID (Không cần Auth)
   * Route: /reviews/product/{productId}/stats
   */
  const fetchProductRatingStats = async (productId: number) => {
      try {
          const res: any = await $fetch(`${BASE_URL}/reviews/product/${productId}/stats`);
          ratingStats.value = res.result.data;
      } catch (err) {
          console.error(`Lỗi khi tải thống kê rating cho sản phẩm ID ${productId}:`, err);
          ratingStats.value = null;
      }
  };
  // --- PUBLIC API CALLS (Giữ nguyên) ---
  const fetchUserReviews = async () => {
    const fetchLatestReviews = async () => { /* ... */ };
    const fetchProductReviews = async (productId: number) => { /* ... */ };
    const fetchProductRatingStats = async (productId: number) => { /* ... */ };
    const fetchUserReviews = async () => { /* ... */ };
  };
  

  // --- RETURN ---
  return {
    // States
    loading,
    error,
    detailToReview, 
    creatingReview, 
    isReviewed,
    latestReviews,
    productReviews,
    ratingStats,
    userReviews,
    

    // Methods
    createReview,
    fetchDetailToReview,
    checkOrderDetailReviewed,
    fetchLatestReviews,
    fetchProductReviews,
    fetchProductRatingStats,
    fetchUserReviews,
    
  }
}