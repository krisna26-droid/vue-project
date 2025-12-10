<template>
  <div class="header__navbar">
    <div class="container-fluid px-4">
      <div class="row align-items-center g-3">
        <!-- Search Menu - Center -->
        <div class="col">
          <div class="search-wrapper mx-auto">
            <SearchMenu />
          </div>
        </div>

        <!-- Auth Section (Signup or Profile) - Right -->
        <div class="col-auto">
          <Transition name="fade" mode="out-in">
            <component :is="currentComponent" :key="menuComponent"></component>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import SearchMenu from "./SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";

const store = useStore();

// Component mapping
const components = {
  'signup-menu': SignupMenu,
  'profile-menu': ProfileMenu,
};

// Reactive menu component
const menuComponent = ref('signup-menu');

// Get token from store
const getToken = computed(() => store.state.auth?.token || null);

// Computed current component
const currentComponent = computed(() => components[menuComponent.value]);

// Initialize component based on token
const initializeComponent = () => {
  menuComponent.value = getToken.value ? 'profile-menu' : 'signup-menu';
};

// Watch token changes
watch(getToken, (newToken) => {
  menuComponent.value = newToken ? 'profile-menu' : 'signup-menu';
}, { immediate: true });

// Initialize on mount
initializeComponent();
</script>

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