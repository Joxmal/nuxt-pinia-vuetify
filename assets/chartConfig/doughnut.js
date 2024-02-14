  // import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';

export const DefaultchartData = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],

      }
    ]
}

export const DefaultOptions = {
  layout:{
    padding:0,
  },
  responsive: true,
  maintainAspectRatio: false,
  pieceLabel: {
    mode: 'percentage'
  },
  plugins: {
    title: {
      display: true,
      // text: 'Custom Chart Title',
      padding: {top: 0, left: 0, right: 0, bottom: 10}
    },
    
    datalabels: {
      // Configuración específica del complemento
      anchor:'end',
      align:'end',
      formatter: ((value,ctx)=>{
              let totalSum = 0;
        const datasetData = ctx.dataset.data;

        // Verifica que datasetData sea un array válido y los valores sean numéricos
        for (let i = 0; i < datasetData.length; i++) {
          totalSum += parseInt(datasetData[i]) ;
 
        }
        const percentage = (value / totalSum) * 100;

        return `${percentage.toFixed(1)}%`;
      }),
      font: {
        weight: 'bold',
        size: 16
      }
    },

    legend: {
      display: true,
      position: 'bottom',

      
      labels:{
        color: 'hsla(218, 78%, 53%, 1)',
        padding:20,
        font: {
          size: 18,
          weight: "bold"
        },
        
      },
    },
    tooltip: {

    },
  },

}

