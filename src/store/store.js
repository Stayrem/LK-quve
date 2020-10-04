import 'moment/locale/ru';
import moment from 'moment';
import { toJS } from 'mobx';
import {
  addDataListItem,
  deleteDataListItem,
  editDataListItem,
} from '../utils/data-list-controllers';
import dictionary from '../utils/dictionary';

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
  async getInputData() {
    try {
      const dataResponse = await fetch('/mocks/incomes/get.json');
      let data = await dataResponse.json();
      data = data.data;

      this.date = moment.unix(data.date).utc();
      this.incomesList = data.incomes_list;
      this.incomesSum = getSumByArray(this.incomesList);
      this.costsList = data.costs_list;
      this.costsSum = getSumByArray(this.costsList);
      this.isInputDataFetched = true;
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
    this.spendingsTodaySum = getSumByArray(modified);
  },
  addSpending() {
    this.spendingsTodayList.push({ id: this.spendingsTodayList.length });
  },
  updateDataList(listType, actionType, mutableObject) {
    if (listType === dictionary.DATA_LIST_TYPE_INCOMES) {
      switch (actionType) {
        case 'add':
          this.incomesList = addDataListItem(this.incomesList);
          break;
        case 'delete':
          this.incomesList = deleteDataListItem(mutableObject.id, this.incomesList);
          break;
        case 'edit':
          this.incomesList = editDataListItem(mutableObject, this.incomesList);
          break;
        default:
          break;
      }
      this.incomesSum = getSumByArray(this.incomesList);
    } else if (listType === dictionary.DATA_LIST_TYPE_COSTS) {
      switch (actionType) {
        case 'add':
          this.costsList = addDataListItem(this.costsList);
          break;
        case 'delete':
          this.costsList = deleteDataListItem(mutableObject.id, this.costsList);
          break;
        case 'edit':
          this.costsList = editDataListItem(mutableObject, this.costsList);
          break;
        default:
          break;
      }
      this.costsSum = getSumByArray(this.costsList);
    }
  },
});

export default createStore;
