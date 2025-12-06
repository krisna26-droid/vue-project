<script setup>
import NavigationBar from "./NavigationBar.vue";
</script>

<template>
  <header
    class="shadow-sm container-fluid bg-white py-3 border-bottom fixed-top"
  >
    <div class="container-md d-flex justify-content-between align-items-center">

      <!-- Logo → Go to Homepage -->
      <router-link :to="{ name: 'homePage' }">
        <img 
          src="@/assets/images/Logo.png" 
          alt="Logo" 
          style="cursor: pointer;"
        />
      </router-link>

      <NavigationBar />
    </div>
  </header>
</template>
