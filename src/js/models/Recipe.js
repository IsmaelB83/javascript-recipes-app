// Export
export default class Recipe {

    // Constructor de una receta
    constructor (id, title = '', image_url = '', publisher = '', social_rank = '', publisher_url = '', f2f_url = '', source_url = '') {
        this.id = id;
        this.publisher = publisher;
        this.publisher_url = publisher_url;
        this.f2f_url = f2f_url;        
        this.image_url = image_url;
        this.title = title;
        this.social_rank = social_rank;
        this.source_url = source_url;
        this.servings = 4;
        this.minutes = 60;
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
    async callAPI() {
        try {
            const key = 'e93a67c1699ac5a04cccb2f54a390352';
            let response = await fetch (`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            let content = await response.json();               
            this.title = content.recipe.title,
            this.image_url = content.recipe.image_url,
            this.publisher = content.recipe.publisher,
            this.social_rank = content.recipe.social_rank,
            this.publisher_url = content.recipe.publisher_url,
            this.f2f_url = content.recipe.f2f_url,
            this.source_url = content.recipe.source_url
            this.ingredients = content.recipe.ingredients;
            this.minutes = this.ingredients.length / 3 * 4;
            this.servings = 4;
            this.parseIngredients();
            this.loaded = true;
            console.log(`API call succesfull --> detail?${this.id}`);
        } catch (error) {
            console.log (`Error while trying to retrieve recipe ${id}: ${error}`);
        }
    }
    changeServings(num) {
        if (this.servings + num > 0) {
            let oldS = this.servings;
            this.servings = this.servings + num;
            this.ingredients.forEach(el => {
                let oldQS = el.quantity / oldS;
                el.quantity = oldQS * this.servings;
            });
        }
    }
    // Parse ingredients: quantity unit ingredient
    parseIngredients() {
        /* ==> this.ingredients HERE
        0:"4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled"
        1:"1 3/4 (.44 ounce) teaspoons salt"
        2:"1 teaspoon (.11 ounce) instant yeast"
        3:"1/4 cup (2 ounces) olive oil (optional)"
        4:"1 3/4 cups (14 ounces) water, ice cold (40F)"
        5:"Semolina flour OR cornmeal for dusting"*/
        
        // 1st) Standardize units, everything to lower case and delete parentheses blocks
        let newIngredients = []
        const unitNonStd = ['cups', 'ounces', 'teaspoons', 'teaspoon', 'tablespoons', 'tablespoon', 'packages', 'package']
        const unitStd = ['cup', 'ounce', 'tsp', 'tsp', 'tbsp', 'tbsp', 'pkt', 'pkt'];
        newIngredients = this.ingredients.map(el => {
            el = el.toLowerCase();
            el = el.replace(/ *\([^)]*\) */g, ' ');
            unitNonStd.forEach((unit, i) => {
                el = el.replace(unit, unitStd[i]);
            });
            return el;           
        });
        this.ingredients = newIngredients;
        
        /* ==> this.ingredients HERE
        0:"4 1/2 cup unbleached high-gluten, bread, or all-purpose flour, chilled"
        1:"1 3/4 tsp salt"
        2:"1 tsp instant yeast"
        3:"1/4 cup olive oil "
        4:"1 3/4 cup water, ice cold "
        5:"semolina flour or cornmeal for dusting" */

        // 2nd) Split quantity (everything before unit) and unit (first word that exists in array unitStd)
        try {
            newIngredients = [];
            let flagUnit, array;
            this.ingredients.forEach(el => {
                array = el.split(' ');
                flagUnit = false;
                for (let i = 0; i < unitStd.length && flagUnit === false; i++) {
                    const unit = unitStd[i];
                    if (el.search(unit) > -1) {
                        let aux = el.split(unit); // aux[0] = quantities // aux[1] = ingredient
                        aux[0] = aux[0].replace(/\s+$/, '').replace(' ','+');
                        newIngredients.push( 
                            {   quantity: eval(aux[0]),
                                unit,
                                description: aux[1].replace(/\s+$/, '')
                            }
                        );
                        flagUnit = true;
                    }
                }
                // Si no tiene unidad separo cantidad de descripcion y añado el objeto
                if (flagUnit === false) {
                    let quan;
                    try {
                        // Intento convertir la primera palabra a cantidad
                        quan = parseFloat(eval(array[0]));
                        try {
                            // Intento convertir la primera y segunda palabra a cantidad (caso de 1 2/3 por ejemplo)
                            quan = eval(array[0]+'+'+array[1]);
                            array.splice(0,2);
                            newIngredients.push( 
                                {   quantity: quan,
                                    unit: '',
                                    description: array.join(' ')
                                }
                            );
                        } catch (error) {
                            // Cantidad y sin unidad
                            quan = parseFloat(eval(array[0]));
                            array.splice(0,1);
                            newIngredients.push( 
                                {   quantity: quan,
                                    unit: '',
                                    description: array.join(' ')
                                }
                            );
                        }
                    } catch (error) {
                        // Sin cantidad ni unidad
                        newIngredients.push( 
                            {   quantity: 1,
                                unit: '',
                                description: array.join(' ')
                            }
                        );
                    }
                }
            });
            this.ingredients = newIngredients;  
        } catch (error) {
            console.log(`Error parsing ingredients: ${error}`);
        }
    }
}