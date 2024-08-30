import type { Plugin, ViteDevServer } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  vite: {
    plugins: [delayIndexCssPlugin()],
  },

  css: ["~/assets/css/index.css"],
  devtools: { enabled: true },
  compatibilityDate: "2024-08-30",
});

function delayIndexCssPlugin(): Plugin {
  let server: ViteDevServer;
  return {
    name: "delay-index-css",
    enforce: "pre",
    configureServer(_server) {
      server = _server;
    },
    async load(id) {
      if (server && id.includes("index.css")) {
        await server.waitForRequestsIdle(id);
      }
    },
  };
}
