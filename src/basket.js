const inventory = require("../inventory.json").inventory

class Basket {
    constructor(capacity = 10) {
        this.basketCapacity = capacity
        this.items = []
        this.inventory = inventory
    }

    findItem(searchedItem) {
        const retrieveItem = this.inventory.find(item => item.sku === searchedItem)
        if (retrieveItem) {
            return retrieveItem
        }
        return false
    }

    addItem(searchedItem) {
        const foundItem = this.findItem(searchedItem)
        if (foundItem && !this.isFull()) {
            this.items.push(foundItem)
            return this.items
        }
        return false
    }

    deleteItem(searchedItem) {
        const itemIndex = this.items.findIndex(item => item.sku === searchedItem)
        if (itemIndex === -1) {
            return false
        }
        this.items.splice(itemIndex, 1)
        return this.items
    }

    isFull() {
        if (this.items.length < this.basketCapacity) {
            return false
        } else {
            return true
        }
    }

}

module.exports = Basket