// Export
export default class ShoppingList {

    constructor() {
        this.soppingItems = [];
    }
    addItem(quantity, unit, description) {
        this.soppingItems.push ({
            quantity,
            unit,
            description
        })
    }
    getItems() { return this.soppingItems; }
}