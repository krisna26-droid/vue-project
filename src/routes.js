import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import SignupPage from './components/pages/SignupPage.vue';
import DetailPage from './components/pages/DetailPage.vue';
import UserPage from './components/pages/UserPage.vue';
import Cookies from 'js-cookie';
import { store } from './store/index.js'; // Asumsi ini adalah Vuex store Anda
import NewRecipePage from './components/pages/NewRecipePage.vue';

/**
 * @description Memeriksa status otentikasi pengguna. Ini adalah fungsi asinkron 
 * karena mungkin perlu menunggu dispatch store (misalnya getUser) selesai.
 * @returns {Promise<boolean>} True jika otentikasi valid, False sebaliknya.
 */
const checkAuth = async () => {
  const jwtCookie = Cookies.get('jwt');
  const expirationDate = Cookies.get('tokenExpirationDate');
  const userId = Cookies.get('UID');

  if (jwtCookie) {
    // Periksa jika token belum kedaluwarsa berdasarkan cookie
    if (new Date().getTime() < +expirationDate) {
      // Token valid, set state di store
      store.commit('auth/setToken', {
        idToken: jwtCookie,
        expiresIn: expirationDate
      });

      try {
        // Panggil dispatch (asumsi ini adalah operasi asinkron) dan tunggu
        await store.dispatch('auth/getUser', userId);
        return true;
      } catch (error) {
        // Gagal mendapatkan user meski token ada
        console.error("Error fetching user data after token validation:", error);
        store.commit('auth/setUserLogout'); // Logout jika gagal
        return false;
      }
    } else {
      // Token kedaluwarsa berdasarkan waktu local
      store.commit('auth/setUserLogout');
      return false;
    }
  } else {
    // Tidak ada token
    return false;
  }
};

export const routes = [
  // Rute yang Dilindungi (Memerlukan Otentikasi)
  { 
    path: '/', 
    name: 'homePage', 
    component: HomePage, 
    // Gunakan async/await pada beforeEnter
    beforeEnter: async (to, from, next) => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        next(); // Lanjut ke halaman utama
      } else {
        next('/login'); // Redirect ke login jika belum otentikasi
      }
    } 
  },
  { 
    path: '/user/:component?', 
    name: 'userPage', 
    component: UserPage, 
    beforeEnter: async (to, from, next) => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    } 
  },
  { 
    path: '/new-recipe', 
    name: 'newRecipePage', 
    component: NewRecipePage, 
    beforeEnter: async (to, from, next) => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    } 
  },

  // Rute Publik (Tidak Memerlukan Otentikasi)
  { path: '/login', name: 'loginPage', component: LoginPage },
  { path: '/signup', name: 'signupPage', component: SignupPage },
  { path: '/recipe/:id', name: 'detailPage', component: DetailPage }
];