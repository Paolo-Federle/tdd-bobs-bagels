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

})

describe('isFull', () => {
  let newBasket

  beforeEach(() => {
    newBasket = new Basket()
  })

  it('check empty basket', () => {
    for (let i = 0; i<5; i++){
      newBasket.addItem("BGLP")
      }
    expect(newBasket.isFull()).toBeFalse()
  })

  it('check full basket', () => {
    for (let i = 0; i<13; i++){
    newBasket.addItem("BGLP")
    }
    expect(newBasket.isFull()).toBeTrue()
  })

})