<template>
    <div>
      <div class="title">
        <h1>My Favorite Recipes</h1>
      </div>
      <RecipePreviewList :recipes="recipes" />
    </div>
  </template>
  
  <script>
  import RecipePreviewList from '../components/RecipePreviewList.vue';
  
  export default {
    name: 'MyFavoriteRecipes',
    components: {
      RecipePreviewList
    },
    data() {
      return {
        recipes: []
      };
    },
    async mounted() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorites"
      );
      this.recipes = response.data;

    } catch (err) {
      console.error('Error fetching favorite recipes:', err);
    }
  }

// CAME TO CHECK FAVORITES


  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    /* margin-bottom: 20px; */
  }

.title{
  margin: 20px auto; /* Center the card horizontally and add margin on top */
  padding: 20px;
  width: 70%;
  max-width: 1200px; /* Limit the maximum width of the card */
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
  