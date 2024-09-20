<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <router-link class="navbar-brand" :to="{ name: 'main' }">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'search' }"><b-icon icon="search" scale="0.75"></b-icon> Search</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'about' }"><b-icon icon="question" scale="1.4"></b-icon>About</router-link>
          </li>
          <li class="nav-item" v-if="$root.store.username">
            <button class="btn btn-link nav-link" @click="showCreateRecipeModal">New Recipe</button>
          </li>
          <li class="nav-item ml-2" v-if="$root.store.username">
            <b-dropdown text="Personal" right>
              <b-dropdown-item :to="{ name: 'myFavoriteRecipes' }">My Favorite Recipes <b-icon icon="heart" scale="0.75"></b-icon></b-dropdown-item>
              <b-dropdown-item :to="{ name: 'myRecipes' }">My Recipes</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'myFamilyRecipes' }">My Family's Recipes</b-dropdown-item> 
            </b-dropdown>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto align-items-center">
          <li class="nav-item" v-if="!$root.store.username">
            <span class="navbar-text mr-2 align-middle">Hello Guest:</span>
          </li>
          <li class="nav-item" v-if="!$root.store.username">
            <router-link class="btn btn-outline-light btn-sm mr-2 align-middle" :to="{ name: 'register' }">Register</router-link>
          </li>
          <li class="nav-item" v-if="!$root.store.username">
            <router-link class="btn btn-outline-light btn-sm align-middle" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item" v-if="$root.store.username">
            <span class="nav-link mr-2 align-middle"><b-icon icon="person" scale="1"></b-icon> {{ $root.store.username }}</span>
          </li>
          <li class="nav-item" v-if="$root.store.username">
            <button class="btn btn-outline-light btn-sm align-middle" @click="Logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
    <div id="bthn" lang="en" class="banner-bottom-right"></div> <!-- Banner Placeholder -->
    <!-- CreateRecipe Component -->
    <CreateRecipe ref="createRecipeModal" @recipe-saved="addRecipeToMyRecipes" />
  </div>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue';
import CreateRecipe from './components/CreateRecipe.vue'; // Import the CreateRecipe component

export default {
  name: "App",
  components: {
    BDropdown,
    BDropdownItem,
    CreateRecipe // Register the CreateRecipe component
  },
  mounted() {
    // Adding the external script for the banner
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
    script.setAttribute(
      "integrity",
      "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
    );
    script.setAttribute("crossorigin", "anonymous");
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  methods: {
    showCreateRecipeModal() {
      this.$refs.createRecipeModal.$bvModal.show('recipe-modal'); // Use the reference to show the modal
    },
    addRecipeToMyRecipes(recipeDetails) {
      this.$root.$emit('new-recipe-added', recipeDetails);
    },
    async Logout() {
      const response = await this.axios.post(
          this.$root.store.server_domain + "/logout" 
      );
      sessionStorage.removeItem('searchQuery');
      sessionStorage.removeItem('searchResults');
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
       // this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  padding-top: 56px; /* Ensure content is not hidden behind fixed navbar */
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: 100%; /* Adjust this value to zoom out */
}

.navbar {
  background-color: #121212; /* Change navbar to black */
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.nav-link,
.btn {
  color: #dee2e6;
}

.nav-link:hover,
.nav-link.router-link-exact-active,
.btn:hover {
  color: #fff;
}

.navbar-toggler {
  border-color: #fff;
}

.dropdown-menu {
  background-color: #343a40;
}

.dropdown-item {
  color: #dee2e6;
}

.dropdown-item:hover {
  background-color: #444;
  color: #fff;
}

.btn-link {
  color: #fff;
  text-decoration: none;
}

.btn-outline-light {
  border-color: #fff;
  color: #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #343a40;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.align-middle {
  vertical-align: middle !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

/* Banner styling for bottom-right positioning */
.banner-bottom-right {
  position: fixed;
  margin-left: 925px;
  bottom: 20px; /* Adjust spacing from bottom */
  right: 10px;  /* Adjust spacing from right */
  width: 250px; /* Set width of the square */
  height: 150px; /* Set height of the square */
  z-index: 1000; /* Ensure it appears on top of other elements */
  overflow: hidden; /* Hide any overflow content */
}
</style>
