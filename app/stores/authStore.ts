export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    authUser: {} as AuthUser,
    isLogged: false,
    isSubmitting: false,
  }),

  persist: true,

  actions: {
    async login(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch<ApiAuthResponse>(
        "/api/client/login",
        {
          method: "POST",
          body,
        }
      );
      await execute();
      this.isSubmitting = false;

      if (error.value) return { error: error.value, data: null };

      const payload = data.value!;
      this.authUser = payload.data;
      this.isLogged = true;

      return { error: null, data: payload };
    },

    async register(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch<ApiAuthResponse>(
        "/api/client/register",
        {
          method: "POST",
          body,
        }
      );
      await execute();
      this.isSubmitting = false;

      if (error.value) return { error: error.value, data: null };

      const payload = data.value!;
      this.authUser = payload.data;
      this.isLogged = true;

      return { error: null, data: payload };
    },

    // async loginWithGoogle(token: string) {
    //   this.isSubmitting = true;
    //   const { data, error, execute } = useCustomFetch("/v1/auth/login/google", {
    //     method: "POST",
    //     body: { accessToken: token },
    //   });
    //   await execute();
    //   this.isSubmitting = false;

    //   if (error.value) {
    //     return { error: error.value, data: null };
    //   }

    //   const payload = data.value as Data;
    //   this.authUser = payload.data;
    //   this.isLogged = true;
    //   return { error: null, data: payload };
    // },

    // async refreshToken() {
    //   const { data, error, execute } = useCustomFetch("/v1/auth/refresh", {
    //     method: "POST",
    //     body: { refreshToken: this.authUser.token?.refreshToken?.token },
    //   });
    //   await execute();

    //   const payload = data.value as Data;

    //   if (this.authUser.token) {
    //     this.authUser.token.accessToken = payload.data.accessToken;
    //   }

    //   return { error: error.value || null, data: data.value || null };
    // },

    async logout() {
      try {
        // Call logout API if logged in
        if (this.isLogged && this.authUser.access_token) {
          await useCustomFetch("/api/client/logout", { method: "POST" });
        }
      } catch (error) {
        console.error("Logout API error:", error);
        // Even if it fails, still clear local data
      }

      // Clear local session regardless
      this.authUser = {};
      this.isLogged = false;
      navigateTo("/");
    },

    // async getProfile() {
    //   const { data, error, execute } = useCustomFetch(
    //     "/v1/account/get-profile"
    //   );
    //   await execute();

    //   const payload = data.value as Data;

    //   this.authUser.user = payload.data.user;

    //   return { error: error.value || null, data: data.value || null };
    // },

    // async updateProfile(body: any) {
    //   this.isSubmitting = true;
    //   const { data, error, execute } = useCustomFetch(
    //     "/v1/account/update-profile",
    //     {
    //       method: "PUT",
    //       body,
    //     }
    //   );
    //   await execute();
    //   this.isSubmitting = false;

    //   const payload = data.value as Data;

    //   this.authUser.user = payload.data.user;

    //   return { error: error.value || null, data: data.value || null };
    // },

    async resendOtp(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch("/v1/email/resend", {
        method: "POST",
        body,
      });
      await execute();
      this.isSubmitting = false;

      return { error: error.value || null, data: data.value || null };
    },

    async verifyOTP(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch("/v1/email/verify", {
        method: "POST",
        body,
      });
      await execute();
      this.isSubmitting = false;

      return { error: error.value || null, data: data.value || null };
    },

    async forgotPassword(body: any) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch("/v1/auth/forgot", {
        method: "POST",
        body,
      });
      await execute();
      this.isSubmitting = false;

      return { error: error.value || null, data: data.value || null };
    },

    async resetPassword(body: any, token: string) {
      this.isSubmitting = true;
      const { data, error, execute } = useCustomFetch(
        `/v1/user/resetPassword/${token}`,
        {
          method: "PATCH",
          body,
        }
      );
      await execute();
      this.authUser = {};
      this.isLogged = false;
      this.isSubmitting = false;

      return { error: error.value || null, data: data.value || null };
    },
  },
});
