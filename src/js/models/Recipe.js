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
            const key = '10dee1231600a28eadf29e7be4436372';
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
    // Parse ingredients: quantity unit ingredient
    parseIngredients() {
        console.log(this.ingredients);
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

        // 2nd) Split quantity (everything before unit) and unit (word that exists unitStd)
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
            console.log(this.ingredients);          
        } catch (error) {
            console.log(error);
        }
        /* ==> this.ingredients HERE
        0:"{ quantity: 4.5,  unit: 'cup',   description: 'unbleached high-gluten, bread, or all-purpose flour, chilled' } "
        1:"{ quantity: 1.75, unit: 'tsp'    description: 'salt' } "
        2:"{ quantity: 1,    unit: 'tsp'    description: 'instant yeast' } "
        3:"{ quantity: 0.25  unit: 'cup'    description: 'olive oil' } "
        4:"{ quantity: 1.75  unit: 'cup'    description: 'water, ice cold' } "
        5:"{ quantity: 0     unit: ''       description: 'semolina flour or cornmeal for dusting' } */
    }
}

/* 
ingredients:Array(6)


ingredients:Array(10)
0:"1 medium head cauliflower, cut into florets"
1:"1 egg"
2:"1/2 cup mozzarella, shredded"
3:"1 teaspoon oregano or Italian seasoning blend"
4:"salt and pepper to taste"
5:"1 cup chicken, cooked and shredded"
6:"1/2 cup barbecue sauce"
7:"3/4 cup mozzarella, shredded"
8:"red onion to taste, thinly sliced"
9:"fresh cilantro to taste" 

ingredients:Array(22)
0:"1 1/2 cups warm water (105F-115F)"
1:"1 package (2 1/4 teaspoons) of active dry yeast (check the expiration date on the package)"
2:"3 1/2 cups bread flour (can use all-purpose but bread flour will give you a crisper crust)"
3:"2 Tbsp olive oil"
4:"2 teaspoons salt"
5:"1 teaspoon sugar"
6:"Olive oil"
7:"Cornmeal (to slide the pizza onto the pizza stone)"
8:"Tomato sauce (pure)"
9:"Mozzarella or Parmesan cheese, shredded"
10:"Feta cheese"
11:"Mushrooms, thinly sliced"
12:"Bell peppers, stems and seeds removed, thinly sliced"
13:"Italian sausage, cooked ahead"
14:"Chopped fresh basil"
15:"Pesto"
16:"Pepperoni, thinly sliced"
17:"Onions, thinly sliced"
18:"Sliced ham"
19:"A pizza stone, highly recommended if you want your pizza dough to be crusty"
20:"A pizza peel or a flat baking sheet"
21:"A pizza wheel for cutting the pizza, not required, but easier to deal with than a knife↵"

ingredients:Array(23)
0:"Pizza Crust"
1:"1/2 teaspoon Active Dry Yeast"
2:"3/4 cups Warm Water"
3:"2 cups All-purpose Flour"
4:"1/2 teaspoon Kosher Salt"
5:"3 Tablespoons Olive Oil"
6:"Pesto"
7:"3/4 cups Fresh Basil Leaves"
8:"1/2 cup Grated Parmesan Cheese"
9:"2 Tablespoons Pine Nuts"
10:"2 cloves Garlic, Peeled"
11:"Salt And Pepper, to taste"
12:"1/3 cup Extra Virgin Olive Oil"
13:"TOPPINGS:"
14:"2 whole Zucchini, Cut In Diagonal Slices"
15:"2 whole Summer Squash, Cut In Diagonal Slices"
16:"Olive Oil For Brushing"
17:"1 whole Yellow Bell Pepper"
18:"1 whole Red Bell Pepper"
19:"12 ounces, weight Fresh Mozzarella, Sliced"
20:"4 ounces, weight Goat Cheese"
21:"Extra Basil Leaves, For Garnish"
22:"Grated Or Shaved Parmesan Cheese, For Sprinkling"
*/