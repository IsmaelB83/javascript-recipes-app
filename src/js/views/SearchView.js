import { limitTitle, insertLoader, removeLoader } from './utils'

export default class SearchView { 

    // Constructor
    constructor() {
        this.searchResults = document.querySelector('.results__list');
        this.searchInput = document.querySelector('.search__field');
        this.searchButton = document.querySelector('.search__btn');  
        this.resultPages = document.querySelector('.results__pages'); 
    }
    // Getter 
    getResults() { return this.searchResults; }
    getInput() { return this.searchInput; }
    getButton() { return this.searchButton; }
    getClicked(target) {
        // Inactivo el elemento previo si lo habí
        let aux = document.querySelector('.results__link--active');
        if (aux) {
            aux.classList.remove('results__link--active');
        }
        // Activo y devuelvo el nuevo elemento
        aux = target.closest(".results__link");
        if (aux) {
            aux.classList.add("results__link--active");
            return aux.href.split("#")[1];
        }
    }
    getPaginator() { return this.resultPages; }
    // Methods
    renderLoader() {
        insertLoader(this.searchResults);
    }
    render(recipes, page, resPerPage) {
        this.clear();
        for (let i = (page -1) * resPerPage; i < (page * resPerPage); i++) {
            const recipe = recipes[i];           
            let html = 
                `<li>
                    <a class="results__link" href="#${recipe.getID()}">
                        <figure class="results__fig">
                            <img src="${recipe.getImageUrl()}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitTitle(recipe.getTitle())}</h4>
                            <p class="results__author">${recipe.getPublisher()}</p>
                        </div>
                    </a>
                </li>`;
            this.searchResults.insertAdjacentHTML('beforeend', html);
        }
        this.paginator(recipes.length, page, resPerPage);         
    }
    clear() {
        this.searchResults.innerHTML = '';
        this.resultPages.innerHTML = '';
        this.searchInput.value = '';
    }
    paginator (results, page, resPerPage) {
        let htmlPrev = 
            `<button class="btn-inline results__btn--prev" data-goto="${page - 1}">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>`
        let htmlNext = 
            `<button class="btn-inline results__btn--next" data-goto="${page + 1}">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </button>`;
        if (page >  1) {
            this.resultPages.insertAdjacentHTML('afterbegin', htmlPrev);
        }
        if ( page * resPerPage < results ) {
            this.resultPages.insertAdjacentHTML('beforeend', htmlNext);
        }
    }
}