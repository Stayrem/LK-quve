const defaultOptions = {
  chart: {
    type: 'bar',
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
  grid: {
    borderColor: '#707070',
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '60%',
      dataLabels: {
        enabled: false,
        position: 'top',
      },
    },
  },
  xaxis: {
    type: 'category',
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
      formatter(val) {
        return `${val / 1000}k`;
      },
    },
  },
  colors: ['#6DBCDB'],
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
  responsive: [
    {
      breakpoint: 425,
      options: {
        yaxis: {
          labels: {
            style: {
              fontSize: '7px',
            },
            formatter(val) {
              return `${val / 1000}k`;
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
        dataLabels: {
          enabled: false,
        },
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
