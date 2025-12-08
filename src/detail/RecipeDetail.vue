<template>
  <RecipeDescription />
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeDescription from "@/detail/RecipeDescription.vue";

const route = useRoute();
const store = useStore();


const recipeId = route.params.id;

onMounted(async () => {
  await store.dispatch("recipe/getRecipeDetail", recipeId);
});
</script>