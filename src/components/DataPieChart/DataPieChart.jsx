import React from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Chart from 'react-apexcharts';
import styles from './DataPieChart.module.scss';
import { defaultOptions } from './chart-options';

const createOptions = (labels) => {
  const options = {
    labels,
    ...defaultOptions,
  };
  return options;
};

const DataPieChart = (props) => {
  const { title, graphData } = props;
  const {
    dataPieChart,
    dataPieChartHeader,
    dataPieChartTitle,
    dataPieChartBody,
  } = styles;
  const series = isEmpty(graphData) ? [] : graphData
    .filter((item) => item.value)
    .map((item) => parseInt(item.value, 10));
  const labels = isEmpty(graphData) ? [] : graphData
    .filter((item) => item.category)
    .filter((item) => item.category)
    .map((item) => item.category);
  const options = createOptions(labels);

  return (
    <div className={['panel', dataPieChart].join(' ')}>
      <div className={['panel-header', dataPieChartHeader].join(' ')}>
        <div className={['panel-header-title', dataPieChartTitle].join(' ')}>
          {title}
        </div>
      </div>
      <div className={['panel-body', dataPieChartBody].join(' ')}>
        <Chart
          options={options}
          series={series}
          type="donut"
        />
      </div>
    </div>
  );
};

DataPieChart.defaultProps = {
  graphData: [],
};

DataPieChart.propTypes = {
  title: PropTypes.string.isRequired,
  graphData: PropTypes.arrayOf(PropTypes.any),
};

export default DataPieChart;
