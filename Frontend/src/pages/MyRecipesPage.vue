<template>
  <div>
    <div class="title">
      <h1>My Recipes</h1>
    </div>
    <RecipePreviewList :recipes="recipes" :isFromMyRecipes="true" />
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  name: 'MyRecipes',
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  created() {
    this.$root.$on('new-recipe-added', this.incrementAmountToFetch);
    this.loadInitialRecipes();
  },
  async mounted() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/myrecipes/preview"
      );
      this.recipes = response.data;
      console.log("this.recipes:", this.recipes);

    } catch (err) {
      console.error('Error fetching users recipess:', err);
    }
  },
  methods: {
    incrementAmountToFetch() {
      this.amountToFetch++;
    },
    loadInitialRecipes() {
      // Simulate fetching the initial number of recipes
      // This can be from a mock function or simply set to a default value
      this.amountToFetch = 1; // Set initial amount to 0 or fetch from mock service
    }
  },
  beforeDestroy() {
    this.$root.$off('new-recipe-added', this.incrementAmountToFetch);
  }
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

 
