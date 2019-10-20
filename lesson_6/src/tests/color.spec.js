import color from '../color'

describe('0', () => {
    it('color', () => {
        expect(color([])).toBe('')
    })
})

describe('1', () => {
    it('color', () => {
        expect(color([{id: 1, params: {count: 1, color: 'white'}}])).toBe('white')
    })
})

describe('2', () => {
    it('color', () => {
        expect(color([{id: 1, params: {count: 2, color: 'red'}}, {id: '2', params: {count: 1, color: 'blue'}}])).toBe('red')
    })
})
