// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  image: {
    provider: "none", // Disable IPX image optimization
  },
  nitro: { preset: "static" },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxt/image",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    public: {
      apiUrl: "process.env.NUXT_APP_API_URL",
    },
  },
});
