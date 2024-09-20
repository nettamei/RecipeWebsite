<template>
  <div class="container">
    <div v-if="recipe" class="recipe-content">
      <div class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-body">
        <div class="recipe-details">
          <div class="dietary-icons">
            <img v-if="recipe.vegan" src="@/assets/vegan.png" class="icon" alt="Vegan" />
            <img v-if="recipe.vegetarian" src="@/assets/vegetarian.png" class="icon" alt="Vegetarian" />
            <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" class="icon" alt="Gluten-Free" />
          </div>
          <div class="recipe-overview">
            <div class="time">
              <b-icon-clock class="clock-icon"></b-icon-clock>
              {{ recipe.readyInMinutes }} minutes
            </div>
          </div>
        </div>
        <div class="likes" v-if="!$route.params.fromMyRecipes">
            <span class="like-text">{{ recipe.aggregateLikes }}</span>
            <b-button @click.prevent="likeClicked" variant="outline" class="mb-2">
              <b-icon :icon="like_clicked ? 'heart-fill' : 'heart'" aria-hidden="true"></b-icon>
            </b-button>
          </div>
        <div class="recipe-ingredients">
          <h2>Ingredients | {{ recipe.servings }} servings</h2>
          <ul>
            <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
              {{ r.original }}
            </li>
          </ul>
        </div>
        <div class="recipe-instructions">
          <h2>Instructions</h2>
          <div v-html="recipe.instructions"></div>
        </div>
      </div>
      <b-toast v-model="toastShow" :auto-hide-delay="5000" no-close-button>
        {{ toastMessage }}
        <b-button @click="dismissToast" variant="outline-secondary" size="sm">Close</b-button>
      </b-toast>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import { BToast } from 'bootstrap-vue';
import { mockAddFavorite } from '../services/user';

export default {
  name: 'DietaryIcons',
  components: {
    BToast,
  },
  data() {
    return {
      recipeTitle: null,
      recipeId: null,
      recipe: null,
      like_clicked: false,
      toastShow: false,
      toastMessage: '',
      recipeLikes: 0,
      isUserLoggedIn: false
    };
  },
  async mounted() {
    this.isUserLoggedIn = this.$root.store.isAuthenticated || false;
    if (this.isUserLoggedIn) {
        await this.checkIfFavorite(); // Check if the recipe is in favorites
    }
  },
  async created() {
    try {
      let response;
      this.recipeId = this.$route.params.recipeId;
      const fromMyRecipes = this.$route.params.fromMyRecipes;

      try {
         if (fromMyRecipes) {
          const recipeTitle = this.$route.params.recipeTitle;
          console.log("recipeTitle:", recipeTitle);
          response = await this.axios.get(`${this.$root.store.server_domain}/users/myrecipes/fullview`, {
          params: {
            recipeTitle: recipeTitle
          }
        });
        } else {
          // Otherwise, fetch the full recipe based on recipeId
          response = await this.axios.get(`${this.$root.store.server_domain}/recipes/fullRecipe/${this.recipeId}`);
        }
        this.recipe = response.data;
        console.log("this.recipe:", this.recipe);
      } catch (err) {
        console.error('Error fetching full view recipe:', err);
        this.$router.replace("/NotFound");
      }

      console.log("response.data:", response);

      let {
        instructions,
        extendedIngredients,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        aggregateLikes
      } = response.data.recipe;


      let _instructions = instructions;

      let _recipe = {
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        aggregateLikes
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async checkIfFavorite() {
      try {
        const response = await this.axios.get(`${this.$root.store.server_domain}/users/userfavorites`);
        console.log("response:", response);
        const favoriteRecipes = response.data;
        // Log favoriteRecipes and this.recipe.id for debugging
        console.log("Favorite Recipes:", favoriteRecipes);
        console.log("Current Recipe ID:", this.recipeId);
        this.like_clicked = favoriteRecipes.some(favRecipeId => favRecipeId === this.recipeId);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    },
    async likeClicked() {
      // Check if the user is logged in before allowing to like
      if (!this.isUserLoggedIn) {
        this.toastMessage = "You must be logged in to add to favorites";
        this.toastShow = true;
        return; // Exit the method if the user is not logged in
      }
      this.like_clicked = !this.like_clicked;
      const userDetails = {
        recipeId: this.recipeId,
      };
      let responseFavorites;
      try {
        responseFavorites = await this.axios.post(
          `${this.$root.store.server_domain}/users/favorites`, userDetails
        );
        console.log("post success");
        this.toastMessage = "Recipe successfully saved as favorite";
        this.toastShow = true;
      } catch (err) {
        console.error('Error adding recipe to favorites:', err);
        this.toastMessage = "Error adding recipe to favorites";
        this.toastShow = true;
      }
    },
    dismissToast() {
      this.toastShow = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #ffffff;
  color: #f0f0f0;
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.recipe-content {
  background-color: #f2f0f0f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.recipe-header {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-title {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 20px;
  color: #353535;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
}

.recipe-image {
  max-width: 65%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.recipe-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recipe-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.dietary-icons {
  display: flex;
  align-items: center;
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.recipe-overview {
  display: flex;
  align-items: center;
}

.time, .likes {
  display: flex;
  align-items: center;
  font-size: 1.2em;
}

.clock-icon {
  margin-right: 5px;
}

.like-button {
  margin-top: -20px;
  margin-right: -2px;
  margin-left: -10px;
}

.recipe-ingredients, .recipe-instructions {
  background-color: #f9f6f6;
  padding: 20px;
  border-radius: 8px;
}

.recipe-ingredients h2, .recipe-instructions h2 {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 15px;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
  color: #393737;
}

li {
  padding: 5px 0;
}

.like-text {
  margin-top: -20px;
  font-size: 1em;
  color: #484848;
}

</style>
