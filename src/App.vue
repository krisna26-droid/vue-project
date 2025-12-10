<template>
  <div>
    <WebHeader v-if="isAuthenticated" />
    <router-view></router-view>
    <WebFooter v-if="isAuthenticated" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import WebHeader from "./components/header/WebHeader.vue"
import WebFooter from "./components/footer/WebFooter.vue"

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

onMounted(async () => {
  // Coba auto login saat app dimuat
  try {
    await store.dispatch('auth/autoLogin')
  } catch (error) {
    console.error('Auto login error:', error)
    
    // Jika gagal dan sedang di halaman yang butuh auth, redirect ke login
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/login')
    }
  }
})
</script>

<style></style>