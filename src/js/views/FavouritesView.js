export default class FavouritesView { 

    // Constructor
    constructor() {
        this.addFavouritesButton = document.querySelector('.recipe');
        this.viewFavouritesButton = document.querySelector('.likes__icon');
        this.favouritesPanel = document.querySelector('.likes__list');
    }
    // Getters
    getAddButton() { return this.addFavouritesButton; }
    getViewButton() { return this.viewFavouritesButton; }
    getPanel() { return this.favouritesPanel; }
    // Inserts favourite in the list
    addFavourite(recipe) {
        let html = 
            `<li>
                <a class="likes__link" href="#${recipe.id}">
                    <figure class="likes__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${recipe.title.substring(15)+"..."}</h4>
                        <p class="likes__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
        this.favouritesPanel.insertAdjacentHTML('beforeend', html);
    }
}