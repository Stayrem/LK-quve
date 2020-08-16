import * as moment from 'moment';
import 'moment/locale/ru';

const daysCount = moment().daysInMonth();
const getSpendingsSum = (arr) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.value;
  return arr.reduce(reducer, 0);
};

const createOverviewStore = () => ({
  income: null,
  dayBudjet: null,
  fixedCosts: null,
  savingPercent: null,
  savingSum: null,
  spendings: [],
  async getOverviewData() {
    let data;
    await fetch('/mocks/overview/get.json')
      .then((response) => response.json())
      .then((json) => {
        data = json.data;
      });
    this.income = data.income;
    this.fixedCosts = data.fixed_costs;
    this.savingPercent = data.saving_percent;
    this.savingSum = (data.income * data.saving_percent) / 100;
    this.spendings = data.spendings;
    this.dayBudjet = Math.floor((this.income - this.savingSum - this.fixedCosts
      - getSpendingsSum(this.spendings)) / daysCount);
  },
});

export default createOverviewStore;
