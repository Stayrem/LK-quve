export const defaultOptions = {
  chart: {
    type: 'donut',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    foreColor: '#D7DADB',
    fontFamily: 'Montserrat, sans-serif',
    width: '100%',
    parentHeightOffset: 0,
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: '65%',
      },
    },
  },
  stroke: {
    width: 0,
  },
  noData: {
    text: 'Загрузка данных...',
  },
  responsive: [
    {
      breakpoint: 425,
      options: {
        chart: {
          width: '100%',
          parentHeightOffset: 0,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        chart: {
          width: 350,
        },
      },
    },
    {
      breakpoint: 1280,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          position: 'right',
          horizontalAlign: 'left',
        },
      },
    },
  ],
};
