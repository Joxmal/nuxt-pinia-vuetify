<template>
        <v-card  title="PREVENTIVO" position="relative" class="" max-width="220">
              <MenuDropdown @editar="recibe" @eliminar="recibe" />
          <v-card-text class="d-flex flex-column justify-center" >
            <div class="font-weight-bold d-flex  justify-space-around">
              <v-chip>2023-12-14</v-chip>
              <v-chip>2023-12-19</v-chip>
            </div>
            <div class="font-weight-bold d-flex  justify-space-around">
              <v-chip>08:32 am</v-chip>
              <v-chip>02:10 pm</v-chip>
            </div>
            <div class="text-blue-darken-1 text-subtitle-1 font-weight-bold text-center py-2">
              RECURSOS HUMANOS
            </div>


              <v-row class="d-flex flex-nowrap flex-column  justify-center ">
                <v-col
                 cols="12"
                 class="mx-auto text-center font-weight-black" 
                >
                  Jose Montes
                </v-col>
                <v-btn size="x-small" icon="mdi-arrow-collapse-down" class="w-fit mx-auto text-center mt-n3 "></v-btn>
                <v-col
                 cols="12" 
                 class="mx-auto text-center mt-n3 font-weight-black" 

                >
                  funcionario
                </v-col>
                <v-col
                 cols="12" 
                 class="mx-auto text-center mt-n3 font-weight-black" 
                >
                <v-chip class="text-h6 text-success">
                  finalizado
                </v-chip>
                  
                </v-col>
              </v-row>

            
          </v-card-text>
        </v-card>


  </template>
  <script setup>

  function recibe(valor){
    console.log(valor)
  }


    const messages = [
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple-lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple-lighten-1',
      },
    ]
  </script>