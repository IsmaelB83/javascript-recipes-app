// Export
export default class Recipe {

    // Constructor de una receta
    constructor (id, title, image_url, publisher, social_rank, publisher_url, f2f_url, source_url) {
        this.id = id;
        this.publisher = publisher;
        this.publisher_url = publisher_url;
        this.f2f_url = f2f_url;        
        this.image_url = image_url;
        this.title = title;
        this.social_rank = social_rank;
        this.source_url = source_url;
        this.loaded = false;
    }
    // Getters
    getID() { return this.id; }
    getPublisher() { return this.publisher; }
    getPublisherUrl() { return this.publisherUrl; }
    getImageUrl() { return this.image_url; }
    getTitle() { return this.title; }
    getSourceUrl() { return this.source_url; }
    getRecipeUrl() { return this.source_url; }    
    getIngredients() { return this.ingredients; }
    getLoaded() { return this.loaded; };
    // Busca la receta en la API
    async search() {
        try {
            const key = 'ccf20f28754ab5b310d4a62758737ba6';
            let response = await fetch (`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            let content = await response.json();               
            this.social_rank = content.social_rank,
            this.publisher_url = content.publisher_url,
            this.f2f_url = content.f2f_url,
            this.source_url = content.source_url
            this.ingredients = content.ingredients;
            this.loaded = true;
            console.log(`API call succesfull --> detail?${this.id}`);
        } catch (error) {
            console.log (`Error while trying to retrieve recipe ${id}: ${error}`);
        }
    }
}