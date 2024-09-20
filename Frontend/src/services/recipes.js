// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_previews from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 0, userName = "") {
  // If amount is greater than the length of recipe_previews, duplicate recipes
  const timesToRepeat = Math.ceil(amount / recipe_previews.length);
  const extendedRecipes = Array(timesToRepeat).fill(recipe_previews).flat();

  // Shuffle the array and select the required amount
  const shuffled = extendedRecipes.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, amount);
  
  return { data: { recipes: selected } };
}

// export function mockGetRecipeFullDetails(recipeId) {
//     return { data: { recipe: recipe_full_view } } ;
//   }
  

// Function to find a recipe by ID in the mock data
function findRecipeById(recipeId) {
  console.log("recipe_full_view", typeof recipe_full_view[0].id)
  console.log("recipeId", typeof recipeId)
  return recipe_full_view.find(recipe => recipe.id === recipeId);
}

// Mock function to get full recipe details by ID
export function mockGetRecipeFullDetails(recipeId) {
  const recipe = findRecipeById(recipeId);
  if (!recipe) {
    return {
      status: 404, // Simulate Not Found error
      data: null
    };
  }

  return {
    status: 200,
    data: { recipe }
  };
}

