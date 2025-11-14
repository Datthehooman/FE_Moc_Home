export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const $customFetch: any = $fetch.create({
    baseURL: config.public.apiUrl,
    onRequest({ request, options }) {
      (options.headers as any).set("Accept", "application/json");
    },
    onRequestError({ request, options, error }) {
      console.log("onRequestError", error);
    },
    onResponse({ request, response, options }) {
      // console.log('onResponse', response);
    },
  });
  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
