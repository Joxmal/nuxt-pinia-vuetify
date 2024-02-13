
export const defaultBarData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
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
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

export const defaultBarOption = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
      // text: 'Custom Chart Title',
      padding: { top: 0, left: 0, right: 0, bottom: 10 },
    },
    tooltip: {},
  },
}
