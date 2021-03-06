import { insertLoader, removeLoader } from './utils';
import { Fraction } from 'fractional-arithmetic';

export default class RecipeView { 

    // Constructor
    constructor() {
        this.container = document.querySelector('.recipe');
    }
    // Methods
    renderLoader() {
        insertLoader(this.container);
    }
    render(recipe) {
        this.clear();
        let htmlIngredients = '', heart;
        if (recipe.liked === true) {
            heart = 'icon-heart';
        } else {
            heart = 'icon-heart-outlined';
        }
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i];
            let fractionQuan;
            // Display quantity as a fraction
            /* try {
                let integer, decimal, fraction;
                console.log(ingredient.quantity);
                [integer, decimal] = ingredient.quantity.toFixed(2).split('.');
                fractionQuan = parseInt(integer) !== 0 ? `${integer}`:``;
                if (parseInt(decimal) !== 0)  {
                    fraction = new Fraction(ingredient.quantity - integer);
                    fractionQuan += ` ${fraction.n}/${fraction.d}`;
                }
            } catch (error) {
                fractionQuan = ingredient.quantity.toFixed(2)
            } */
            htmlIngredients +=      
                `<li class="recipe__item">
                    <svg class="recipe__icon"><use href="img/icons.svg#icon-check"></use></svg>
                    <div class="recipe__count">${ingredient.quantity.toFixed(2)}</div>
                    <div class="recipe__ingredient"><span class="recipe__unit">${ingredient.unit}</span> ${ingredient.description}</div>
                </li>`;
        }
        let html = 
            `<figure class="recipe__fig">
                <img src="${ recipe.image_url }" alt="Tomato" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${ recipe.title }</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes"></span>
                    <span class="recipe__info-text">${recipe.minutes.toFixed(0)} minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people"></span>
                    <span class="recipe__info-text">${recipe.servings} servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny" data-goto="-">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny" data-goto="+">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${heart}"></use>
                    </svg>
                </button>
            </div>
            
            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${ htmlIngredients }
                </ul>
                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>
            
            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${ recipe.publisher }</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${ recipe.source_url }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </a>
            </div>`;
            this.container.innerHTML = html;
    }
    clear() {
        this.container.innerHTML = '';
    }    
}