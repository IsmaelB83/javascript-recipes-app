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
        let nodo = target;
        let i = 0;
        while (i < 4) {
            if (nodo.className.search("results__link") === 0) {
                return nodo.href.substring(nodo.href.search("#")+1);
            } else {
                nodo = nodo.parentElement;
            }
            i++;
        }
    }
    getPaginator() { return this.resultPages; }
    // Methods
    renderLoader() {
        insertLoader(this.searchResults);
    }
    clearLoader() {
        removeLoader(this.searchResults);
    }
    render(recipes, page, resPerPage) {
        this.clear();
        for (let i = (page -1) * resPerPage; i < (page * resPerPage); i++) {
            const recipe = recipes[i];           
            let html = 
                `<li>
                    <a class="results__link results__link--active" href="#${recipe.getID()}">
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