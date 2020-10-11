/* eslint-disable no-underscore-dangle */
/* eslint-disable no-new */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApexCharts from 'apexcharts';
import styles from './Saldo.module.scss';

const createOptions = (data, categories) => {
  const options = {
    series: [
      {
        name: 'Остаток на конец дня: ',
        data,
      },
    ],
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      height: '100%',
      width: '100%',
      type: 'area',
      foreColor: '#D7DADB',
      fontFamily: 'Montserrat, sans-serif',
    },
    grid: {
      borderColor: '#707070',
    },
    colors: ['#FFA500'],
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd',
      },
    },
    labels: categories,
  };
  return options;
};

const Saldo = (props) => {
  const { graphData } = props;
  const graph = useRef(null);
  const data = graphData.map((it) => it.value);
  const categories = graphData.map((expensesItem) => expensesItem.date * 1000);
  const options = createOptions(data, categories);

  useEffect(() => {
    const chart = new ApexCharts(graph.current, options);
    chart.render();
  }, []);

  const { saldo, title, graphWrapper } = styles;
  return (
    <div className={saldo}>
      <p className={title}>Динамика дневных остатков</p>
      <div className={graphWrapper}>
        <div ref={graph} />
      </div>
    </div>
  );
};

Saldo.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Saldo;
