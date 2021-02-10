import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/isEmpty';

import { DateTime } from 'luxon';
import styles from './Saldo.module.scss';
import defaultOptions from './chart-options';
import Tooltip from '../Tooltip/Tooltip';

const createOptions = (labels) => {
  const options = {
    labels,
    ...defaultOptions,
  };
  return options;
};

const Saldo = (props) => {
  const { graphData } = props;
  const {
    saldo,
  } = styles;
  const series = [{
    name: 'Дневной остаток',
    data: isEmpty(graphData) ? [] : graphData.map((item) => parseInt(item.value, 10)),
  }];
  const labels = isEmpty(graphData) ? [] : graphData
    .map((item) => DateTime.fromMillis(item.date * 1000).toFormat('DD MMM'));
  const options = createOptions(labels, series);

  return (
    <div className={['panel', saldo].join(' ')}>
      <div className="panel-header">
        <div className="panel-header-title">
          Динамика дневных остатков
        </div>
        <div className="panel-header-subtitle">
          <Tooltip
            id="saldo"
            text="График показывает динамику дневного дефицита или профицита бюджета. Если линия выше нуля, то с бюджетом всё хорошо, если ниже, то стоит начать сокращать ежедневные траты."
          />
        </div>
      </div>
      <div className="panel-body">
        <Chart options={options} series={series} type="area" />
      </div>
    </div>
  );
};

Saldo.defaultProps = {
  graphData: [],
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any),
};

export default Saldo;
