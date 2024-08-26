// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  ssr:false,

  app: {
    
  },

  plugins:[

  ],

  devtools: { enabled: false },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  modules:[
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    /* Treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
  ],

  runtimeConfig:{
    public:{
      POCKETBASE_URL: process.env.POCKETBASE_URL,
      POCKETBASE_TEST: process.env.POCKETBASE_TEST
    }
  },

  compatibilityDate: '2024-08-25',
})