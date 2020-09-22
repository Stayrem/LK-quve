import 'moment/locale/ru';
import moment from 'moment';
import { toJS } from 'mobx';

const getSpendingsSum = (arr) => {
  const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.value, 10);
  return arr.reduce(reducer, 0);
};

const createOverviewStore = () => ({
  date: null,
  fetchError: false,
  isOverwiewDataFetched: false,
  isSaldoDataFetched: false,

  income: null,
  fixedCosts: null,
  savingPercent: null,
  savingSum: null,
  profit: null,

  spendingsLastSum: null,
  spendingsTodayList: [],
  spendingsTodaySum: null,

  saldoData: [],

  budgetFixed: null,
  budgetToday: null,

  restSum: null,
  restPercent: null,

  async getOverviewData() {
    try {
      const saldoResponse = await fetch('/mocks/saldo.json');
      const dataResponse = await fetch('/mocks/overview/get.json');
      let saldo = await saldoResponse.json();
      let data = await dataResponse.json();
      saldo = saldo.data;
      data = data.data;

      this.date = moment.unix(data.date).utc();

      this.income = data.income;
      this.fixedCosts = data.fixed_costs;
      this.savingPercent = data.saving_percent;
      this.savingSum = data.saving_sum === null
        ? (data.income * data.saving_percent) / 100 : data.saving_sum;
      this.profit = this.income - this.savingSum - this.fixedCosts;

      this.spendingsLastSum = data.spendings_last_value;
      this.spendingsTodayList = data.spendings_today_list;
      this.spendingsTodaySum = getSpendingsSum(this.spendingsTodayList);

      this.saldoData = saldo.saldo_history;

      this.budgetFixed = Math.floor(this.profit / moment(this.date).daysInMonth());
      this.budgetToday = this.saldoData[this.saldoData.length - 1].value + this.budgetFixed;

      this.restSum = this.profit - this.spendingsLastSum - this.spendingsTodaySum;
      this.restPercent = Math.floor((this.restSum / this.profit) * 100);
      this.restPercent = this.restPercent > 0 ? this.restPercent : 0;
      this.isSaldoDataFetched = true;
      this.isOverwiewDataFetched = true;
    } catch (err) {
      this.fetchError = true;
    }
  },
  editSpending(obj) {
    const modified = toJS(this.spendingsTodayList).map((item) => {
      if (item.id !== obj.id) {
        return item;
      }
      return {
        ...item,
        ...obj,
      };
    });
    this.spendingsTodayList = modified;
    this.spendingsTodaySum = getSpendingsSum(modified);
    this.restSum = this.profit - this.spendingsLastSum - this.spendingsTodaySum;
    this.restPercent = Math.floor((this.restSum / this.profit) * 100);
    this.restPercent = this.restPercent > 0 ? this.restPercent : 0;
  },
  addSpending() {
    this.spendingsTodayList.push({ id: this.spendingsTodayList.length, value: 0 });
  },
  removeSpending(id) {
    this.spendingsTodayList = this.spendingsTodayList.slice(0, id);
  },
});

export default createOverviewStore;
