import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import styles from './Saldo.module.scss';
import defaultOptions from './chart-options';

const createOptions = (labels, series) => {
  return {
    labels,
    series: [
      {

        data: series,
      },
    ],
    ...defaultOptions,
  };
};

const Saldo = (props) => {
  const { graphData } = props;
  const {
    saldo,
  } = styles;
  const series = [{
    name: '',
    data: isEmpty(graphData) ? [] : graphData.map((item) => item.value),
  }];
  const labels = isEmpty(graphData) ? [] : graphData.map((item) => moment.unix(item.date).utc().format('DD MMM'));
  const options = createOptions(labels, series);

  return (
    <div className={['panel', saldo].join(' ')}>
      <div className="panel-header">
        <div className="panel-header-title">
          Динамика дневных остатков
        </div>
      </div>
      <div className="panel-body">
        <Chart options={options} series={series} type="area" />
      </div>
    </div>
  );
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Saldo;
