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
    document.addEventListener('keypress', (ev) => { if (ev.keyCode === '13') { eventHandlerSearch(); } });
    searchViewCtrl.getButton().addEventListener("click", eventHandlerSearch);
    searchViewCtrl.getResults().addEventListener("click", eventHandlerLoadRecipe);
    searchViewCtrl.getPaginator().addEventListener("click", eventHandlerPaginator);
    favouriteView.getAddButton().addEventListener("click", eventHandlerAddFavs);
    favouriteView.getPanel().addEventListener("click", eventHandlerLoadFavourite);
}

// Controller functions
function eventHandlerSearch(event) {
    event.preventDefault();
    let query = searchViewCtrl.searchInput.value;
    controllerRetrieveSearch(query);
}

function eventHandlerPaginator(event) {
    alert(event.target);
    if (event.target.classList.contains("results__btn--prev") || event.target.classList.contains("results__btn--next") ) {
        let button = event.target;
        console.log(button);
    }
}

function eventHandlerLoadRecipe(event) {
    let id = searchViewCtrl.getClicked(event.target);
    if (id !== '') {
        controllerRetrieveRecipe(id);       
    }
}

function eventHandlerAddFavs(event) {
    if (event.target.classList.contains("header__likes") || event.target.classList.contains("recipe__love")) {
        if (state.recipe !== undefined) {
            let obj = state.favourites.find(o => o.getID() === state.recipe.id);
            if (obj === undefined) {
                state.favourites.push(state.recipe);
                favouriteView.addFavourite(state.recipe);
                console.log(`Favourite added ${state.recipe.getID()}`)
            }   
        }
    }
}

function eventHandlerLoadFavourite(event) {
    try {
        let id = favouriteView.getClicked(event.target);
        controllerRetrieveRecipe(id);          
        console.log(`Favourite loaded ${id}`);
    } catch (error) {
        console.log(`Error loading favourite ${error}, clicked in ${event.target}`);
    }
}

// Async functions
async function controllerRetrieveSearch(query) {
    if (query !== 'query') {
        try {
            searchViewCtrl.renderLoader();
            state.search = new Search(query);
            await state.search.callAPI();
            let recipes = state.search.getRecipes();
            searchViewCtrl.render(recipes, state.search.getCurrentPage(), state.search.getResPerPage());
            searchViewCtrl.clearLoader();
        } catch (error) {
            console.log(error);
        }
    }
}

async function controllerRetrieveRecipe(id) {
    try {
        let obj = state.search.recipes.find(o => o.getID() === id);
        recipeViewCtrl.renderLoader();
        if (obj === undefined) {
            state.recipe = new Recipe(id);
            await state.recipe.callAPI(); 
            recipeViewCtrl.render(state.recipe);
        } else if (obj !== undefined && ( state.recipe === undefined || obj.getID() !== state.recipe.getID())) {
            state.recipe = obj;
            if (state.recipe.getLoaded() !== true) {
                await state.recipe.callAPI(); 
            }
            recipeViewCtrl.render(state.recipe);
        }
        recipeViewCtrl.clearLoader();
    } catch (error) {
        console.log(error);
    }
}