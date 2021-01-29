import Overview from '../../pages/Overview/Overview';
import Incomes from '../../pages/Incomes/Incomes';
import Costs from '../../pages/Costs/Costs';
import Savings from '../../pages/Savings/Savings';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Landing from '../../pages/Landing/Landing';
import routerDict from '../../utils/routesDict';

export default [
  {
    path: routerDict.OVERVIEW,
    component: Overview,
    isProtected: true,
  },
  {
    path: routerDict.INCOMES,
    component: Incomes,
    isProtected: true,
  },
  {
    path: routerDict.COSTS,
    component: Costs,
    isProtected: true,
  },
  {
    path: routerDict.SAVINGS,
    component: Savings,
    isProtected: true,
  },
  {
    path: routerDict.SIGN_UP,
    component: SignUp,
    isProtected: false,
  },
  {
    path: routerDict.SIGN_IN,
    component: SignIn,
    isProtected: false,
  },
  // {
  //   path: routerDict.ROOT,
  //   component: Overview,
  //   isProtected: true,
  // },
  {
    path: routerDict.ROOT,
    component: Landing,
    isProtected: false,
  },
  {
    path: routerDict.NOT_FOUND,
    component: ErrorPage,
    isProtected: false,
  },
];
