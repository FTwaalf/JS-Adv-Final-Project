const cakeRecipes = require("./cake-recipes.json");


//vraag 1
function getUniqueAuthors(recipes) {
  const authors = [];
  recipes.forEach(recipe => {
    if (recipe.Author && !authors.includes(recipe.Author)) { // Match "Author" case
      authors.push(recipe.Author);
    }
  });
  return authors;
}
const uniqueAuthors = getUniqueAuthors(cakeRecipes);
console.log("Unique authors:", uniqueAuthors);


// (vraag 2) object destructuring
function logRecipeNames(recipes) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }


  recipes.forEach(({ Name }) => {
    console.log(`Recipe: ${Name}`);
  });
}


logRecipeNames(cakeRecipes); // Logs names of all recipes


// For empty input
logRecipeNames([]); Logs: "No recipes found."


//vraag 3
// Function to get recipes by a specific author
function getRecipesByAuthor(recipes, author) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes available.");
    return [];
  }


  const filteredRecipes = recipes.filter(recipe => recipe.Author === author);
  return filteredRecipes;
}


// Function 
function logRecipeNames(recipes) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }


  recipes.forEach(({ Name }) => {
    console.log(`Recipe: ${Name}`);
  });
}


// recipes Jane
const janeRecipes = getRecipesByAuthor(cakeRecipes, "Jane Hornby");


// Print the names of Jane's recipes
logRecipeNames(janeRecipes);




//vraag 4
function getRecipeNamesByIngredient(recipes, ingredient) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes available.");
    return [];
  }


  const filteredRecipes = recipes.filter(recipe =>
    recipe.Ingredients && recipe.Ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase()))
  );


  const recipeNames = filteredRecipes.map(recipe => recipe.Name);
  return recipeNames;
}


// Assuming cakeRecipes is an array of recipe objects
const namesWithPineapplechunks = getRecipeNamesByIngredient(cakeRecipes, "pineapplechunks");
console.log("Recipes with pineapplechunks:", namesWithPineapplechunks);


const namesWithApricots = getRecipeNamesByIngredient(cakeRecipes, "apricots");
console.log("Recipes with apricots:", namesWithApricots);


//VRAAG 5 (ora ma pone e vraag aki e la danja)
// Function to get recipes by a specific ingredient
function getRecipesByIngredient(recipes, ingredient) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes available.");
    return [];
  }


  const filteredRecipes = recipes.filter(recipe =>
    recipe.Ingredients && recipe.Ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase()))
  );


  return filteredRecipes;
}


// Function to log recipe names
function logRecipeNames(recipes) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }


  recipes.forEach(({ Name }) => {
    console.log(`Recipe: ${Name}`);
  });
}
// Example Usage:
const ingredientToSearchApricots = "apricots";
const recipesWithApricots = getRecipesByIngredient(cakeRecipes, ingredientToSearchApricots);
logRecipeNames(recipesWithApricots);


const ingredientToSearchPineapple = "pineapple";
const recipesWithPineapple = getRecipesByIngredient(cakeRecipes, ingredientToSearchPineapple);
logRecipeNames(recipesWithPineapple);


//VRAAG 6 (find i includes)
function getRecipeByName(recipes, Name) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes available.");
    return null;
  }


  const matchingRecipe = recipes.find(recipe =>
    recipe.Name && recipe.Name.toLowerCase().includes(Name.toLowerCase())
  );


  if (!matchingRecipe) {
    console.log(`No recipe found for name: "${Name}".`);
    return null;
  }


  return matchingRecipe;
}


// Search for a recipe by name
const recipeNameToSearch = "Cupcake Christmas tree";
const foundRecipe = getRecipeByName(cakeRecipes, recipeNameToSearch);




if (foundRecipe) {
  console.log("Found Recipe:", foundRecipe);
}


//vraag 7 + 7a
function getAllIngredients(recipes) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes available.");
    return [];
  }


  const allIngredients = recipes.reduce((ingredientsList, recipe) => {
    return recipe.Ingredients ? ingredientsList.concat(recipe.Ingredients) : ingredientsList;
  }, []);


  return allIngredients;
}


// Get recipes by a specific author (e.g., Alice Johnson)
const chelsieRecipes = getRecipesByAuthor(cakeRecipes, "Chelsie Collins");
//console.log("Recipes by Chelsie Collins:", chelsieRecipes);
// Get all ingredients from Alice's recipes
const groceryList = getAllIngredients(chelsieRecipes);


// Log the ingredients list into the console
console.log("Ingredients from Chelsie's recipes:", groceryList);




const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
 
 
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};


// Main loop
(async () => {
  let choice;


  do {
    choice = await displayMenu();


    switch (choice) {
      case 1:
        console.log("\nUnique Authors:");
        console.log(getUniqueAuthors(cakeRecipes));
        break;


      case 2:
        const authorName = await prompt("Enter author's name: ");
        const recipesByAuthor = getRecipesByAuthor(cakeRecipes, authorName);
        console.log(`\nRecipes by ${authorName}:`);
        logRecipeNames(recipesByAuthor);
        break;


      case 3:
        const ingredientName = await prompt("Enter ingredient name: ");
        const recipesWithIngredient = getRecipesByIngredient(cakeRecipes, ingredientName);
        console.log(`\nRecipes containing ${ingredientName}:`);
        logRecipeNames(recipesWithIngredient);
        break;


      case 4:
        const recipeName = await prompt("Enter recipe name: ");
        const foundRecipe = getRecipeByName(cakeRecipes, recipeName);
        if (foundRecipe) {
          console.log("\nRecipe Details:");
          console.log(foundRecipe);
        } else {
          console.log("Recipe not found.");
        }
        break;


      case 5:
        const authorForList = await prompt("Enter author's name for grocery list: ");
        const savedRecipes = getRecipesByAuthor(cakeRecipes, authorForList);
        const groceryListByAuthor = getAllIngredients(savedRecipes);
        console.log("\nGrocery List:");
        console.log(groceryListByAuthor);
        break;


      case 0:
        console.log("Exiting...");
        break;


      default:
        console.log("Invalid input. Please enter a number between 0 and 5.");
    }


  } while (choice !== 0);


  readline.close(); // to close the readline interface
})
