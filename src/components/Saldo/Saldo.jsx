import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import * as moment from 'moment';

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
    title,
    graphWrapper,
  } = styles;
  const series = [{
    name: '',
    data: graphData.map((item) => item.value),
  }];
  const labels = graphData.map((item) => moment.unix(item.date).utc().format('DD MMM'));
  const options = createOptions(labels, series);

  return (
    <div className={saldo}>
      <p className={title}>Динамика дневных остатков</p>
      <div className={graphWrapper}>
        <Chart options={options} series={series} type="area" />
      </div>
    </div>
  );
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Saldo;
