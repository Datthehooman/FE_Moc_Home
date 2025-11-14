import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    ...options,
    dedupe: "cancel",
    $fetch: useNuxtApp().$customFetch,

    headers:
      options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json", ...(options.headers || {}) },
  });
}
