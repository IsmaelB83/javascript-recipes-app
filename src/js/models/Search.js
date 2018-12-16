import Recipe from "./Recipe.js";

export default class Search {

    // Constructor
    constructor (query) {    
        this.query = query;     // Query a efectuar
        this.currentPage = 1;   // Número de página en  la que estamos actualmente
        this.lastPage = false;  // Indica si estamos actualmente en la página final
        this.pages = 1;         // Número de páginas que retorna la búsqueda
        this.results = 0;       // Número de resultados que retorna la búsqueda
        this.recipes = [];      // Recetas obtenidas
    }

    // Getters 
    getCurrentPage() { return this.currentPage; }
    getLastPage() { return this.lastPage };
    getPages() { return this.pages; };
    getResults() { return this.results; }
    getRecipes() { return this.recipes };
    // Setters 
    setQuery(query) { 
        this.query = query; 
        this.currentPage = 1;   
        this.lastPage = false;  
        this.pages = 1;         
        this.results = 0;       
        this.recipes = [];      
    };
    // Methods
    async searchRecipes(page='1') {
        const key = 'ccf20f28754ab5b310d4a62758737ba6';        
        try {
            let response = await fetch (`https://www.food2fork.com/api/search?key=${key}&q=${this.query}&page${page}`);
            let content = await response.json();
            // Sin Resultados
            if (content.count === 0 && page > 1) {
                return 0;
            } else {
                // Con resultados
                if (content.count === 30 && page > this.lastPage) {
                    this.results += content.count;
                    this.pages += 1;
                } else if (content.count < 30 && page === 1) {
                    this.results = content.count;
                    this.pages = 1;
                    this.lastPage = true;
                }
                // Obtengo las recetas y las añado al resultado
                let recipesAPI = content.recipes;
                recipesAPI.forEach(element => {
                    this.recipes.push( new Recipe (
                        element.recipe_id,
                        element.title,
                        element.image_url,
                        element.publisher));
                });
            }
            console.log(`API call succesfull --> search?${this.query}`);
        } catch (error) {
            console.log (`Error while trying to search ${this.busqueda}: ${error}`);
            return 0;
        }
    }
    async nextPage () {
        if (this.lastPage === false) {
            this.currentPage++;
            return this.search(this.currentPage);
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
}
 