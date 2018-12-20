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
    /* 'Pasta with tomato and spinach'
     * counter: 0 / counter + word.lengt: 5 / newTitle = ['Pasta']
     * counter: 5 / counter + word.lengt: 9 / newTitle = ['Pasta', 'with']
     * counter: 9 / counter + word.lengt: 15 / newTitle = ['Pasta', 'with', 'tomato']
     * counter: 15 / counter + word.lengt: 21 / newTitle = ['Pasta', 'with', 'tomato']
     * counter: 18 / counter + word.lengt: 24 / newTitle = ['Pasta', 'with', 'tomato']
     */
    limitTitle = function(title, limit = 17) {   // limitTitle = function(title, limit = 17)
        const newTitle = [];
        if (title.length > 17) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            title.split(' ').reduce((counter, word) => {
                if (counter + word.length <= limit) {
                    newTitle.push(word);
                }
                return counter += word.length;
            }, 0);
            return `${newTitle.join(' ')} ...`;
        }
        return title;
    }

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
                            <h4 class="results__name">${limitTitle(recipe.getTitle())}</h4>
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