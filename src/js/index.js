// Imports
import Search from './models/Search';
import Recipe from './models/Recipe';
import SearchView from './views/SearchView';
import RecipeView from './views/RecipeView';
import FavouritesView from './views/FavouritesView';

// Global state of the app
const state = {
    search: undefined,
    recipe: undefined,
    shoppingList: [],
    favourites: [],
}
var searchViewCtrl;
var recipeViewCtrl;
var favouriteView; 

init();

// Init function
function init() {
    console.log("Init app...");
    console.log("Creating controllers");
    // Instantiating controllers
    searchViewCtrl = new SearchView();
    recipeViewCtrl = new RecipeView();
    favouriteView = new FavouritesView();
    // Add event handlers
    searchViewCtrl.getButton().addEventListener("click", eventHandlerSearch);
    document.addEventListener('keypress', (ev) => { if (ev.keyCode === '13') { eventHandlerSearch(); } });
    searchViewCtrl.getResults().addEventListener("click", eventHandlerLoadRecipe);
    favouriteView.getAddButton().addEventListener("click", eventHandlerAddFavs);
}

// Controller functions
function eventHandlerSearch(event) {
    event.preventDefault();
    let query = searchViewCtrl.searchInput.value;
    controllerRetrieveSearch(query);
}

function eventHandlerLoadRecipe(event) {
    let id = searchViewCtrl.getClicked(event.target);
    if (id !== '') {
        controllerRetrieveRecipe(id);       
    }
}

function eventHandlerAddFavs(event) {
    if (event.target.classList.contains("header__likes")) {
        if (state.recipe !== undefined) {
            let obj = state.favourites.find(o => o.getID() === state.recipe.id);
            if (obj === undefined) {
                state.favourites.push(state.recipe);
                favouriteView.addFavourite(state.recipe);
            }   
        }
    }
}

// Async functions
async function controllerRetrieveSearch(query) {
    if (query !== 'query') {
        try {
            state.search = new Search(query);
            await state.search.callAPI();
            let recipes = state.search.getRecipes();
            searchViewCtrl.render(recipes);
        } catch (error) {
            console.log(error);
        }
    }
}

async function controllerRetrieveRecipe(id) {
    let cont = 1;
    try {
        let obj = state.search.recipes.find(o => o.getID() === id);
        if (obj !== undefined && ( state.recipe === undefined || obj.getID() !== state.recipe.getID())) {
            state.recipe = obj;
            if (state.recipe.getLoaded() !== true) {
                console.log(cont);
                cont++;
                await state.recipe.callAPI(); 
            }
            recipeViewCtrl.render(state.recipe);
        }
    } catch (error) {
        console.log(error);
    }
}