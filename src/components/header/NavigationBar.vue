<script setup>
import SearchMenu from './SearchMenu.vue';
import SignUpMenu from './SignupMenu.vue';
import ProfileMenu from './ProfileMenu.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";

const store = useStore()
const menuComponent = ref("signup-menu")

const components = {
    'signup-menu': SignUpMenu,
    'profile-menu': ProfileMenu
}

const getToken = computed(() => {
    return store.state.auth.token;
});

if (!getToken.value) {
    menuComponent.value = 'signup-menu'
} else {
    menuComponent.value = 'profile-menu'
}

watch(getToken, (newValue, oldValue) => {
    if (!newValue) {
        menuComponent.value = "signup-menu";
    } else {
        menuComponent.value = "profile-menu";
    }
});
</script>

<template>
    <div class="header__navbar row justify-content-between align-items-center" style="width: 450px;">
        <SearchMenu />
        <component :is="components[menuComponent]"></component>
    </div>
</template>

<style scoped>
.header__navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.container-fluid {
  max-width: 1400px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #212529;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.navbar-brand:hover {
  color: #4c4ddc;
}

.brand-icon {
  font-size: 1.75rem;
  line-height: 1;
}

.brand-text {
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

/* Search wrapper - centered */
.search-wrapper {
  max-width: 500px;
  width: 100%;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .search-wrapper {
    max-width: 400px;
  }
}

@media (max-width: 767px) {
  .header__navbar {
    padding: 0.75rem 0;
  }
  
  .brand-text {
    font-size: 1.1rem;
  }
  
  .brand-icon {
    font-size: 1.5rem;
  }
  
  .search-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .brand-text {
    display: none;
  }
  
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Better spacing */
.row {
  --bs-gutter-x: 1.5rem;
}
</style>