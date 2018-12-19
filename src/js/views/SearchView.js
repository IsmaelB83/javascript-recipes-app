export default class SearchView { 

    // Constructor
    constructor() {
        this.searchResults = document.querySelector('.results__list');
        this.searchInput = document.querySelector('.search__field');
        this.searchButton = document.querySelector('.search__btn');   
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
            this.searchResults.insertAdjacentHTML('beforeend', html);               
        }
    }
    clear() {
        this.searchResults.innerHTML = '';
        this.searchInput.value = '';
    }
}