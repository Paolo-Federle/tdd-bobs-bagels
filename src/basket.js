const inventory = require("../inventory.json").inventory

// change/alter?

class Basket {
    constructor(capacity = 10) {
        this.basketCapacity = capacity
        this.items = []
        this.inventory = JSON.parse(JSON.stringify(inventory))
    }

    findItem(searchedItem) {
        const retrieveItem = this.inventory.find(item => item.sku === searchedItem)
        if (retrieveItem) {
            return retrieveItem
        }
        return false
    }

    addItem(searchedItem, addHowMany = 1) {
        const foundItem = this.findItem(searchedItem)
        if (foundItem) {
            for (let i = 0; i < addHowMany; i++) {
                if (!this.isFull()) {
                    this.items.push(JSON.parse(JSON.stringify(foundItem)))
                }
            } return this.items
        }
        return false
    }

    deleteItem(searchedItem) {
        const itemIndex = this.items.findIndex(item => item.sku === searchedItem)
        if (itemIndex === -1) {
            return false
        }
        this.items.splice(itemIndex, 1)
        if (this.findItem(searchedItem)) {
            this.deleteItem(searchedItem)
        }
        return this.items
    }

    isFull() {
        if (this.items.length < this.basketCapacity) {
            return false
        } else {
            return true
        }
    }

    getPrices() {
        const prices = this.inventory.map(
            (({ sku, price }) => ({ sku, price }))
        )
        return prices
    }

    totalCost() {
        let total = 0
        console.log(this.items)
        for (let i = 0; i < this.items.length; i++) {
            total += Number(this.items[i].price)
            // console.log(total)
        }
        return total
    }

    inventoryPriceEditItem(skuToEdit, newValue) {
        const editedItem = this.findItem(skuToEdit).price = newValue
        return editedItem
    }

    basketPriceEditItem(skuToEdit, newValue, howManyItems) {
        for (let i=0; i < howManyItems; i++) {
            if (this.items[i].sku === skuToEdit){
                this.items[i].price = newValue
            }
        }
    }

}

module.exports = Basket