/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import styles from './Saldo.module.scss';

const createGraph = (ctx, labels, values) => {
  const saldoGraph = ctx;

  Chart.defaults.global.defaultFontFamily = 'Montserrat';
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.defaultFontColor = '#D7DADB';

  const saldoData = {
    labels,
    datasets: [{
      data: values,
      borderColor: 'rgba(255, 165, 0, 1)',
      backgroundColor: 'rgba(255, 165, 0, 0.2)',
    }],
  };

  const chartOptions = {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
      }],
      yAxes: [{
        gridLines: {
          color: '#707070',
        },
      }],
    },
  };

  new Chart(saldoGraph, {
    type: 'line',
    data: saldoData,
    options: chartOptions,
  });
};

const Saldo = (props) => {
  const { graphData } = props;
  const dates = graphData.map((it) => moment(it.date).format('DD.MM'));
  const fullDates = graphData.map((it) => moment(it.date).format('DD MMMM YYYY'));
  const values = graphData.map((it) => it.value);
  const { saldo, title, graphWrapper } = styles;
  const graph = useRef(null);
  useEffect(() => {
    const context = graph.current.getContext('2d');
    createGraph(context, dates, values, fullDates);
  }, []);
  return (
    <div className={saldo}>
      <p className={title}>Динамика дневного сальдо</p>
      <div className={graphWrapper}>
        <canvas ref={graph} />
      </div>
    </div>
  );
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Saldo;
