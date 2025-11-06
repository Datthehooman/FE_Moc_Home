export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    authUser: {} as AuthUser,
    isLogged: false,
    isSubmitting: false,
  }),

  persist: true,

  actions: {
    async register(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch<ApiAuthResponse>(
        "/api/client/register",
        { method: "POST", body }
      );
      await execute();
      this.isSubmitting = false;

      if (error.value) return { error: error.value, data: null };

      this.authUser = data.value!.data;
      this.isLogged = true;
      return { error: null, data: data.value };
    },

    async login(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch<ApiAuthResponse>(
        "/api/client/login",
        { method: "POST", body }
      );
      await execute();
      this.isSubmitting = false;

      if (error.value) return { error: error.value, data: null };

      this.authUser = data.value!.data;
      this.isLogged = true;
      return { error: null, data: data.value };
    },

    async logout() {
      try {
        if (this.isLogged && this.authUser.access_token) {
          await useCustomFetch("/api/client/logout", { method: "POST" });
        }
      } catch (error) {
        console.error("Logout error:", error);
      }

      this.authUser = {};
      this.isLogged = false;
      navigateTo("/");
    },

    async forgotPassword(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch(
        "/api/client/forgot-password",
        { method: "POST", body }
      );
      await execute();
      this.isSubmitting = false;
      return { error: error.value || null, data: data.value || null };
    },

    async resetPassword(params: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch(
        `/api/client/reset-password?${new URLSearchParams(params)}`,
        { method: "POST" }
      );
      await execute();
      this.isSubmitting = false;
      return { error: error.value || null, data: data.value || null };
    },

    async sendOtp(email: string) {
      const { data, error, execute } = useCustomFetch(
        `/api/client/sendOtp-password-v1?email=${email}`,
        { method: "POST" }
      );
      await execute();
      return { error: error.value || null, data: data.value || null };
    },

    async resetPasswordWithOtp(params: any) {
      const query = new URLSearchParams(params).toString();
      const { data, error, execute } = useCustomFetch(
        `/api/client/reset-password-v1?${query}`,
        { method: "POST" }
      );
      await execute();
      return { error: error.value || null, data: data.value || null };
    },
  },
});
