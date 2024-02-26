import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useTest1Store = defineStore('useTest1Store', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_TEST),
        
        form:{
            "departamento": "",
            "razon": "",
        },


        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{


    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },

        async enviarArchivo({archivo}){
            const form = {...this.form}
            form.documento = archivo
            console.log(this.pb)
            console.log(form)
            console.log(useRuntimeConfig().public.POCKETBASE_TEST)
            try {
                const record = await this.pb.collection('archivo').create(form);
                console.log(record)
            } catch (error) {
                console.error(error)
                console.error(error.response)
            }
        },

        async verArchivos(){
            try {
                const records = await this.pb.collection('archivo').getFullList({
                    sort: '-created',
                });
                const ulrArchivos = []

                records.forEach((archivo,index)=>{
                    const firstFilename = archivo.documento;
                    const url = this.pb.files.getUrl(archivo,firstFilename)
                    ulrArchivos.push(url+"?download=1")
                    archivo.documento =  url+"?download=1"
                })

                console.log(records)
                return records
            } catch (error) {
                console.error(error)
            }

        }

    },
    
})
