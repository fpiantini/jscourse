import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        // example of splice and slice:
        // splice: [2,4,8,16].splice(1,2) --> return [4,8] original array = [2,16]
        // slice: [2,4,8,16].slice(1,2) --> return 4, original array = [2,4,8,16]
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}