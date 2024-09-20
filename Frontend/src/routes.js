import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipes",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/my-recipes",
    name: "myRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/my-favorite-recipes",
    name: "myFavoriteRecipes",
    component: () => import("./pages/MyFavoriteRecipesPage"),
  },
  {
    path: "/my-family-recipes", 
    name: "myFamilyRecipes",
    component: () => import("./pages/MyFamilyRecipesPage"),

  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
