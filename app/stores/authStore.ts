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
  tokenLocal: string | null;
  isLogged: boolean;
  isSubmitting: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {},

    // Real token stored for production
    token: useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
      sameSite: "lax",
      secure: true,
    }).value,

    // Local development token
    tokenLocal: useCookie("tokenLocal", {
      path: "/",
      maxAge: 60 * 60 * 24,
    }).value,

    isLogged: false,
    isSubmitting: false,
  }),

  persist: true,

  getters: {
    /**
     * Automatically choose correct token:
     * - localhost → tokenLocal
     * - production → token
     */
    activeToken(state) {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      return isLocal ? state.tokenLocal : state.token;
    },
  },

  actions: {
     async login(data: { email: string; password_hash: string }) {
    this.isSubmitting = true;

    try {
      const response = await $fetch(
        "https://api.mocfurni.shop/api/client/login",
        { method: "POST", body: data }
      );

      const accessToken = response.data?.access_token;

      if (response.success && accessToken) {
        this.user = response.data.user;
        this.isLogged = true;
        this.token = accessToken;
        this.tokenLocal = accessToken;

        // lưu cookie
        useCookie("token", {
          path: "/",
          maxAge: 60 * 60 * 24,
          domain: ".mocfurni.shop",
          sameSite: "lax",
          secure: true,
        }).value = accessToken;

        useCookie("tokenLocal", {
          path: "/",
          maxAge: 60 * 60 * 24,
        }).value = accessToken;
      }

      return { data: this.user, token: this.token, error: null };
    } catch (err: any) {
      const status = err?.response?.status || 500;
      const msg = err?.response?.data?.message || "Lỗi kết nối server";
      const errors = err?.response?.data?.errors || null;

      return {
        data: null,
        token: null,
        error: { statusCode: status, message: msg, data: errors },
      };
    } finally {
      this.isSubmitting = false;
    }
  },

    async logout() {
      this.token = null;
      this.tokenLocal = null;
      this.user = {};
      this.isLogged = false;

      // Remove prod token
      useCookie("token", {
        path: "/",
        domain: ".mocfurni.shop",
      }).value = null;

      // Remove local token
      useCookie("tokenLocal", { path: "/" }).value = null;
    },

    async fetchUser() {
      const token = this.activeToken;
      if (!token) return;

      try {
        const res = await $fetch(
          "https://api.mocfurni.shop/api/client/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.user = res.user || {};
        this.isLogged = true;
      } catch {
        this.user = {};
        this.isLogged = false;
      }
    },
  },
});
