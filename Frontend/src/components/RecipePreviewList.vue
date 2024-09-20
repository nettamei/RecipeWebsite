<template>
  <b-container>
    <h3>
      <!-- {{ title }} -->
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :isFromMyRecipes="isFromMyRecipes"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
    isFromMyRecipes: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
