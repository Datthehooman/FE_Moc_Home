import { defineStore } from "pinia";
import { useCookie } from "#app";

interface User {
  user_id?: number;
  full_name?: string;
  email?: string;
  role?: string | number;
  google_id?: string | null;
  [key: string]: any;
}

interface AuthState {
  user: User;
  addresses: any[];
  token: string | null;
  tokenLocal: string | null;
  role: string | number | null;
  roleLocal: string | number | null;
  isLogged: boolean;
  isSubmitting: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {},
    addresses: [],

    token: useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
      sameSite: "lax",
      secure: true,
    }).value,

    tokenLocal: useCookie("tokenLocal", {
      path: "/",
      maxAge: 86400,
    }).value,

    role: useCookie("role", {
      path: "/",
      domain: ".mocfurni.shop",
      sameSite: "lax",
      secure: true,
    }).value,

    roleLocal: useCookie("roleLocal", {
      path: "/",
      maxAge: 86400,
    }).value,

    isLogged: false,
    isSubmitting: false,
  }),

  persist: true,

getters: {
  activeToken(state) {
    // Nếu đang chạy ở client thì check hostname
    if (process.client) {
      const hostname = window.location.hostname;
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      return isLocal ? state.tokenLocal : state.token;
    }

    // SSR mặc định trả token chính
    return state.token;
  },

  activeRole(state) {
    if (process.client) {
      const hostname = window.location.hostname;
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      return isLocal ? state.roleLocal : state.role;
    }

    return state.role;
  },
},


  actions: {
    // ============================
    // NORMAL LOGIN
    // ============================
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
            maxAge: 86400,
            domain: ".mocfurni.shop",
            sameSite: "lax",
            secure: true,
          }).value = accessToken;

          useCookie("tokenLocal", {
            path: "/",
            maxAge: 86400,
          }).value = accessToken;

          useCookie("role", {
            path: "/",
            maxAge: 86400,
            domain: ".mocfurni.shop",
            sameSite: "lax",
            secure: true,
          }).value = userRole;

          useCookie("roleLocal", {
            path: "/",
            maxAge: 86400,
          }).value = userRole;
        }

        return {
          data: this.user,
          token: this.token,
          role: this.role,
          error: null,
        };
      } catch (err: any) {
        return {
          data: null,
          token: null,
          role: null,
          error: {
            statusCode: err?.response?.status || 500,
            message: err?.response?.data?.message || "Lỗi kết nối server",
          },
        };
      } finally {
        this.isSubmitting = false;
      }
    },

    // ============================
    // LOGOUT
    // ============================
    async logout() {
      this.token = null;
      this.tokenLocal = null;

      this.role = null;
      this.roleLocal = null;

      this.user = {};
      this.addresses = [];
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

    // ============================
    // GOOGLE LOGIN (REDIRECT)
    // ============================
    async loginGoogle() {
      try {
        const res = await $fetch(
          "https://api.mocfurni.shop/api/client/login/google",
          { method: "GET" }
        );

        if (res?.redirect_url) {
          window.location.href = res.redirect_url;
        }
      } catch (err) {
        console.error("Google login error:", err);
      }
    },

    // ============================
    // GOOGLE TOKEN SAVE (CÁCH 2)
    // ============================
async saveGoogleToken(token: string) {
  // 1️⃣ Cập nhật store
  this.token = token;
  this.tokenLocal = token;

  // 2️⃣ Lưu cookie
  useCookie("token", {
    path: "/",
    maxAge: 86400,
    domain: ".mocfurni.shop",
    sameSite: "lax",
    secure: true,
  }).value = token;

  useCookie("tokenLocal", {
    path: "/",
    maxAge: 86400,
  }).value = token;

  // 3️⃣ Fetch user và set isLogged đúng
  try {
    await this.fetchUser();
  } catch (err) {
    console.error("Lỗi fetch user sau khi login Google:", err);
    this.isLogged = false;
  }
},

    // ============================
    // GET USER PROFILE
    // ============================
   async fetchUser() {
  const token = this.activeToken;
  if (!token) {
    this.isLogged = false;
    return;
  }

  try {
    const res = await $fetch(
      "https://api.mocfurni.shop/api/client/user-profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.user = res.result?.data || {};
    this.role = this.user.role || null;
    this.roleLocal = this.user.role || null;
    this.isLogged = true;
  } catch {
    this.user = {};
    this.role = null;
    this.roleLocal = null;
    this.isLogged = false;
  }
},


    // ============================
    // ADDRESS METHODS
    // ============================
    setAddresses(addresses: any[]) {
      this.addresses = addresses;
    },

    addAddress(address: any) {
      this.addresses.push(address);
    },

    updateAddressInStore(id: string | number, updated: any) {
      const index = this.addresses.findIndex((a) => a.id === id);
      if (index !== -1) this.addresses[index] = updated;
    },

    removeAddressFromStore(id: string | number) {
      this.addresses = this.addresses.filter((a) => a.id !== id);
    },

    setDefaultAddressInStore(id: string | number) {
      this.addresses = this.addresses.map((a) => ({
        ...a,
        is_default: a.id === id ? 1 : 0,
      }));
      this.addresses.sort((a, b) => b.is_default - a.is_default);
    },
  },
});
