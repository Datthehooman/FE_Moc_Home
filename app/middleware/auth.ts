export default defineNuxtRouteMiddleware((to, from) => {
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

  if (!token) return navigateTo("/error");
});
