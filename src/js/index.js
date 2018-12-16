import Search from './models/Search';
import Recipe from './models/Recipe';
import SearchView from './views/SearchView';
import RecipeView from './views/RecipeView';
//import Recipe from './models/Recipe';

let searchCtrl = new Search('');
let searchViewCtrl = new SearchView();
let recipeViewCtrl = new RecipeView();

// Event handlers
document.querySelector('.search__btn').addEventListener("click", search);
document.addEventListener('keypress', (event) => {
    if (event.keyCode === '13') {
        search();
    }
});
document.querySelector('.results__list').addEventListener("click", (event) => {
    // DOM Trasversing
    let nodo = event.target;
    let i = 0;
    while (i < 4) {
        if (nodo.className.search("results__link") === 0) {
            details(nodo.href.substring(nodo.href.search("#")+1));
        } else {
            nodo = nodo.parentElement;
        }
        i++
    }
});

// Async calls
async function search(event) {
    let query = document.querySelector('.search__field').value;
    if (query !== '') {
        try {
            searchCtrl.setQuery(query);
            await searchCtrl.searchRecipes();
            let recipes = searchCtrl.getRecipes();
            searchViewCtrl.render(recipes);
        } catch (error) {
            console.log(error);
        }
    }
}

async function details(id) {
    if (id !== '') {
        try {
            for (let i = 0; i < searchCtrl.recipes.length; i++) {
                if ( searchCtrl.recipes[i].getID() === id ) {
                    if (searchCtrl.recipes[i].getLoaded() !== true) {
                        searchCtrl.recipes[i].search(); 
                    }
                    recipeViewCtrl.render(searchCtrl.recipes[i]);
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}