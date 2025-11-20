import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const token = useCookie("token", {
    path: "/",
    domain: ".mocfurni.shop",
  });

  return useFetch(url, {
    ...options,
    dedupe: "cancel",

    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    },
  });
}
