import * as moment from 'moment';
import 'moment/locale/ru';
import { toJS } from 'mobx';

const daysCount = moment().daysInMonth();
const getSpendingsSum = (arr) => {
  const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.value, 10);
  return arr.reduce(reducer, 0);
};

const createOverviewStore = () => ({
  isOverwiewDataFetched: false,
  isSaldoDataFetched: false,
  income: null,
  dayBudjet: null,
  fixedCosts: null,
  savingPercent: null,
  savingSum: null,
  spendings: [],
  daySpendings: null,
  saldoData: [],
  async getOverviewData() {
    let data;
    let saldo;
    await fetch('/mocks/overview/get.json')
      .then((response) => response.json())
      .then((json) => {
        data = json.data;
      });
    await fetch('/mocks/saldo.json')
      .then((response) => response.json())
      .then((json) => {
        saldo = json.data;
      });
    this.income = data.income;
    this.fixedCosts = data.fixed_costs;
    this.savingPercent = data.saving_percent;
    this.savingSum = (data.income * data.saving_percent) / 100;
    this.spendings = data.spendings;
    this.daySpendings = getSpendingsSum(this.spendings);
    this.dayBudjet = Math.floor((this.income - this.savingSum - this.fixedCosts
      - this.daySpendings) / daysCount);
    this.saldoData = saldo.saldo_history;
    this.isSaldoDataFetched = true;
  },
  editSpending(obj) {
    const modified = toJS(this.spendings).map((item) => {
      if (item.id !== obj.id) {
        return item;
      }
      return {
        ...item,
        ...obj,
      };
    });
    this.spendings = modified;
    this.daySpendings = getSpendingsSum(modified);
    this.dayBudjet = Math.floor((this.income - this.savingSum - this.fixedCosts
      - this.daySpendings) / daysCount);
  },
  addSpending() {
    this.spendings.push({ id: this.spendings.length });
  },
});

export default createOverviewStore;
