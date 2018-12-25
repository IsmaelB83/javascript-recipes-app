export default class ShoppingListView { 

    // Constructor
    constructor() {
        this.shoppingListUL = document.querySelector('.shopping__list');
    }
    getShoppingListUL() { return this.shoppingListUL; }
    // Render
    clear() {
        this.shoppingListUL.innerHTML = '';
    }
    render(listItems) {
        let html = '';
        this.clear();
        listItems.forEach((item,i) => {
            html = 
            `<li id="${item.id}" class="shopping__item">
                <div class="shopping__count">
                    <input type="number" value="${item.quantity}" step="1">
                    <p>${item.unit}</p>
                </div>
                <p class="shopping__description">${item.description}</p>
                <button class="shopping__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
            `;
            this.shoppingListUL.insertAdjacentHTML('beforeend', html);
        });
    }
    deleteItem(nodo) {
        this.shoppingListUL.removeChild(nodo);
    }
    
}