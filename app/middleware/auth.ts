export default defineNuxtRouteMiddleware((to, from) => {
  let token = useCookie("tokenLocal");

  if (!token) {
    token = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    });
  }

  if (!token) return navigateTo("/error");
});
