export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token", {
    path: "/",
    domain: ".mocfurni.shop",
  })?.value;
  if (!token) return navigateTo("/error");
});
