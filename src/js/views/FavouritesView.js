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
    addFavourite(id, image_url, title, publisher) {
        let html = 
            `<li>
                <a class="likes__link" href="#${id}">
                    <figure class="likes__fig">
                        <img src="${image_url}" alt="${title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${title}</h4>
                        <p class="likes__author">${publisher}</p>
                    </div>
                </a>
            </li>`;
        this.favouritesPanel.insertAdjacentHTML('beforeend', html);
    }
    deleteFavourite(id) {
        let nodo = this.favouritesPanel.querySelector(`*[href="#${id}"]`);
        if (nodo) {
            nodo.parentElement.removeChild(nodo);
        }
    }
}