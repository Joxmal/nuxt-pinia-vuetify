  // import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';

export const DefaultchartData = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
      {
        backgroundColor: [
          'rgba(133, 73, 186, 0.6)',
          'rgba(0, 169, 80, 0.6)',
          'rgba(22, 106, 143, 0.6)',
          'rgba(172, 194, 54, 0.6)',
          'rgba(83, 123, 196, 0.6)',
          'rgba(245, 55, 148, 0.6)',
          'rgba(246, 112, 25, 0.6)',
          'rgba(77, 201, 246, 0.6)',
          'rgba(88, 89, 91, 0.6)',
          'rgba(133, 73, 186, 0.6)',
          'rgba(0, 169, 80, 0.6)',
          'rgba(22, 106, 143, 0.6)',
          'rgba(172, 194, 54, 0.6)',
          'rgba(83, 123, 196, 0.6)',
          'rgba(245, 55, 148, 0.6)',
          'rgba(246, 112, 25, 0.6)',
          'rgba(77, 201, 246, 0.6)',
          'rgba(88, 89, 91, 1)'
        ],
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

      onHover: handleHover,
      onLeave: handleLeave,
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


function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
  });
  legend.chart.update();
}

function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
  });
  legend.chart.update();
}