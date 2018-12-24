export default class FavouritesView { 

    // Constructor
    constructor() {
        this.recipePanel = document.querySelector('.recipe');
        this.viewFavouritesButton = document.querySelector('.likes__icon');
        this.favouritesPanel = document.querySelector('.likes__list');
    }
    // Getters
    getRecipePanel() { return this.recipePanel; }
    getFavouritesPanel() { return this.favouritesPanel; }
    getViewFavouritesButton() { return this.viewFavouritesButton; }
    // Inserts favourite in the list
    addFavourite(recipe) {
        let html = 
            `<li>
                <a class="likes__link" href="#${recipe.id}">
                    <figure class="likes__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${recipe.title}</h4>
                        <p class="likes__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
        this.favouritesPanel.insertAdjacentHTML('beforeend', html);
    }
    getClicked(nodo) {
        let parent;
        if (nodo.classList.contains("likes__author") || nodo.classList.contains("likes__name")) {
            parent = nodo.parentNode.parentNode;
        } else if (nodo.classList.contains("likes__fig")) {
            parent = nodo.parentNode;
        } else if (nodo.classList.contains("likes__link")) {
            parent = nodo;
        }
        return parent.href.split("#")[1];
    }
}