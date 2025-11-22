import type { UseFetchOptions } from "nuxt/app";

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();

  // Determine token name based on environment
  const tokenName = config.public.isDevelopment ? "tokenLocal" : "token";
  const tokenDomain = config.public.isDevelopment
    ? undefined
    : ".mocfurni.shop";

  const token = useCookie(tokenName, {
    path: "/",
    domain: tokenDomain,
  })?.value;

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
