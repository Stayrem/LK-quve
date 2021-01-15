webpackHotUpdate("main",{

/***/ "./src/pages/Savings/Savings.jsx":
/*!***************************************!*\
  !*** ./src/pages/Savings/Savings.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment_locale_ru__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/locale/ru */ "./node_modules/moment/locale/ru.js");
/* harmony import */ var moment_locale_ru__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_locale_ru__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_dictionary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/dictionary */ "./src/utils/dictionary.js");
/* harmony import */ var _hocs_PageContainer_PageContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hocs/PageContainer/PageContainer */ "./src/hocs/PageContainer/PageContainer.jsx");
/* harmony import */ var _layouts_PageHeadline_PageHeadline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../layouts/PageHeadline/PageHeadline */ "./src/layouts/PageHeadline/PageHeadline.jsx");
/* harmony import */ var _components_PageText_PageText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/PageText/PageText */ "./src/components/PageText/PageText.jsx");
/* harmony import */ var _components_DataBarChart_DataBarChart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/DataBarChart/DataBarChart */ "./src/components/DataBarChart/DataBarChart.jsx");
/* harmony import */ var _components_SavingsAdjuster_SavingsAdjuster__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/SavingsAdjuster/SavingsAdjuster */ "./src/components/SavingsAdjuster/SavingsAdjuster.jsx");
/* harmony import */ var _components_SavingsSum_SavingsSum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/SavingsSum/SavingsSum */ "./src/components/SavingsSum/SavingsSum.jsx");
/* harmony import */ var _store_action_creator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../store/action-creator */ "./src/store/action-creator.js");














const Savings = () => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const date = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.date);
  const savingsCurrentYearList = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.savings);
  const incomesCurrentMonthSum = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.incomesSum);
  const savingsCurrentMonth = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.savingsSelectedMounth);
  const savingsCurrentYearSum = savingsCurrentYearList.reduce((acc, curr) => acc + curr.value, 0);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch(Object(_store_action_creator__WEBPACK_IMPORTED_MODULE_12__["fetchSavings"])());
    dispatch(Object(_store_action_creator__WEBPACK_IMPORTED_MODULE_12__["fetchIncomes"])());
    document.title = `Сбережения | ${_utils_dictionary__WEBPACK_IMPORTED_MODULE_5__["default"].APP_NAME}`;
    return () => dispatch(Object(_store_action_creator__WEBPACK_IMPORTED_MODULE_12__["resetStore"])());
  }, []);
  const breadcrumbs = [{
    name: 'Сбережения',
    url: '#'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "main"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_PageHeadline_PageHeadline__WEBPACK_IMPORTED_MODULE_7__["default"], {
    breadcrumbs: breadcrumbs,
    title: "\u0421\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0438\u044F",
    date: date * 1000
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hocs_PageContainer_PageContainer__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageText_PageText__WEBPACK_IMPORTED_MODULE_8__["default"], {
    text: "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0435\u043B\u0438\u0447\u0438\u043D\u0443 \u0436\u0435\u043B\u0430\u0435\u043C\u044B\u0445 \u0441\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0438\u0439 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446. \u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0434\u0430\u043D\u043D\u043E\u0439 \u0432\u0435\u043B\u0438\u0447\u0438\u043D\u044B \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043D\u0430 \u0438\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0441\u0443\u043C\u043C\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0442\u0440\u0430\u0442\u0438\u0442\u044C \u0437\u0430 \u0434\u0435\u043D\u044C."
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-5 mb-3 mb-lg-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SavingsAdjuster_SavingsAdjuster__WEBPACK_IMPORTED_MODULE_10__["default"], {
    date: date,
    incomesCurrentMonthSum: incomesCurrentMonthSum,
    savingsCurrentMonthSum: savingsCurrentMonth.value
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SavingsSum_SavingsSum__WEBPACK_IMPORTED_MODULE_11__["default"], {
    value: savingsCurrentYearSum
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DataBarChart_DataBarChart__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: "\u0414\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u0441\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0438\u0439 \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C",
    graphData: savingsCurrentYearList
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Savings);

/***/ })

})
//# sourceMappingURL=main.e67308debb7286357c32.hot-update.js.map