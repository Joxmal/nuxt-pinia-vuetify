import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const usemapaOficinas = defineStore('usemapaOficinas', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        //datos entregados
        datos:null,
        //formulario para crear oficina
        form:{
            piso:'',
            oficina:"",
            imagen:null,
        },
        cargando:false,
        envioExitosoOficina:false,
        eliminarExitosoOficina:false,
        editarExitosoOficina:false,
        ocurrioUnError:false
    }), 
    getters:{
       
    },
    actions:{
        async obtenerDatos(NumeroPiso) {
            return new Promise(async (resolve, reject) => {
              try {
                let records;
                setTimeout(async () => {
                  records = await this.pb.collection('mapasOficinas').getFullList({
                    sort: '-created',
                    filter: `piso="${NumeroPiso}"`
                  });
                  console.log(records);
                  this.datos = records;
                  resolve(records);
                }, 500);
              } catch (error) {
                reject(error);
              }
            })
        },
        async crearOficina(){

            try {
                this.cargando = true
                await this.pb.collection('mapasOficinas').create(this.form);
                this.envioExitosoOficina = true
                this.cargando = false
                setTimeout(() => {
                    this.envioExitosoOficina = false
                }, 2000);
            } catch (error) {
                return "se crea una a la vez"                
            }
        },
        async editarOficina({ID_Oficina}){
            try {
                this.cargando = true
                const data = {...this.form}
                if(this.form.imagen === null){
                    delete data.imagen
                }
                await this.pb.collection('mapasOficinas').update(ID_Oficina, data);
                this.form.imagen= null
                this.cargando = false

                this.editarExitosoOficina = true
                setTimeout(() => {
                    this.editarExitosoOficina = false
                }, 3000);
            } catch (error) {
                console.log(error)
            }


        },

        async EliminarOficina({ID_Oficina}){
            try {
                const confirmacion = confirm('quieres Eliminar esta Oficina ?')

                if (confirmacion){
                    await this.pb.collection('mapasOficinas').delete(ID_Oficina);
                    this.eliminarExitosoOficina = true
                    setTimeout(() => {
                        this.eliminarExitosoOficina = false
                    }, 1000);
                }else{
                    console.log("se cancelo la eliminacion")
                    return true
                }

            } catch (error) {
                console.log('error al eliminar la oficina '+ ID_Oficina)
                this.ocurrioUnError = true
                setTimeout(() => {
                this.ocurrioUnError = false 
                }, 5000);
            }
 
        },


    },
})
