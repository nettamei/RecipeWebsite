<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeTitle: recipe.title, recipeId: recipe.id, fromMyRecipes: this.isFromMyRecipes } }">
      <div class="recipe-body">
        <img :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
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
          <div class="likes" v-if="!isFromMyRecipes">
            <span class="like-text">{{ recipeLikes }}</span>
            <b-button @click.prevent="likeClicked" variant="outline" class="mb-2">
              <b-icon :icon="like_clicked ? 'heart-fill' : 'heart'" aria-hidden="true"></b-icon>
            </b-button>
          </div>
        </div>
      </div>
    </router-link>

    <div class="bottom-right">
      <b-toast v-model="toastShow" :auto-hide-delay="5000" no-close-button>
        {{ toastMessage }}
        <b-button @click="dismissToast" variant="outline-secondary" size="sm">Close</b-button>
      </b-toast>
    </div>
  </div>
</template>

<script>
import { BToast } from 'bootstrap-vue';

export default {
  name: 'RecipePreview',
  components: {
    BToast,
  },
  data() {
    return {
      like_clicked: false,
      toastShow: false,
      toastMessage: '',
      recipeLikes: 0,
      isUserLoggedIn: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isFromMyRecipes: {
      type: Boolean,
      default: false, // Default to false for other pages
    }
  },
  async mounted() {
    this.isUserLoggedIn = this.$root.store.isAuthenticated || false;

    if (!this.isFromMyRecipes) {
      await this.fetchRecipeDetails(); // Fetch only if not from "My Recipes"
      if (this.isUserLoggedIn) {
        await this.checkIfFavorite(); // Check if the recipe is in favorites
      }
    }
  },
  methods: {
    async fetchRecipeDetails() {
      try {
        const response = await this.axios.get(`${this.$root.store.server_domain}/recipes/previewRecipe/${this.recipe.id}`);
        const recipeData = response.data;
        this.recipeLikes = recipeData.aggregateLikes;
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        this.toastMessage = 'Error fetching recipe details';
        this.toastShow = true;
      }
    },
    async checkIfFavorite() {
      try {
        const response = await this.axios.get(`${this.$root.store.server_domain}/users/userfavorites`);
        const favoriteRecipes = response.data;
        this.like_clicked = favoriteRecipes.some(favRecipeId => favRecipeId === this.recipe.id);
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
        recipeId: this.recipe.id,
      };
      let responseFavorites;
      try {
        responseFavorites = await this.axios.post(
          `${this.$root.store.server_domain}/users/favorites`, userDetails
        );
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
.recipe-preview {
  display: inline-block;
  width: 500px;
  height: 350px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 7px #c7c6c6;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
  background-color: #fff;
}

.recipe-preview:hover {
  transform: translateY(-10px);
}

.recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-footer {
  padding: 15px;
  background-color: #f8f8f8;
}

.recipe-title {
  font-size: 13pt;
  font-weight: bold;
  margin-bottom: 10px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #504f4f;
}

.recipe-overview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14pt;
  color: #555;
}

.recipe-overview .time,
.recipe-overview .likes,
.recipe-overview .dietary-icons {
  display: flex;
  align-items: center;
}

.recipe-overview .dietary-icons {
  margin-right: auto;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  object-fit: cover;
}

.clock-icon {
  margin-right: 5px;
}

.likes {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.likes .like-text {
  margin-left: 5px;
  margin-bottom: 10px;
}

.bottom-right {
  position: fixed;
  margin-top: 20%;
  right: 100%;
}
</style>
