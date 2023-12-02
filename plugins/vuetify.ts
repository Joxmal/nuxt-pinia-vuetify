import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import nuxtConfig from "~/nuxt.config";

export default defineNuxtPlugin(nuxtConfig=>{
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true,
        theme:{
            defaultTheme: 'dark'
        }
    })

    nuxtApp.vueApp.use(vuetify)

})