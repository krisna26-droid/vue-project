import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import SignupPage from './components/pages/SignupPage.vue';
import DetailPage from './components/pages/DetailPage.vue';

export const routes = [
  { 
    path: '/', 
    name: 'homePage', 
    component: HomePage,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    name: 'loginPage', 
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  { 
    path: '/signup', 
    name: 'signupPage', 
    component: SignupPage,
    meta: { requiresGuest: true }
  },
  { 
    path: '/recipe/:id', 
    name: 'detailPage', 
    component: DetailPage,
    meta: { requiresAuth: true }
  }
];