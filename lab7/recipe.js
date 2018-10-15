const mongoCollections = require("./mongoCollections");
const recipes = mongoCollections.recipes;
const uuidv4 = require('uuid/v4');

const getAllRecipes = async () => {
    //responds with an array of all recipes in the format of:
    //{_id: RECIPE_ID, title: RECIPE_TITLE}
};

const getRecipe = async (id) => {
    //responds with the full content of the specified recipe
};

const createRecipe = async (params) => {
    //creates a recipe with the supplied data in the request
    //body, and returns the new recipe
};

const updateRecipe = async (id, params) => {
    //updates the specified recipe by replacing the recipe
    //with the new recipe content, and returns the updated recipe
};

const patchRecipe = async (id, params) => {
    //update the specified recipe with only the supplied
    //changes, and returns the updated recipe
};

const deleteRecipe = async (id) => {
    //delete the recipe and return nothing
};
