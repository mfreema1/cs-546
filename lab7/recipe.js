const mongoCollections = require("./mongoCollections");
const recipes = mongoCollections.recipes;
const uuidv4 = require('uuid/v4');

const _generateCleanRecipe = (params) => {
    let out = {}
    const acceptable_keys = ["title", "ingredients", "steps"]
    Object.keys(params).forEach((key) => {
        if(acceptable_keys.includes(key)) {
            out[key] = params[key];
        }
    });
    return out
}

const _generateSetObject = (params) => {
    let out = { $set: {} }
    const acceptable_keys = ["title", "ingredients", "steps"]
    Object.keys(params).forEach((key) => {
        if(acceptable_keys.includes(key))
            out["$set"][key] = params[key];
    });
    return out;
}

const _validateId = (id) => {
    if(!id || typeof id !== "string") throw "You must provide a valid id";
};

const _validateRecipe = (params) => {
    if(!params.title || typeof params.title !== "string") throw "Valid recipe title required";
    if(!params.ingredients || !Array.isArray(params.ingredients)) throw "Valid ingredient array needed";
    if(!params.steps || !Array.isArray(params.ingredients)) throw "Valid steps needed";
};

const getAllRecipes = async () => {
    //responds with an array of all recipes in the format of:
    //{_id: RECIPE_ID, title: RECIPE_TITLE}
    const recipeCollection = await recipes();
    const allRecipes = await recipeCollection.find({}, { title: 1 }).toArray();
    return allRecipes;
};

const getRecipe = async (id) => {
    //responds with the full content of the specified recipe
    _validateId(id);
    const recipeCollection = await recipes();
    const recipe = await recipeCollection.findOne({_id: id});
    if(recipe === null) throw "Recipe not found";
    return recipe
};

const createRecipe = async (params) => {
    //creates a recipe with the supplied data in the request
    //body, and returns the new recipe
    _validateRecipe(params);

    const recipeCollection = await recipes();
    const newRecipe = _generateCleanRecipe(params);
    newRecipe._id = uuidv4();
    
    const insertInfo = await recipeCollection.insertOne(newRecipe);
    if(insertInfo.insertedCount === 0) throw "Could not add new recipe";
    
    return await getRecipe(newRecipe._id);
};

const updateRecipe = async (id, params) => {
    //updates the specified recipe by replacing the recipe
    //with the new recipe content, and returns the updated recipe
    _validateId(id);
    _validateRecipe(params);
    const recipeCollection = await recipes();
    const updateInfo = await recipeCollection.updateOne({ _id: id }, { $set: { title: params.title, ingredients: params.ingredients, steps: params.steps }});
    if(updateInfo.modifiedCount === 0) throw "Could not update recipe";
    return await getRecipe(id);
};

const patchRecipe = async (id, params) => {
    //update the specified recipe with only the supplied
    //changes, and returns the updated recipe
    _validateId(id);
    const recipeCollection = await recipes();
    const updateInfo = await recipeCollection.updateOne({ _id: id }, _generateSetObject(params));
    if(updateInfo.modifiedCount === 0) throw "Could not patch recipe";
    return await getRecipe(id);
};

const deleteRecipe = async (id) => {
    //delete the recipe and return nothing
    _validateId(id);

    const recipeCollection = await recipes();
    const deleteInfo = await recipeCollection.deleteOne({ _id: id });
    if(deleteInfo.deletedCount === 0) throw "Could not delete recipe";
};

module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    patchRecipe: patchRecipe,
    deleteRecipe: deleteRecipe
}

// { 
//     _id: "A uuid",
//     title: "Recipe title",
//     ingredients: [
//       {
//         name: "Ingredient name",
//         amount: "portion amount"
//       }
//     ],
//     steps: [
//       "First step",
//       "Second step",
//       "Third step"
//     ]
//   }