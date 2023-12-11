import { createVuetify } from "vuetify";

import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
import es from 'date-fns/esm/locale/es'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { en } from "vuetify/locale";

export default defineNuxtPlugin(nuxtApp=>{
    const vuetify = createVuetify({
        date:{
            adapter: DateFnsAdapter,
            locale:{
                es:es
            }
        },
        locale:{
            locale:"es",
            fallback:"en",
            messages:{en}

            
        },
        components,
        directives,
        ssr: true,
        theme:{
            defaultTheme: 'dark'
        }
    })

    nuxtApp.vueApp.use(vuetify)
})