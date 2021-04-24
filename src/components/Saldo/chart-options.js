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
  xaxis: {
    type: 'category',
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: [],
        fontSize: '11px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 500,
        cssClass: 'apexcharts-xaxis-label',
      },
      offsetX: 0,
      offsetY: 0,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tickAmount: undefined,
    tickPlacement: 'between',
    min: undefined,
    max: undefined,
    range: undefined,
    floating: false,
    position: 'bottom',
    tooltip: {
      enabled: false,
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
