export default defineNuxtPlugin((nuxtApp) => {
  const userAuth = useAuthStore();
  const config = useRuntimeConfig();

  const $customFetch: any = $fetch.create({
    baseURL: config.public.apiUrl,

    // Attach headers before request
    onRequest({ options }) {
      (options.headers as any).set("Accept", "application/json");

      const token = userAuth.authUser?.access_token;
      if (userAuth.isLogged && token) {
        (options.headers as any).set("Authorization", `Bearer ${token}`);
      }
    },

    onRequestError({ error }) {
      console.error("Request error:", error);
    },

    onResponse({ response }) {
      // Optional: inspect response here if needed
      // console.log('Response received:', response);
    },

    async onResponseError({ request, response }): Promise<any> {
      const url = typeof request === "string" ? request : request.toString();

      // Skip logout for login/register endpoints
      const skipLogout =
        url.includes("/login") ||
        url.includes("/register") ||
        url.includes("/forgot") ||
        url.includes("/reset");

      if (response.status === 401 && !skipLogout) {
      }

      if (response.status === 403) {
      }
    },
  });

  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
