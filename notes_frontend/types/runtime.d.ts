export {};

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    apiBase: string;
  }
}
