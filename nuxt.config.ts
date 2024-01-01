// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({

  ssr:false,
  app: {
    
  },
  devtools: { enabled: true },
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
      POCKETBASE_URL: process.env.POCKETBASE_URL
    }
  },
})
