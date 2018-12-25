// Imports
import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Favourites from './models/Favourites';
import SearchView from './views/SearchView';
import RecipeView from './views/RecipeView';
import FavouritesView from './views/FavouritesView';
import SopphingListView from './views/ShoppingListView';
import { Fraction } from 'fractional-arithmetic';

// Global state of the app
const state = {
    search: undefined,
    recipe: undefined,
    shoppingList: undefined,
    favourites: undefined,
}
var searchViewCtrl;
var recipeViewCtrl;
var favouriteView; 
var shoppingListView;

init();

// Init function
function init() {
    console.log("Init app...");
    console.log("Creating controllers");
    // Instantiating controllers
    searchViewCtrl = new SearchView();
    recipeViewCtrl = new RecipeView();
    window.recView = recipeViewCtrl;
    favouriteView = new FavouritesView();
    shoppingListView = new SopphingListView();
    // Instantiating models
    state.favourites = new Favourites();
    state.shoppingList = new ShoppingList();
    // Add event handlers
    document.addEventListener('keypress', (ev) => { if (ev.keyCode === '13') { eventHandlerSearch(); } });
    searchViewCtrl.getButton().addEventListener("click", eventHandlerSearch);
    searchViewCtrl.getResults().addEventListener("click", eventHandlerLoadRecipe);
    searchViewCtrl.getPaginator().addEventListener("click", eventHandlerPaginator);
    favouriteView.getRecipePanel().addEventListener("click", eventHandlerRecipePanel);
    favouriteView.getFavouritesPanel().addEventListener("click", eventHandlerLoadFavourite);
    shoppingListView.getShoppingListUL().addEventListener("click", eventHandlerShoppingList);
    shoppingListView.getShoppingListUL().addEventListener("change", eventHandlerShoppingList);
}

// Event handlers
function eventHandlerSearch(event) {
    event.preventDefault();
    let query = searchViewCtrl.searchInput.value;
    controllerRetrieveSearch(query);
}

function eventHandlerPaginator(event) {
    let button = event.target.closest(".btn-inline");
    if (button) {
        let page = parseInt(button.dataset.goto);
        searchViewCtrl.render(state.search.recipes, page, state.search.getResPerPage());
    }
}

function eventHandlerLoadRecipe(event) {
    let id = searchViewCtrl.getClicked(event.target);
    if (id !== '') {
        controllerRetrieveRecipe(id);       
    }
}

function eventHandlerRecipePanel(event) {
    if (event.target.closest('.recipe__love') && state.recipe) {
        // Add to favourites
        let obj = state.favourites.find(o => o.getID() === state.recipe.id);
        if (obj === undefined) {
            state.favourites.push(state.recipe);
            favouriteView.addFavourite(state.recipe);
            console.log(`Favourite added ${state.recipe.getID()}`)
        }   
    } else if (event.target.closest('.btn-tiny')) {
        // Add/Decrease recipients
        let button = event.target.closest('.btn-tiny');
        if (button) {
            if (button.dataset.goto === '+') {
                state.recipe.changeServings(1);
            } else {
                state.recipe.changeServings(-1);
            }
            recipeViewCtrl.render(state.recipe);
        }
    } else if (event.target.closest('.recipe__btn')) {
        // Shopping list
        state.shoppingList.clear();
        state.recipe.getIngredients().forEach(ingredient => {
            state.shoppingList.addItem(ingredient.quantity, ingredient.unit, ingredient.description);
        });
        shoppingListView.render(state.shoppingList.getItems());
    }
}

function eventHandlerShoppingList(event) {
    let nodo = event.target.closest('.shopping__item');
    if (event.target.closest('.shopping__delete')) {
        if (state.shoppingList.deleteItem(nodo.id)) {
            shoppingListView.deleteItem(nodo);
        }
    } else if (event.target.tagName === 'INPUT') {
        state.shoppingList.updateQuantity(nodo.id, event.target.value);
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
            searchViewCtrl.render(recipes, 1, state.search.getResPerPage());
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
    } catch (error) {
        console.log(error);
    }
}