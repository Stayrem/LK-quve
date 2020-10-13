const createOptions = (data, categories) => ({
  series: [
    {
      name: 'Остаток на конец дня: ',
      data,
    },
  ],
  options: {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      width: '100%',
      type: 'area',
      foreColor: '#D7DADB',
      fontFamily: 'Montserrat, sans-serif',
    },
    grid: {
      borderColor: '#707070',
    },
    colors: ['#FFA500'],
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd',
      },
    },
    labels: categories,
  },
});
export default createOptions;
