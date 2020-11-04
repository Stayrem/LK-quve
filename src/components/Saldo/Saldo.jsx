import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import createOptions from './utils';
import styles from './Saldo.module.scss';

const Saldo = (props) => {
  const { graphData } = props;
  const data = graphData.map((it) => it.value);
  const categories = graphData.map((expensesItem) => expensesItem.date * 1000);
  const [chartOptions] = useState(createOptions(data, categories));
  const { options, series } = chartOptions;
  const { saldo, title, graphWrapper } = styles;
  return (
    <div className={saldo}>
      <p className={title}>Динамика дневных остатков</p>
      <div className={graphWrapper}>
        <Chart options={options} series={series} height="100%" />
      </div>
    </div>
  );
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Saldo;
