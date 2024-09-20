<template>
  <div class="main-container">
    <div class="page-title">
      <h1>Welcome to Reciplease</h1>
    </div>
    <div class="columns-container">
      <div class="column">
        <RecipePreviewList :recipes="firstColumnRecipes" />
      </div>
      <div class="column">
        <div :class="{ blurred: !$root.store.username }">
          <RecipePreviewList :recipes="secondColumnRecipes" />
        </div>
        <div v-if="!$root.store.username" class="login-overlay">
          <LoginPage />
        </div>
      </div>
    </div>
    <b-button variant="secondary" class="new-recipes-button" @click="refreshRandomRecipes">New Random Recipes</b-button>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage.vue";

export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  data() {
    return {
      recipes: [],
      firstColumnRecipes: [],
      secondColumnRecipes: []
    };
  },
  async mounted() {
    await this.refreshRandomRecipes();
  },
  methods: {
    async refreshRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random"
        );
        this.recipes = response.data;
        this.splitRecipesIntoColumns();
      } catch (err) {
        console.error('Error fetching random recipes:', err);
      }
    },
    splitRecipesIntoColumns() {
      const middleIndex = Math.ceil(this.recipes.length / 2);
      this.firstColumnRecipes = this.recipes.slice(0, middleIndex);
      this.secondColumnRecipes = this.recipes.slice(middleIndex);
    }
  },
};
</script>


<style lang="scss" scoped>
.main-container {
  padding: 20px;
}

.page-title {
  margin: 20px auto;
  padding: 20px;
  width: 70%;
  max-width: 1200px;
  background-color: rgba(44, 44, 46, 0.8);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.page-title h1 {
  color: #fff;
  margin: 0;
}

.columns-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.column {
  flex: 1;
  color: #fff;
  position: relative;
}

.column-title {
  background-color: rgba(44, 44, 46, 0.8);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.column-title h2 {
  color: #fff;
  margin: 0;
}

.new-recipes-button {
  display: block;
  margin: 20px auto;
  text-align: center;
}

.blurred {
  filter: blur(2px);
  pointer-events: none;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  background-color: rgba(44, 44, 46, 0.8);
  border-radius: 8px;
  
}
</style>