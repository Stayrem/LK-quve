const defaultOptions = {
  chart: {
    type: 'area',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    foreColor: '#C6C9DA',
    fontFamily: 'Montserrat, sans-serif',
    width: '100%',
    parentHeightOffset: 0,
    offsetY: 0,
    offsetX: 0,
  },
  grid: {
    borderColor: '#454C76',
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {

  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        fontSize: '10px',
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '11px',
        fontWeight: 500,
      },
    },
  },
  colors: ['#FAC620'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.2,
      stops: [0, 100],
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  noData: {
    text: 'Загрузка данных...',
  },
  responsive: [
    {
      breakpoint: 425,
      options: {
        yaxis: {
          labels: {
            style: {
              fontSize: '7px',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '7px',
            },
          },
        },
      },
    },
    {
      breakpoint: 768,
      options: {
        yaxis: {
          labels: {
            style: {
              fontSize: '10px',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '8px',
            },
          },
        },
      },
    },
    {
      breakpoint: 1280,
      options: {
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
      },
    },
  ],
};

export default defaultOptions;
