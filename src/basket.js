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

    totalCost(special = false) {
        let total = 0
        if (special) {
            this.specialOffer()
        }
        for (let i = 0; i < this.items.length; i++) {
            total += Number(this.items[i].price)
            // console.log(total)
        }
        return total.toFixed(2)
    }

    inventoryPriceEditItem(skuToEdit, newValue) {
        const editedItem = this.findItem(skuToEdit).price = newValue
        return editedItem
    }

    basketPriceEditItem(skuToEdit, newValue, howManyItems) {
        let itemEdited = 0
        for (let i = 0; i < this.items.length; i++) {
            if (itemEdited === howManyItems) {
                return
            }
            if (this.items[i].sku === skuToEdit) {
                this.items[i].price = newValue
                itemEdited++
            }
        }
    }

    specialOffer() {
        const bgloOffer = Math.floor((this.items.filter(obj => obj.sku === "BGLO").length) / 6)
        for (let i = 0; i < bgloOffer; i++) {
            this.basketPriceEditItem("BGLO", `${(2.49 / 6).toFixed(2)}`, 6)
        }
        const bglpOffer = Math.floor((this.items.filter(obj => obj.sku === "BGLP").length) / 12)

        for (let i = 0; i < bglpOffer; i++) {
            this.basketPriceEditItem("BGLP", `${(3.99 / 12).toFixed(2)}`, 12)
        }
        const bgleOffer = Math.floor((this.items.filter(obj => obj.sku === "BGLP").length) / 12)
        for (let i = 0; i < bglpOffer; i++) {
            this.basketPriceEditItem("BGLE", `${(2.49 / 6).toFixed(2)}`, 6)
        }
        const bgplRemainder = this.items.filter(obj => obj.sku === "BGLP").length % 12
        const howManyCoffee = this.items.filter(obj => obj.sku === "COF").length
        if (bgplRemainder !== 0 & howManyCoffee > 0) {
            const lesserBetweenBagelCoffee = Math.min(bgplRemainder, howManyCoffee)
            const filteredItems = this.items.filter(obj => obj.sku === "BGLP")
            this.basketPriceEditItem("COF", `1.25`, lesserBetweenBagelCoffee)

            for (let i = 0; i < lesserBetweenBagelCoffee; i++) {
                // console.log(this.items.filter(obj => obj.sku === "BGLP")[i+13])
                filteredItems[i + (bglpOffer * 12)].price = "0.00"
            }
        }
    }

}

module.exports = Basket