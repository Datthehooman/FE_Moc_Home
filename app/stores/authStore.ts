// stores/auth.ts
import { defineStore } from "pinia";
import { useCookie } from "#app";

interface User {
  user_id?: number;
  full_name?: string;
  email?: string;
  role?: string | number; // role can be string or number
  [key: string]: any;
}

interface AuthState {
  user: User;
  token: string | null;
  tokenLocal: string | null;
  role: string | number | null; // prod role
  roleLocal: string | number | null; // local role
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

    // Role for production
    role: useCookie("role", {
      path: "/",
      domain: ".mocfurni.shop",
      sameSite: "lax",
      secure: true,
    }).value,

    // Role for local development
    roleLocal: useCookie("roleLocal", {
      path: "/",
      maxAge: 60 * 60 * 24,
    }).value,

    isLogged: false,
    isSubmitting: false,
  }),

  persist: true,

  getters: {
    activeToken(state) {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      return isLocal ? state.tokenLocal : state.token;
    },

    activeRole(state) {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      return isLocal ? state.roleLocal : state.role;
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
        const userRole = response.data?.user?.role;

        if (response.success && accessToken) {
          this.user = response.data.user;
          this.isLogged = true;
          this.token = accessToken;
          this.tokenLocal = accessToken;
          this.role = userRole;
          this.roleLocal = userRole;

          // Save cookies
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

          useCookie("role", {
            path: "/",
            maxAge: 60 * 60 * 24,
            domain: ".mocfurni.shop",
            sameSite: "lax",
            secure: true,
          }).value = userRole;

          useCookie("roleLocal", {
            path: "/",
            maxAge: 60 * 60 * 24,
          }).value = userRole;
        }

        return {
          data: this.user,
          token: this.token,
          role: this.role,
          error: null,
        };
      } catch (err: any) {
        const status = err?.response?.status || 500;
        const msg = err?.response?.data?.message || "Lỗi kết nối server";
        const errors = err?.response?.data?.errors || null;

        return {
          data: null,
          token: null,
          role: null,
          error: { statusCode: status, message: msg, data: errors },
        };
      } finally {
        this.isSubmitting = false;
      }
    },

    async logout() {
      this.token = null;
      this.tokenLocal = null;
      this.role = null;
      this.roleLocal = null;
      this.user = {};
      this.isLogged = false;

      useCookie("token", {
        path: "/",
        domain: ".mocfurni.shop",
      }).value = null;

      useCookie("tokenLocal", { path: "/" }).value = null;

      useCookie("role", {
        path: "/",
        domain: ".mocfurni.shop",
      }).value = null;

      useCookie("roleLocal", { path: "/" }).value = null;
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
        this.role = res.user?.role || null;
        this.roleLocal = res.user?.role || null;
        this.isLogged = true;
      } catch {
        this.user = {};
        this.role = null;
        this.roleLocal = null;
        this.isLogged = false;
      }
    },
  },
});
