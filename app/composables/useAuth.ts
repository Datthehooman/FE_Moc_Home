// composables/useAuth.ts
import { useCookie } from "#app";
import { ref, computed } from "vue";
  
export const useAuth = () => {
  const user = ref<any>({});

  // ===================== TOKEN PRIORITY =====================
  let tokenCookie = useCookie("tokenLocal");
  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      maxAge: 60 * 60 * 24,
      domain: ".mocfurni.shop",
      sameSite: "lax",
    });
  }

  const isLogged = computed(() => !!tokenCookie.value);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  });

  // ===================== LOGIN =====================
  const login = async (data: { email: string; password_hash: string }) => {
    try {
      const response = await $fetch(
        "https://api.mocfurni.shop/api/client/login",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.success && response.data?.access_token) {
        tokenCookie.value = response.data.access_token; // LƯU TOKEN
      }

      return {
        data: response.data.user,
        token: response.data.access_token,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        token: null,
        error: {
          message: error?.data?.message || "Lỗi kết nối server",
          statusCode: error?.status || 500,
          data: error?.data,
        },
      };
    }
  };

  // ===================== REGISTER =====================
  const register = async (data: RegisterData) => {
    try {
      await $fetch("https://api.mocfurni.shop/api/client/register", {
        method: "POST",
        body: data,
      });

      return { success: true, message: "Đăng ký thành công", errors: null };
    } catch (error: any) {
      if (error?.data?.errors) {
        return {
          success: false,
          message: "Validation lỗi",
          errors: error.data.errors,
        };
      }
      return {
        success: false,
        message: error?.data?.message || "Lỗi kết nối server",
        errors: null,
      };
    }
  };

  // ===================== CHECK EMAIL =====================
  const checkEmailAvailable = async (email: string) => {
    try {
      return await $fetch("https://api.mocfurni.shop/api/client/check-email", {
        method: "POST",
        body: { email },
      });
    } catch (error) {
      return { available: false };
    }
  };

  // ===================== CHECK PHONE =====================
  const checkPhoneAvailable = async (phone: string) => {
    try {
      return await $fetch("https://api.mocfurni.shop/api/client/check-phone", {
        method: "POST",
        body: { phone },
      });
    } catch (error) {
      return { available: false };
    }
  };

  // ===================== SEND RESET PASSWORD OTP =====================
const sendResetPasswordOtp = async (email: string): Promise<ApiResponse> => {
  const toast = useToast(); // nhớ import useToast từ PrimeVue

  try {
    return await $fetch<ApiResponse>(
      "https://api.mocfurni.shop/api/client/sendOtp-password-v1",
      {
        method: "POST",
        body: { email },
      }
    );
  } catch (error: any) {
    const msg = error?.data?.errors
      ? Object.values(error.data.errors)[0][0]
      : error?.data?.message || "Không thể gửi mã OTP";

    toast.add({
      title: msg,
      icon: "heroicons:exclamation-circle",
      timeout: 3000,
      position: "bottom-right",
      style: "color:white; font-weight:600; background-color:#dc3545; box-shadow:0 4px 10px rgba(0,0,0,0.2);",
      iconColor: "#ffffff",
    });

    throw error.data || { message: "Không thể gửi mã OTP" };
  }
};


  // ===================== FETCH USER PROFILE =====================
  const fetchUserProfile = async () => {
    if (!tokenCookie.value) return null;

    try {
      const res = await $fetch(
        "https://api.mocfurni.shop/api/client/user-profile",
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      user.value = res.result.data;
      return user.value;
    } catch (error) {
      console.error("Fetch profile failed:", error);
      return null;
    }
  };

  // ===================== UPDATE USER PROFILE =====================
  const updateUserProfile = async (data: {
    full_name?: string;
    phone?: string;
    address?: string;
  }) => {
    const store = useAuthStore();
    const token = store.activeToken;

    if (!token) {
      return { success: false, message: "Chưa đăng nhập" };
    }

    try {
      const res = await $fetch(
        "https://api.mocfurni.shop/api/client/user/update-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: data,
        }
      );

      if (res.status === "1" && res.result?.data) {
        store.user = res.result.data;
        return { success: true, message: res.message, data: store.user };
      }

      return {
        success: false,
        message: res.message || "Cập nhật thất bại",
      };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: error?.data?.message || "Lỗi kết nối server",
        error,
      };
    }
  };

  // ===================== VERIFY OTP =====================
const verifyOtp = async (otp: string): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await $fetch("https://api.mocfurni.shop/api/client/verify-otp", {
      method: "POST",
      body: { otp },
    });

    // Giả sử API trả về success/false và message
    return {
      success: res.success ?? true,
      message: res.message || "Xác thực OTP thành công",
      data: res.data || null,
    };
  } catch (error: any) {
    const msg = error?.data?.message || "Xác thực OTP thất bại";
    return { success: false, message: msg };
  }
};

  // ===================== LOGOUT =====================
  const logout = () => {
    tokenCookie.value = null;
    user.value = {};
  };

  return {
    login,
    logout,
    fetchUserProfile,
    sendResetPasswordOtp,
    register,
    checkEmailAvailable,
    checkPhoneAvailable,
    updateUserProfile,
    verifyOtp, 
    tokenCookie,
    isLogged,
    user,
    getAuthHeader,
  };
};
