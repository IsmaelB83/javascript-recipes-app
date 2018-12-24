import Recipe from "./Recipe.js";

export default class Search {

    // Constructor
    constructor (query) {    
        this.query = query;     // Query a efectuar
        this.resPerPage = 10;   // Número de resultados por página
        this.recipes = [];      // Recetas obtenidas
    }
    // Getters 
    getResPerPage() { return this.resPerPage; }
    getResults() { return this.recipes.length; }
    getRecipes() { return this.recipes }
    // Methods
    async callAPI(page='1') {
        const key = 'e93a67c1699ac5a04cccb2f54a390352';        
        try {
            let response = await fetch (`https://www.food2fork.com/api/search?key=${key}&q=${this.query}&page${page}`);
            let content = await response.json();
            let recipesAPI = content.recipes;
            recipesAPI.forEach(element => {
                this.recipes.push( new Recipe (
                    element.recipe_id,
                    element.title,
                    element.image_url,
                    element.publisher));
            });
            console.log(`API call succesfull --> search?${this.query}`);
        } catch (error) {
            console.log (`Error while trying to search ${this.busqueda}: ${error}`);
        }
    }
}
 