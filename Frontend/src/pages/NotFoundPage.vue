<template>
  <div class="container">
    <h2>There was a problem fetching the recipe, please try again later..</h2>
    <router-link to="/" exact class="text-primary">Go back home</router-link>
  </div>
</template>

<style scoped>
  .container {
  max-width: 500px;
  margin: 20px auto;
  padding: 2rem;
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.text-primary {
  color: #a09e9e !important;
}
</style>


