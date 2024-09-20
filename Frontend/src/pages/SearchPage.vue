<template>
  <div>
    <div class="card" id="main-card">
      <div class="row">
        <input v-model="searchQuery" type="text" placeholder="Search by recipe name or dish" @keyup.enter="searchRecipes">
        <select v-model="resultsLimit">
          <option value="5">5 results</option>
          <option value="10">10 results</option>
          <option value="15">15 results</option>
        </select>
        <select v-model="sortBy">
          <option value="default">Default</option>
          <option value="time">Preparation Time</option>
          <option value="popularity">Popularity</option>
        </select>
        <button @click="searchRecipes">Search</button>
      </div>

      <a data-toggle="collapse" href="#AdvanceFilter" role="button" aria-expanded="false" aria-controls="AdvanceFilter" class="advanced">
        Advance Search With Filters <i class="fa fa-angle-down"></i>
      </a>
      <div class="collapse" id="AdvanceFilter">
        <div class="card card-body">
          <div class="row">
            <div class="col" v-for="category in categories" :key="category.name">
              <h3>{{ category.name }}</h3>
              <div class="form-check" v-for="item in category.items" :key="item">
                <input
                  class="form-check-input custom-checkbox"
                  type="checkbox"
                  v-model="checkedItems[category.name][item]"
                  :value="item.value"
                  :id="item"
                >
                <label class="form-check-label" :for="item">
                  {{ item }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="searchResults.length > 0">
      <RecipePreviewList :amountToFetch="resultsLimit" :recipes="searchResults" />
    </div>
    <div v-else-if="searchPerformed && searchResults.length === 0 && !submitError" class="mt-2">
      <b-alert variant="info" dismissible show>
        No recipes found
      </b-alert>
    </div>
    <b-alert class="mt-2" v-if="submitError" variant="warning" dismissible show>
      Error while searching, please try again later
    </b-alert>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import categories from "../assets/categories";
import { mockSearchRecipes } from "../services/search";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
  },
  data() {
    // initialize checkedItems so it could handle all our categories and items
    const checkedItems = {};
    categories.forEach((category) => {
      checkedItems[category.name] = {};
      category.items.forEach((item) => {
        checkedItems[category.name][item] = false;
      });
    });

    return {
      categories: categories,
      searchQuery: "",
      resultsLimit: 5,
      sortBy: 'default',
      selectedCategory: "",
      searchResults: [],
      checkedItems: checkedItems,
      submitError: undefined,
      intolerances: checkedItems.Intolerances,
      diet: checkedItems.Diet,
      cuisine: checkedItems.Cuisine,
      searchPerformed: false,
    };
  },
  created() {
    // Load the last search query and results from sessionStorage
    const savedSearchQuery = sessionStorage.getItem('searchQuery');
    const savedSearchResults = sessionStorage.getItem('searchResults');

    if (savedSearchQuery) {
      this.searchQuery = savedSearchQuery;
    }

    if (savedSearchResults) {
      this.searchResults = JSON.parse(savedSearchResults);
    }
  },
  methods: {
    async searchRecipes() {
      // Remove a specific item by its key
      try{
        sessionStorage.removeItem('searchQuery');
        sessionStorage.removeItem('searchResults');
      }
      catch(err){
         // catch block intentionally left empty
      }
      
      // Convert checked items into comma-separated strings
      const cuisine = Object.keys(this.cuisine)
        .filter(key => this.cuisine[key])
        .join(',');

      const diet = Object.keys(this.diet)
        .filter(key => this.diet[key])
        .join(',');

      const intolerance = Object.keys(this.intolerances)
        .filter(key => this.intolerances[key])
        .join(',');

      console.log("Transformed Parameters:", {
        cuisine,
        diet,
        intolerance,
      });
      
      // Check if searchQuery is empty
      if (!this.searchQuery.trim()) {
        return; // Exit the method if searchQuery is empty or whitespace only
      }

      try {
      const recipeDetails = {
        query: this.searchQuery,
        number: this.resultsLimit
      };
      // Only add non-empty parameters
      if (cuisine) recipeDetails.cuisine = cuisine;
      if (diet) recipeDetails.diet = diet;
      if (intolerance) recipeDetails.intolerances = intolerance;
      if (this.sortBy !== 'default') recipeDetails.sort = this.sortBy;

      console.log("Final recipeDetails sent to API:", recipeDetails);

      // Pass recipeDetails as params
      const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/search", 
        { params: recipeDetails } // Use params to send query parameters
      );
      console.log("response:", response.data);

      // Update searchResults with the response data
      this.searchResults = response.data;
      console.log("search results:", this.searchResults);

      this.searchPerformed = true;

      // Save the search query and results to sessionStorage
      sessionStorage.setItem('searchQuery', this.searchQuery);
      sessionStorage.setItem('searchResults', JSON.stringify(this.searchResults));
    } catch (err) {
      console.log(err.response);
      this.submitError = err.response?.data?.message || "An error occurred during the search.";
    }
  },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 20px auto; /* Center the card horizontally and add margin on top */
  padding: 20px;
  width: 80%;
  max-width: 1200px; /* Limit the maximum width of the card */
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  text-align: center;
  justify-content: center;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  text-align: center;
}

.advanced {
  color: white;
  text-align: center;
  margin-top: 10px;
}

h1 {
  color: white;
  font-weight: bold;
}

input[type="text"],
select,
button {
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #444343; /* Dark background */
  color: #fff;
}

input[type="text"]{
  width: 500px;
}

input[type="text"]::placeholder {
  color: #a09e9e; /* Placeholder color */
}

select {
  background-color: #333; /* Dark background */
}

button {
  background-color: #555; /* Dark button color */
  cursor: pointer;
}

button:hover {
  background-color: #777; /* Darker hover color */
}

.b-alert {
  margin-top: 10px;
}

.form-check-input {
  margin-right: 5px;
}

.form-check-label {
  color: #fff;
}
</style>
