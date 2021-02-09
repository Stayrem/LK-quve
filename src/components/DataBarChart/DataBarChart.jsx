import React from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Chart from 'react-apexcharts';
import { DateTime } from 'luxon';
import styles from './DataBarChart.module.scss';
import defaultOptions from './chart-options';

const createOptions = (labels) => {
  const options = {
    labels,
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
  const labels = isEmpty(graphData) ? [] : graphData.map((item) => DateTime.fromMillis(item.date * 1000).toFormat('MMMM YYYY'));
  const options = createOptions(labels, series);

  return (
    <div className={['panel', dataBarChart].join(' ')}>
      <div className={['panel-header', dataBarChartHeader].join(' ')}>
        <div className={['panel-header-title', dataBarChartTitle].join(' ')}>
          {title}
        </div>
      </div>
      <div className={['panel-body', dataBarChartBody].join(' ')}>
        <Chart
          options={options}
          series={series}
          type="bar"
        />
      </div>
    </div>
  );
};

DataBarChart.defaultProps = {
  graphData: [],
};

DataBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  graphData: PropTypes.arrayOf(PropTypes.any),
};

export default DataBarChart;
