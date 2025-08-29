/**
 * Nuxt configuration for notes frontend.
 * - Public runtime config exposes API base via NUXT_PUBLIC_API_BASE
 * - Global CSS includes our theme
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  runtimeConfig: {
    public: {
      // Map to .env NUXT_PUBLIC_API_BASE, do not hardcode
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
    }
  },
  app: {
    head: {
      title: 'Notes',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
