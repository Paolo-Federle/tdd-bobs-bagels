const Basket = require('../src/basket.js')

describe('Basket', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('should create a new basket', () => {
    expect(newBasket).toBeInstanceOf(Basket)
    expect(newBasket.basketCapacity).toBe(10)
    expect(newBasket.items).toEqual([])
  })

  it('should create a new basket with capacity 20', () => {
    newBasket = new Basket(20)
    expect(newBasket.basketCapacity).toBe(20)
  })

})

describe('findItem', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('should return BGLO item from inventory', () => {
    expect(newBasket.findItem("BGLO")).toEqual(
      {
        "sku": "BGLO",
        "price": "0.49",
        "name": "Bagel",
        "variant": "Onion"
      }
    )
  })

  it('should return false when searching for missing item from inventory', () => {
    expect(newBasket.findItem("BIGOLO")).toBeFalse()
  })

})

describe('addItem', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('should add a BGLE and a BGLS to the basket', () => {
    newBasket.addItem("BGLE")
    newBasket.addItem("BGLS")
    expect(newBasket.items).toEqual(
      [
        {
          "sku": "BGLE",
          "price": "0.49",
          "name": "Bagel",
          "variant": "Everything"
        },
        {
          "sku": "BGLS",
          "price": "0.49",
          "name": "Bagel",
          "variant": "Sesame"
        }
      ]
    )
  })

  it('should return false when adding for missing item from inventory', () => {
    expect(newBasket.addItem("BIGOLO")).toBeFalse()
  })

  it('should return BGLO item  when adding it as item and something that do not exist from inventory', () => {
    newBasket.addItem("BGLO")
    newBasket.addItem("BIGOLO")
    expect(newBasket.items).toEqual(
      [{
        "sku": "BGLO",
        "price": "0.49",
        "name": "Bagel",
        "variant": "Onion"
      }]
    )
  })
})

describe('deleteItem', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('should return only BGLO item from basket', () => {
    newBasket.addItem("BGLP")
    newBasket.addItem("BGLO")
    newBasket.deleteItem("BGLP")
    expect(newBasket.items).toEqual(
      [{
        "sku": "BGLO",
        "price": "0.49",
        "name": "Bagel",
        "variant": "Onion"
      }]
    )
  })

  it('should return empty array item from basket', () => {
    newBasket.addItem("BGLP")
    newBasket.deleteItem("BGLP")
    expect(newBasket.items).toEqual(
      []
    )
  })

  it('should return false if try to delete something that do not exist in the basket', () => {

    expect(newBasket.deleteItem("BGLP")).toBeFalse()
  })

  it('should delete all the items with the same name', () => {
    newBasket.addItem("BGLP")
    newBasket.addItem("BGLP")
    newBasket.addItem("BGLE")
    newBasket.addItem("BGLO")
    newBasket.deleteItem("BGLP")
    newBasket.deleteItem("BGLE")
    expect(newBasket.items).toEqual(
      [{
        "sku": "BGLO",
        "price": "0.49",
        "name": "Bagel",
        "variant": "Onion"
      }]
    )
  })

})

describe('isFull', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('check empty basket', () => {
    newBasket.addItem("BGLP", 5)
    expect(newBasket.isFull()).toBeFalse()
  })

  it('check full basket', () => {
    newBasket.addItem("BGLP", 13)
    expect(newBasket.isFull()).toBeTrue()
  })

})

describe('getPrices', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('return name and prices for all available product', () => {
    expect(newBasket.getPrices()).toEqual([
      {
        "sku": "BGLO",
        "price": "0.49"
      },
      {
        "sku": "BGLP",
        "price": "0.39"
      }, {
        "sku": "BGLE",
        "price": "0.49",
      },
      {
        "sku": "BGLS",
        "price": "0.49",
      },
      {
        "sku": "COF",
        "price": "0.99",
      },
      {
        "sku": "BGSE",
        "price": "2.99",
      },
      {
        "sku": "BGSS",
        "price": "4.99",
      }]
    )
  })
})

describe('totalCost', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('return total cost all object in the basket', () => {
    newBasket.addItem("BGLP")
    newBasket.addItem("BGLO")
    newBasket.addItem("BGSS")
    expect(newBasket.totalCost()).toBe("5.87")
  })

})

describe('inventoryPriceEditItem', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('return 1.00 as price for BGLP', () => {
    newBasket.addItem("BGLP")
    newBasket.inventoryPriceEditItem("BGLP", "1.00")
    expect(newBasket.inventory[1].price).toEqual("1.00")
  })

  it('return 1.00 as price for BGLP', () => {
    newBasket.inventoryPriceEditItem("BGLP", "1.39")
    newBasket.addItem("BGLP")
    newBasket.addItem("BGLO")
    newBasket.addItem("BGSS")
    expect(newBasket.totalCost()).toBe("6.87")
  })

})

describe('basketPriceEditItem', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket(30)
  })

  it('return total cost all object in the basket', () => {
    newBasket.addItem("BGLP", 6)
    newBasket.basketPriceEditItem("BGLP", "1.00", 3)
    expect(newBasket.totalCost()).toBe("4.17")
  })

})

describe('extension 1', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket(30)
  })

  it('extension 1, order #1', () => {
    newBasket.addItem("BGLO", 2)
    newBasket.addItem("BGLP", 12)
    newBasket.addItem("BGLE", 6)
    newBasket.addItem("COF", 3)
    expect(newBasket.totalCost("special")).toBe("10.43")
  })
  
  it('extension 1, order #2', () => {
    newBasket.addItem("BGLP", 16)
    expect(newBasket.totalCost("special")).toBe("5.52")
  })
  
  it('extension 1, order #personalized, 14 BGLP and 3 COF', () => {
    newBasket.addItem("BGLP", 14)
    newBasket.addItem("COF", 3)
    expect(newBasket.totalCost("special")).toBe("7.45")
  })
  
  it('extension 1, order #personalized, 17 BGLP and 4 COF', () => {
    newBasket.addItem("BGLP", 17)
    newBasket.addItem("COF", 4)
    expect(newBasket.totalCost("special")).toBe("9.35")
  })

})

