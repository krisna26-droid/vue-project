<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewRecipe">
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <BaseInput type="file" identity="recipeImage" label="Photo Recipe" @input="checkImage" />
            <div>
              <img :src="recipeData.imageLink" :alt="recipeData.name" class="image"></img>
            </div>
          </div>
          <div class="mb-3">
            <BaseInput type="text" identity="recipeTitle" placeholder="Give your recipe a title" label="Recipe Title" v-model="recipeData.name" />
          </div>
          <div class="mb-3">
            <BaseTextArea identity="recipeDescription" label="Description" placeholder="Share story behind recipe and what is make it special" v-model="recipeData.description" />
          </div>
          <div class="mb-3">
            <label class="fw-semibold">Recipe Category <span style="color: #cb3a31">*</span></label>
            <BaseSelect id="recipeCategory" :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']" v-model="recipeData.category" />
          </div>
        </div>
      </div>
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <div class="mb-3">
            <BaseInput type="number" identity="prepTime" placeholder="0" label="Prep Time" v-model="recipeData.prepTime" />
          </div>
          <div class="mb-3">
            <BaseInput type="number" identity="cookTime" placeholder="0" label="Cook Time" v-model="recipeData.cookTime" />
          </div>
          <div class="mb-3">
            <BaseInput type="number" identity="totalTime" placeholder="0" label="Total Time" v-model="recipeData.totalTime" @totalTimeFocus="totalTime" readonly="1" />
          </div>
        </div>
      </div>
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).</p>
        <div>
          <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
            <div class="col-lg-11 col-11">
              <BaseInput type="text" identity="ingredient" label="Ingredient" placeholder="Ex: 1 cup sugar" v-model="recipeData.ingredients[count - 1]" />
            </div>
            <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" @click="deleteIngredient(count - 1)">
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @click="addIngredient">
          <i class="fa-solid fa-plus me-2"></i>Add More
        </BaseButton>
      </div>
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe</p>
        <div>
          <div class="mb-3 row" v-for="count in directionCount" :key="count">
            <div class="col-lg-11 col-11">
              <BaseInput type="text" identity="direction" label="Direction" placeholder="Ex: Preheat oven to 350°F" v-model="recipeData.directions[count - 1]" />
            </div>
            <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" @click="deleteDirection(count - 1)">
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @click="addDirection">
          <i class="fa-solid fa-plus me-2"></i>Add More
        </BaseButton>
      </div>
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <BaseButton class="cancel-btn px-3 py-2 ms-1" type="button">Cancel</BaseButton>
        <BaseButton class="submit-recipe-btn px-3 py-2 ms-1" type="submit">Submit</BaseButton>
      </div>
    </form>
  </li>
</template>

<script setup>
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextArea from '@/components/ui/BaseTextArea.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { reactive, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  isEdit: { type: Boolean, default: false }
});

const store = useStore();
const router = useRouter();

const recipeData = reactive({
  imageLink: '',
  name: '',
  description: '',
  category: '',
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
});

const ingredientCount = ref(1);
const directionCount = ref(1);

onMounted(() => {
  if (props.isEdit) {
    const detail = store.state.recipeDetail;
    Object.assign(recipeData, detail);
    ingredientCount.value = recipeData.ingredients.length;
    directionCount.value = recipeData.directions.length;
  }
});

const addIngredient = () => {
  ingredientCount.value++;
};

const addDirection = () => {
  directionCount.value++;
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener('load', () => {
    recipeData.imageLink = reader.result;
  });
};

const deleteIngredient = (index) => {
  if (ingredientCount.value > 1) {
    recipeData.ingredients.splice(index, 1);
    ingredientCount.value--;
  }
};

const deleteDirection = (index) => {
  if (directionCount.value > 1) {
    recipeData.directions.splice(index, 1);
    directionCount.value--;
  }
};

const totalTime = () => {
  recipeData.totalTime = parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime);
};

const addNewRecipe = async () => {
  await store.dispatch('recipe/addNewRecipe', recipeData);
  router.push('/user/user-recipe');
};
</script>

<style scoped>
.image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>