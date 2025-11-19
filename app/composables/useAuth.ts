// composables/useAuth.ts
import { useCookie } from "#app";
import { computed } from "vue";

export const useAuth = () => {
  const tokenCookie = useCookie("token", { path: "/", maxAge: 60 * 60 * 24 });
  const isLogged = computed(() => !!tokenCookie.value);

  // ===================== LOGIN =====================
  const login = async (data: { email: string; password_hash: string }) => {
    try {
      const response = await $fetch("http://127.0.0.1:8000/api/client/login", {
        method: "POST",
        body: data,
      });

      if (response.success && response.data?.access_token) {
        tokenCookie.value = response.data.access_token;
      }

      return {
        data: response.data.user,
        token: response.data.access_token,
        error: null,
      };
    } catch (error: any) {
      const errMsg = error?.data?.message || "Lỗi kết nối server";
      return {
        data: null,
        token: null,
        error: {
          message: errMsg,
          statusCode: error?.status || 500,
          data: error?.data,
        },
      };
    }
  };

  // ===================== REGISTER =====================
  const register = async (data: RegisterData) => {
    try {
      const response = await $fetch(
        "http://127.0.0.1:8000/api/client/register",
        {
          method: "POST",
          body: data,
        }
      );

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
      const res = await $fetch("http://127.0.0.1:8000/api/client/check-email", {
        method: "POST",
        body: { email },
      });

      return res; // { available: true/false }
    } catch (error: any) {
      return { available: false };
    }
  };

  // ===================== CHECK PHONE =====================
  const checkPhoneAvailable = async (phone: string) => {
    try {
      const res = await $fetch("http://127.0.0.1:8000/api/client/check-phone", {
        method: "POST",
        body: { phone },
      });

      return res; // { available: true/false }
    } catch (error: any) {
      return { available: false };
    }
  };

  // ===================== SEND RESET PASSWORD =====================
  const sendResetPasswordOtp = async (email: string): Promise<ApiResponse> => {
    try {
      const response = await $fetch<ApiResponse>(
        "http://127.0.0.1:8000/api/client/sendOtp-password-v1",
        {
          method: "POST",
          body: { email },
        }
      );

      return response;
    } catch (error: any) {
      const msg = error?.data?.errors
        ? Object.values(error.data.errors)[0][0]
        : error?.data?.message || "Không thể gửi mã OTP";

      alert(msg);
      throw error.data || { message: "Không thể gửi mã OTP" };
    }
  };

  // ===================== LOGOUT =====================
  const logout = () => {
    tokenCookie.value = null;
  };

  return {
    login,
    logout,
    sendResetPasswordOtp,
    register,
    checkEmailAvailable,
    checkPhoneAvailable,
    tokenCookie,
    isLogged,
  };
};
