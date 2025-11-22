export default defineNuxtRouteMiddleware((to, from) => {
  let token = useCookie("tokenLocal")?.value;

  if (!token) {
    token = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    })?.value;
  }

  if (!token) return navigateTo("/error");
});
