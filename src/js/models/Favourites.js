// Export
export default class Favourites {

    // Constructor
    constructor() {
        this.storage = window.localStorage;
        var storedData = this.storage.getItem('favourites')
        if (storedData) {
            this.favourites = JSON.parse(storedData);
        } else {
            this.favourites = [];
        }
    }
    // Getter
    getItems() { return this.favourites; }
    // Methods
    addItem(recipe) {
        this.favourites.push(recipe);
        this.refreshStorage();
    }
    deleteItem(id) {
        let index = this.favourites.findIndex(el => el.id === id);
        this.favourites.splice(index,1);
        this.refreshStorage();
    }
    checkRecipe (id) {
        let index = this.favourites.findIndex(el => el.id === id);
        if (index >= 0) {
            return true;
        }
        return false;
    }
    refreshStorage() {
        this.storage.removeItem('favourites');
        this.storage.setItem('favourites', JSON.stringify(this.favourites));
    }
}