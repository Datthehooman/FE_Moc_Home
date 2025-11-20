// stores/auth.ts
import { defineStore } from "pinia";
import { useCookie } from "#app";

interface User {
  user_id?: number;
  full_name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User;
  token: string | null;
  isLogged: boolean;
  isSubmitting: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {},
    token: useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop", // allow admin.mocfurni.shop to read
      sameSite: "none", // required for cross-site cookies
      secure: true, // required when sameSite=none
    }).value,
    isLogged: false,
    isSubmitting: false,
  }),

  persist: true, // <-- makes state persistent across reloads

  actions: {
    async login(data: { email: string; password_hash: string }) {
      this.isSubmitting = true;
      try {
        const response = await $fetch(
          "https://api.mocfurni.shop/api/client/login",
          {
            method: "POST",
            body: data,
          }
        );

        if (response.success && response.data?.access_token) {
          this.token = response.data.access_token;
          this.user = response.data.user;
          this.isLogged = true;

          // Save token to cookie
          const tokenCookie = useCookie("token", {
            path: "/",
            maxAge: 60 * 60 * 24,
            domain: ".mocfurni.shop",
            sameSite: "lax",
          });
          tokenCookie.value = this.token;
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
          error: error?.data?.message || "Lỗi kết nối server",
        };
      } finally {
        this.isSubmitting = false;
      }
    },

    async register(data: any) {
      this.isSubmitting = true;
      try {
        await $fetch("https://api.mocfurni.shop/api/client/register", {
          method: "POST",
          body: data,
        });
        return { success: true, message: "Đăng ký thành công" };
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
        };
      } finally {
        this.isSubmitting = false;
      }
    },

    async logout() {
      this.token = null;
      this.user = {};
      this.isLogged = false;

      const tokenCookie = useCookie("token", {
        path: "/",
        maxAge: 60 * 60 * 24,
        domain: ".mocfurni.shop",
        sameSite: "lax",
      });
      tokenCookie.value = null;
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await $fetch(
          "https://api.mocfurni.shop/api/client/profile",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = res.user || {};
        this.isLogged = true;
      } catch (err) {
        this.user = {};
        this.isLogged = false;
      }
    },

    async sendResetPasswordOtp(email: string) {
      try {
        const response = await $fetch(
          "https://api.mocfurni.shop/api/client/sendOtp-password-v1",
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
    },
  },
});
