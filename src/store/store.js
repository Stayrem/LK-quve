import 'moment/locale/ru';
import moment from 'moment';
import { toJS } from 'mobx';

const TYPE_INCOME = 'income';
const TYPE_COSTS = 'costs';

const getSumByArray = (arr) => {
  const reducer = (accumulator, currentItem) => {
    if (currentItem.value !== '' && currentItem.status !== false) {
      return accumulator + parseInt(currentItem.value, 10);
    }
    return accumulator;
  };
  return arr.reduce(reducer, 0);
};

const createStore = () => ({
  date: null,
  incomesSum: null,
  incomesList: [],
  costsSum: null,
  costsList: null,
  savingsPercent: null,
  savingsSum: null,
  spendingsPreviousSum: null,
  spendingsTodayList: [],
  spendingsTodaySum: null,
  saldoData: [],

  fetchError: false,
  isOverwiewDataFetched: false,
  isSaldoDataFetched: false,
  isInputDataFetched: false,

  /* OVERVIEW DATA */
  async getOverviewData() {
    try {
      const saldoResponse = await fetch('/mocks/overview/saldo.json');
      const dataResponse = await fetch('/mocks/overview/get.json');
      let saldo = await saldoResponse.json();
      let data = await dataResponse.json();
      saldo = saldo.data;
      data = data.data;

      this.date = moment.unix(data.date).utc();
      this.incomesSum = data.incomes_sum;
      this.costsSum = data.costs_sum;
      this.savingsPercent = data.savings_percent;
      this.savingsSum = data.savings_sum === null
        ? (data.incomes_sum * data.savings_percent) / 100 : data.savings_sum;
      this.spendingsPreviousSum = data.spendings_previous_sum;
      this.spendingsTodayList = data.spendings_today_list;
      this.saldoData = saldo.saldo_history;
      this.spendingsTodaySum = getSumByArray(this.spendingsTodayList);
      this.isSaldoDataFetched = true;
      this.isOverwiewDataFetched = true;
    } catch (err) {
      this.fetchError = true;
    }
  },
  /* INPUT LIST DATA */
  async getInputData() {
    try {
      const dataResponse = await fetch('/mocks/incomes/get.json');
      let data = await dataResponse.json();
      data = data.data;

      this.date = moment.unix(data.date).utc();
      this.incomesList = data.incomes_list;
      this.incomesSum = getSumByArray(this.incomesList);
      this.isInputDataFetched = true;
    } catch (err) {
      this.fetchError = true;
    }
  },
  /* OVERVIEW ACTIONS */
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
    this.spendingsTodaySum = getSumByArray(modified);
  },
  addSpending() {
    this.spendingsTodayList.push({ id: this.spendingsTodayList.length });
  },
  /* INPUT LIST ACTIONS */
  addInputListItem(type) {
    if (type === TYPE_INCOME) {
      const incomesListLength = this.incomesList.length;
      if (incomesListLength === 0) {
        this.incomesList.push({
          id: 0,
          name: '',
          value: '',
          status: true,
        });
      } else if (
        this.incomesList[incomesListLength - 1].name
        && this.incomesList[incomesListLength - 1].value
      ) {
        this.incomesList.push({
          id: this.incomesList[incomesListLength - 1].id + 1,
          name: '',
          value: '',
          status: true,
        });
        this.incomesSum = getSumByArray(this.incomesList);
      }
    } else if (type === TYPE_COSTS) {
      // TODO: Добавление коста
    }
  },
  deleteInputListItem(type, id) {
    if (type === TYPE_INCOME) {
      this.incomesList.splice(this.incomesList.findIndex((i) => i.id === id), 1);
      this.incomesSum = getSumByArray(this.incomesList);
    }
  },
  editInputListItem(type, editedItem) {
    if (type === TYPE_INCOME) {
      const foundIndex = this.incomesList.findIndex((i) => i.id === editedItem.id);
      this.incomesList[foundIndex] = editedItem;
      this.incomesSum = getSumByArray(this.incomesList);
    }
  },
});

export default createStore;
