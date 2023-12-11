// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  plugins:[
    '~/plugins/pinia-plugin.js'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules:[
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',

  ],
  i18n:{
    locale: 've',
    messages: {
      ve: {
        welcome: 'el esequivo es nuestro'
      },
    }
  },

  runtimeConfig:{
    public:{
      POCKETBASE_URL: process.env.POCKETBASE_URL
    }
  },
})
