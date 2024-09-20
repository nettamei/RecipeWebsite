import recipe_previews from "../assets/mocks/recipe_preview.json";

export function mockSearchRecipes(query, amount, category, answers = false, sortBy = 'default') {
  if (!answers) {
    throw { status: 409, response: { data: { message: "No recipes were found", success: false } } };
  }

  console.log("sortBy:", sortBy);

  // If amount is greater than the length of recipe_previews, duplicate recipes
  const timesToRepeat = Math.ceil(amount / recipe_previews.length);
  const extendedRecipes = Array(timesToRepeat).fill(recipe_previews).flat();

  // Shuffle the array and select the required amount
  const shuffled = extendedRecipes.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, amount);
  console.log("Selected before sorting:", selected);

  // Sort based on the sortBy parameter
  if (sortBy === 'preparationTime') {
    console.log('Sorting by preparation time');
    selected.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  } else if (sortBy === 'popularity') {
    console.log('Sorting by popularity');
    selected.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  }

  console.log("Selected after sorting by", sortBy, ":", selected);

  return { data: { recipes: selected } };
}
