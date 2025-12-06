<template>
  <div
    class="header__navbar row justify-content-between align-items-center"
    style="width: 450px"
  >
    <!-- Component SearchMenu -->
    <SearchMenu />

    <!-- Component SignupMenu -->
    <SignupMenu />
  </div>
</template>

<script>
import SearchMenu from "./SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";

export default {
  name: "HeaderNavbar",
  components: {
    SearchMenu,
    SignupMenu,
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
