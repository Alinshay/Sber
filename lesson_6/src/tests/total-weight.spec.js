import totalWeight from '../total-weight'

describe('totalWeight', () => {
    it('No items - weight zero', () => {
        expect(totalWeight([])).toBe(0)
    })
})

describe('totalWeight', () => {
    it('Count = 1', () => {
        expect(totalWeight([{id: 1, params: {count: 1, weight: 5}}])).toBe(5)
    })
})

describe('totalWeight', () => {
    it('Count > 1', () => {
        expect(totalWeight([{id: 1, params: {count: 2, weight: 5}}])).toBe(10)
    })
})
