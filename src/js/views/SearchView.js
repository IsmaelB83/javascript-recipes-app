export default class SearchView { 

    // Constructor
    constructor() {
        this.container = document.querySelector('.results__list');
        this.query = document.querySelector('.search__field');

    }
    // Methods
    render(recipes) {
        this.clear();
        for (let i = 0; i < recipes.length && i < 10; i++) {
            const recipe = recipes[i];           
            let html = 
                `<li>
                    <a class="results__link results__link--active" href="#${recipe.getID()}">
                        <figure class="results__fig">
                            <img src="${recipe.getImageUrl()}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.getTitle().substring(0,18)+'...'}</h4>
                            <p class="results__author">${recipe.getPublisher()}</p>
                        </div>
                    </a>
                </li>`;
            this.container.insertAdjacentHTML('beforeend', html);               
        }
    }
    clear() {
        this.container.innerHTML = '';
        this.query.value = '';
    }
}