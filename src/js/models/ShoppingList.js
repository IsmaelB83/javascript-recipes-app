import uniqid from 'uniqid';

// Export
export default class ShoppingList {

    constructor() {
        this.items = [];
    }
    // Getters
    getItems() { return this.items; }
    // Add / Delete / Update / Clear
    addItem(quantity, unit, description) {
        this.items.push (
            {
                id: uniqid(),
                quantity,
                unit,
                description
            }
        );
    }
    deleteItem(id) { 
        try {
            const index = this.items.findIndex(el => el.id === id);
            this.items.splice(index, 1); 
            return true;
        } catch (error) {
            return false;
        }
    }
    updateQuantity(id, quantity) {
        try {
            const index = this.items.findIndex(el => el.id === id);
            this.items[index].quantity = parseFloat(quantity);
            return true;
        } catch (error) {
            return false;
        }
    }
    clear() {
        this.items = [];
    }
}