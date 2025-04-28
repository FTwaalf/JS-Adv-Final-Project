const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

//vraag 1 display menu 1
function getUniqueAuthors(recipes) {
    const authors = [];
    recipes.forEach(recipe => {
        if (recipe.Author && !authors.includes(recipe.Author)) { 
            authors.push(recipe.Author);
        }
    });
    return authors;
}

// (vraag 2) object destructuring - display menu 1
function logRecipeNames(recipes) {
    if (!recipes || recipes.length === 0) {
        console.log("No recipes found.");
        return;
    }

    recipes.forEach(({ Name }) => {
        console.log(`Recipe: ${Name}`);
    });
}

//vraag 3- display menu 2
// Function to get recipes by a specific author
function getRecipesByAuthor(recipes, author) {
    if (!recipes || recipes.length === 0) {
        console.log("No recipes available.");
        return [];
    }

    const filteredRecipes = recipes.filter(recipe => recipe.Author && recipe.Author.toLowerCase() === author.toLowerCase());
    return filteredRecipes;
}

// vraag 4 Function to get a recipe by name - displaymenu 3 
//filter & some
function getRecipesByIngredient(recipes, ingredient) {
    if (!recipes || recipes.length === 0) {
        console.log("No recipes available.");
        return [];
    }

    const matchingRecipes = recipes.filter(recipe =>
        recipe.Ingredients && recipe.Ingredients.some(item =>
            item.toLowerCase() === ingredient.toLowerCase()
        )
    );

    if (matchingRecipes.length === 0) {
        console.log(`No recipes found containing ingredient: "${ingredient}".`);
    }
    const recipeNames = matchingRecipes.map(recipe => recipe.Name);

    return matchingRecipes;
}

// vraag 5 - displaymenu 3
function getIngredientsFromRecipe(recipe) {
    if (!recipe || !recipe.Ingredients) {
        console.log("No ingredients found for this recipe.");
        return [];
    }

    return recipe.Ingredients;
}

//VRAAG 6 (find i includes)- display menu 4
function getRecipeByNameIncluding(recipes, Name) {
    if (!recipes || recipes.length === 0) {
        console.log("No recipes available.");
        return null;
    }

    const matchingRecipe = recipes.find(recipe =>
        recipe.Name && recipe.Name.toLowerCase().includes(Name.toLowerCase())
    );

    if (!matchingRecipe) {
        console.log(`No recipe found for name containing: "${Name}".`);
        return null;
    }

    return matchingRecipe;
}


//vraag 7 + 7a - displaymenu 5
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


let selectedRecipe = null;

const displayMenu = () => {
    console.log("\nRecipe Management System Menu:");
    console.log("1. Show All Authors");
    console.log("2. Show Recipe names by Author");
    console.log("3. Show Recipe names by Ingredient");
    console.log("4. Get Recipe by Name");
    console.log("5. Get Ingredients from Last Selected Recipe");
    console.log("0. Exit");
    return parseInt(prompt("Enter a number (1-5) or 0 to exit: "));
};

let choice; //

do {
    choice = displayMenu(); 
    switch (choice) {
        case 1:
            console.log("\nUnique Authors:");
            console.log(getUniqueAuthors(cakeRecipes));
            break;

        case 2:
            const authorName = prompt("Enter author's name: ");
            console.log(`\nRecipes by ${authorName}:`);
            logRecipeNames(getRecipesByAuthor(cakeRecipes, authorName));
            break;

        case 3:
            const ingredientName = prompt("Enter ingredient name: ");
            const recipesWithIngredient = getRecipesByIngredient(cakeRecipes, ingredientName);
            if (recipesWithIngredient.length > 0) {
                console.log(`\nRecipes containing "${ingredientName}":`);
                logRecipeNames(recipesWithIngredient);
            } else {
                console.log(`No recipes found containing "${ingredientName}".`);
            }
            break;
            
        case 4:
                const searchName = prompt("Enter recipe name:");
                const foundRecipe = getRecipeByNameIncluding(cakeRecipes, searchName); // Call the function to search by name
            
                if (foundRecipe) {
                    console.log("\nRecipe found:");
                    console.log(foundRecipe);
                    selectedRecipe = foundRecipe; // Store the found recipe for option 5
                   
                } else {
                    console.log(`No recipe found with a name containing: "${searchName}".`);
                }
                break;
            
        case 5:
            if (!selectedRecipe) {
                console.log("Please select a recipe first (option 4).");
            } else {
                console.log("\nGrocery List:");
                console.log(getIngredientsFromRecipe(selectedRecipe));
            }
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid input. Please enter a number between 0 and 5.");
    }
} while (choice !== 0);
