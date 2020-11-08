import React from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Chart from 'react-apexcharts';
import moment from 'moment';
import styles from './DataBarChart.module.scss';
import defaultOptions from './chart-options';

const createOptions = (labels, series) => {
  const options = {
    labels,
    series: [
      {
        data: series,
      },
    ],
    ...defaultOptions,
  };
  return options;
};

const DataBarChart = (props) => {
  const {
    title,
    graphData,
  } = props;
  const {
    dataBarChart,
    dataBarChartHeader,
    dataBarChartTitle,
    dataBarChartBody,
  } = styles;
  const series = [{
    name: '',
    data: isEmpty(graphData) ? [] : graphData.map((item) => parseInt(item.value, 10)),
  }];
  const labels = isEmpty(graphData) ? [] : graphData.map((item) => moment.unix(item.month).utc().format('MMMM'));
  const options = createOptions(labels, series);

  return (
    <div className={dataBarChart}>
      <div className={dataBarChartHeader}>
        <div className={dataBarChartTitle}>
          {title}
        </div>
      </div>
      <div className={dataBarChartBody}>
        <Chart
          options={options}
          series={series}
          type="bar"
        />
      </div>
    </div>
  );
};

DataBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default DataBarChart;
