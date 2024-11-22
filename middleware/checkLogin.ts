export default defineNuxtRouteMiddleware((to) => {
  // skip middleware on server (if (import.meta.client) { ... } でも同様)
  if (import.meta.server) return;

  // some processing
  window.localStorage.setItem("key", "value");
});
