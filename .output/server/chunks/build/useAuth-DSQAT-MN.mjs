import { computed } from 'vue';
import { m as useCookie } from './server.mjs';

const useAuth = () => {
  const tokenCookie = useCookie("token", { path: "/", maxAge: 60 * 60 * 24 });
  const isLogged = computed(() => !!tokenCookie.value);
  const login = async (data) => {
    try {
      const response = await $fetch("http://127.0.0.1:8000/api/client/login", {
        method: "POST",
        body: data
      });
      if (response.success && response.data?.access_token) {
        tokenCookie.value = response.data.access_token;
      }
      return { data: response.data.user, token: response.data.access_token, error: null };
    } catch (error) {
      const errMsg = error?.data?.message || "Lỗi kết nối server";
      return { data: null, token: null, error: { message: errMsg, statusCode: error?.status || 500, data: error?.data } };
    }
  };
  const logout = () => {
    tokenCookie.value = null;
  };
  const sendResetPasswordOtp = async (email) => {
    try {
      const response = await $fetch("http://127.0.0.1:8000/api/client/sendOtp-password-v1", {
        method: "POST",
        body: { email }
      });
      return response;
    } catch (error) {
      const msg = error?.data?.errors ? Object.values(error.data.errors)[0][0] : error?.data?.message || "Không thể gửi mã OTP";
      alert(msg);
      throw error.data || { message: "Không thể gửi mã OTP" };
    }
  };
  return { login, logout, sendResetPasswordOtp, tokenCookie, isLogged };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-DSQAT-MN.mjs.map
