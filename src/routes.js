import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import SignupPage from './components/pages/SignupPage.vue';
import DetailPage from './components/pages/DetailPage.vue';
import UserPage from './components/pages/UserPage.vue';
import Cookies from 'js-cookie';
import { store } from './store/index.js';
import NewRecipePage from './components/pages/NewRecipePage.vue';

const checkAuth = () => {
  const jwtCookie = Cookies.get('jwt');
  const expirationDate = Cookies.get('tokenExpirationDate');
  const userId = Cookies.get('UID');

  if (jwtCookie) {
    if (new Date().getTime() < +expirationDate) {
      // Token is valid, set store state
      store.commit('auth/setToken', {
        idToken: jwtCookie,
        expiresIn: expirationDate
      });
      store.dispatch('auth/getUser', userId);
      return true;
    } else {
      store.commit('auth/setUserLogout');
      return false;
    }
  } else {
    return false;
  }
};

export const routes = [
  { path: '/', name: 'homePage', component: HomePage, beforeEnter: (to, from, next) => checkAuth() ? next() : next('/login') },
  { path: '/login', name: 'loginPage', component: LoginPage },
  { path: '/signup', name: 'signupPage', component: SignupPage },
  { path: '/recipe/:id', name: 'detailPage', component: DetailPage },
  { path: '/user/:component?', name: 'userPage', component: UserPage, beforeEnter: (to, from, next) => checkAuth() ? next() : next('/login') },
  { path: '/new-recipe', name: 'newRecipePage', component: NewRecipePage, beforeEnter: (to, from, next) => checkAuth() ? next() : next('/login') }
];