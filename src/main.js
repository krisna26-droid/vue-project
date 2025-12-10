import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import { store } from './store/index'
import Cookies from 'js-cookie'

// Router config
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// NAVIGATION GUARD - Authentication
router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('jwt')
  const uid = Cookies.get('UID')
  const isAuthenticated = token && uid

  // Cek apakah user sudah login di Vuex store
  const isLoggedInStore = store.getters['auth/isAuthenticated']

  // Jika ada token tapi belum login di store, coba auto login
  if (token && uid && !isLoggedInStore) {
    try {
      await store.dispatch('auth/autoLogin')
    } catch (error) {
      console.error('Auto login failed:', error)
    }
  }

  // Jika route membutuhkan auth tapi user belum login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // Jika route untuk guest (login/signup) tapi user sudah login
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
  }
  // Selain itu, lanjutkan
  else {
    next()
  }
})

// Create app instance
const app = createApp(App)

// Use plugins
app.use(router)
app.use(store)

// Mount app
app.mount('#app')