<template>
  <div class="family-recipes">
    <h1>Ancient Family Secrets (aka Recipes)</h1>
    <div v-if="loading" class="loading">
      <p>Loading... (Or maybe I'm just pretending to be busy)</p>
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <h2>{{ recipe.name }}</h2>
        <p class="recipe-description">{{ recipe.description }}</p>
        <p><strong>Recipe from:</strong> {{ recipe.owner }}</p>
        <p><strong>Occasion:</strong> {{ recipe.occasion }}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient" @click="revealEasterEgg">{{ ingredient }}</li>
        </ul>
        <p v-if="easterEgg" class="easter-egg">Congratulations! You found the secret recipe for laughter!</p>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li v-for="step in recipe.instructions" :key="step">{{ step }}</li>
        </ol>
        <button @click="revealSecret" class="secret-button">Click for Secret Family Ingredient</button>
        <p v-if="showSecret" class="secret-reveal">The secret ingredient is... love (and a dash of sarcasm)!</p>
      </div>
      <button @click="getRandomAdvice" class="advice-button">Click for Random Cooking Advice</button>
      <p v-if="randomAdvice" class="random-advice">{{ randomAdvice }}</p>
    </div>
    <footer>
      <p>Disclaimer: No grandmothers were harmed in the making of these recipes. Side effects may include food comas and unsolicited compliments.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MyFamilyRecipesPage',
  data() {
    return {
      loading: true,
      showSecret: false,
      easterEgg: false,
      randomAdvice: '',
      recipes: [
        {
          id: 1,
          name: 'Sarmale (Stuffed Cabbage Rolls)',
          description: "Guaranteed to impress your in-laws—or at least keep them busy chewing.",
          owner: 'Grandma from Romania',
          occasion: 'When you need to prove you can roll something besides your eyes',
          ingredients: [
            '1 large cabbage (because tiny cabbages don’t cut it)',
            '500g minced pork (or use beef, but Grandma will know)',
            '200g rice',
            '1 onion',
            '2 carrots',
            'Salt and pepper to taste',
            '1 tablespoon paprika',
            '500ml tomato sauce'
          ],
          instructions: [
            'Boil the cabbage leaves until they’re as flexible as your weekend plans.',
            'In a bowl, mix minced pork, rice, chopped onion, grated carrots, salt, pepper, and paprika.',
            'Place a spoonful of the mixture on each cabbage leaf and roll it tighter than you roll out of bed on a Monday.',
            'Place the rolls in a pot, cover with tomato sauce, and simmer for about 2 hours.',
            'Serve hot and bask in the compliments.'
          ]
        },
        {
          id: 2,
          name: 'Baklava',
          description: "The dessert that's worth the sticky fingers and a small sugar coma.",
          owner: 'Grandfather from Turkey',
          occasion: 'When you want to impress people with your layers—of pastry, not personality',
          ingredients: [
            '500g phyllo dough',
            '200g melted butter (because you didn’t really want to fit into those jeans anyway)',
            '300g chopped walnuts',
            '200g sugar',
            '1 teaspoon cinnamon',
            '200ml water',
            '100g honey'
          ],
          instructions: [
            'Preheat the oven to 180°C (350°F).',
            'Layer half of the phyllo dough in a greased baking dish, brushing each layer with melted butter.',
            'Combine chopped walnuts, sugar, and cinnamon. Sprinkle over the phyllo layers.',
            'Layer the remaining phyllo dough on top, again brushing each layer with butter.',
            'Cut into diamond shapes (because apparently, squares are too basic) and bake for 45 minutes until golden.',
            'Meanwhile, combine water and honey in a pot and bring to a boil. Pour over baked baklava.',
            'Let it soak and cool before serving. Try not to eat it all in one sitting.'
          ]
        },
        {
          id: 3,
          name: 'Goulash',
          description: "For when you need comfort food, and a blanket just isn’t enough.",
          owner: 'Aunt from Hungary',
          occasion: 'When you need a hug in a bowl but nobody’s around',
          ingredients: [
            '500g beef, cubed (make sure they’re cube-shaped, or the recipe police will come)',
            '2 onions, chopped',
            '2 bell peppers, chopped',
            '3 tomatoes, chopped',
            '3 potatoes, cubed',
            '2 tablespoons paprika',
            'Salt and pepper to taste',
            '2 cups beef broth',
            '1 tablespoon caraway seeds',
            '2 cloves garlic, minced'
          ],
          instructions: [
            'In a large pot, sauté onions in oil until golden. Add beef and cook until browned.',
            'Stir in paprika, garlic, and caraway seeds.',
            'Add bell peppers, tomatoes, and potatoes. Pour in beef broth and bring to a boil.',
            'Reduce heat and simmer for 1.5-2 hours until meat is tender. Stir occasionally, or just whenever you remember it exists.',
            'Season with salt and pepper. Serve hot with bread and a side of nostalgia.'
          ]
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000); // Simulates loading time
  },
  methods: {
    revealSecret() {
      this.showSecret = true;
    },
    revealEasterEgg() {
      this.easterEgg = true;
    },
    getRandomAdvice() {
      const adviceArray = [
        "If you're afraid of butter, use cream.",
        "Never trust a skinny chef.",
        "Wine pairs with everything, even your cooking disasters.",
        "A watched pot never boils, but a forgotten one will definitely burn.",
        "Always add a little extra cheese—you deserve it."
      ];
      this.randomAdvice = adviceArray[Math.floor(Math.random() * adviceArray.length)];
    }
  }
};
</script>

<style>
.family-recipes {
  font-family: Arial, sans-serif;
  padding: 20px;
  color: white;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #f4a261;
}

.spinner {
  margin: 20px auto;
  border: 5px solid #f4a261;
  border-top: 5px solid #e76f51;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.recipe-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: rotate(-1deg);
}

.recipe-card h2::after {
  content: " (The Real Deal)";
  font-size: 0.8em;
  color: #888;
}

.secret-button {
  background-color: #f4a261;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
}

.secret-button:hover {
  background-color: #e76f51;
}

.secret-reveal {
  margin-top: 10px;
  font-weight: bold;
  color: #f4a261;
}

.easter-egg {
  margin-top: 10px;
  font-weight: bold;
  color: #2a9d8f;
}

.advice-button {
  background-color: #2a9d8f;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  color: white;
}

.advice-button:hover {
  background-color: #264653;
}

.random-advice {
  margin-top: 10px;
  font-style: italic;
  color: #264653;
}

footer {
  margin-top: 20px;
  font-size: 0.9em;
  color: #aaa;
  text-align: center;
}
</style>