// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

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
    /* Treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    },
  ],

  runtimeConfig:{
    public:{
      POCKETBASE_URL: process.env.POCKETBASE_URL
    }
  },
})
