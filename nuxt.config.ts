// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:true,
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
  ],

  runtimeConfig:{
    public:{
      POCKETBASE_URL: process.env.POCKETBASE_URL
    }
  },
})
