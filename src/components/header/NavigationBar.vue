<template>
  <div
    class="header__navbar row justify-content-between align-items-center"
    style="width: 450px"
  >
    <!-- Component SearchMenu -->
    <SearchMenu />

    <!-- Component SignupMenu or ProfileMenu -->
    <component :is="components[menuComponent]"></component>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import SearchMenu from "./SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";

export default {
  name: "HeaderNavbar",
  components: {
    SearchMenu,
    SignupMenu,
    ProfileMenu,
  },
  setup() {
    const menuComponent = ref("signup-menu");
    const store = useStore();

    const components = {
      'signup-menu': SignupMenu,
      'profile-menu': ProfileMenu,
    };

    const getToken = computed(() => {
      return store.state.auth.token;
    });

    // Set initial component based on token
    if (getToken.value) {
      menuComponent.value = "profile-menu";
    } else {
      menuComponent.value = "signup-menu";
    }

    // Watch token changes
    watch(getToken, (newValue) => {
      if (newValue) {
        menuComponent.value = "profile-menu";
      } else {
        menuComponent.value = "signup-menu";
      }
    });

    return {
      menuComponent,
      components,
    };
  },
};
</script>

<style scoped>
/* Optional styling */
.header__navbar {
  display: flex;
  gap: 12px;
}
</style>