/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import styles from './DataPieChart.module.scss';

const createOptions = (series, labels) => {
  const options = {
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
    },
    legend: {
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
    labels,
  };
  return options;
};

const DataPieChart = (props) => {
  const { graphData } = props;
  const {
    dataPieChart,
    dataPieChartHeader,
    dataPieChartTitle,
    dataPieChartBody,
  } = styles;
  const series = graphData
    .filter((item) => item.status && item.value)
    .map((item) => parseInt(item.value, 10));
  const labels = graphData
    .filter((item) => item.status && item.name)
    .map((item) => item.name);
  const options = createOptions(series, labels);

  return (
    <div className={dataPieChart}>
      <div className={dataPieChartHeader}>
        <div className={dataPieChartTitle}>
          Структура постоянных расходов
        </div>
      </div>
      <div className={dataPieChartBody}>
        <Chart
          options={options}
          series={series}
          type="donut"
        />
      </div>
    </div>
  );
};

DataPieChart.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default DataPieChart;
