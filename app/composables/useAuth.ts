// composables/useAuth.ts
import { useCookie } from "#app";
import { computed } from "vue";

export const useAuth = () => {
  const tokenCookie = useCookie("token", { path: "/", maxAge: 60 * 60 * 24 });
  const isLogged = computed(() => !!tokenCookie.value);

  const login = async (data: { email: string; password_hash: string }) => {
    try {
      const response = await $fetch("http://127.0.0.1:8000/api/client/login", {
        method: "POST",
        body: data,
      });

      if (response.success && response.data?.access_token) {
        tokenCookie.value = response.data.access_token; // lưu vào cookie
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
  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; message?: string; errors?: any }> => {
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

  const logout = () => {
    tokenCookie.value = null;
  };
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
  return {
    login,
    logout,
    sendResetPasswordOtp,
    register,
    tokenCookie,
    isLogged,
  };
};
