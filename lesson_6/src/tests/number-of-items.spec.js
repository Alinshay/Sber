import numberOfItems from '../number-of-items'

describe('0', () => {
    it('numberOfItems', () => {
        expect(numberOfItems([])).toBe(0)
    })
})

describe('1', () => {
    it('numberOfItems', () => {
        expect(numberOfItems([{id: 1}])).toBe(1)
    })
})

describe('2', () => {
    it('numberOfItems', () => {
        expect(numberOfItems([{id: 1}, {id: 2}])).toBe(2)
    })
})
