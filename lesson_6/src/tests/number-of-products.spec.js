import numberOfProducts from '../number-of-products'

describe('0', () => {
    it('numberOfProducts', () => {
        expect(numberOfProducts([])).toBe(0)
    })
})

describe('1', () => {
    it('numberOfProducts', () => {
        expect(numberOfProducts([{id: 1, params: {count: 1}}])).toBe(1)
    })
})

describe('2', () => {
    it('numberOfProducts', () => {
        expect(numberOfProducts([{id: 1, params: {count: 2}}])).toBe(2)
    })
})

describe('3', () => {
    it('numberOfProducts', () => {
        expect(numberOfProducts([{id: 1, params: {count: 2}}, {id: 2, params: {count: 1}}])).toBe(3)
    })
})
