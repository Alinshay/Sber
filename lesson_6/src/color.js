import _ from 'lodash'

// Цвет корзины
// Цвет корзины зависит от кол-ва продуктов разного цветы: больше всего белых - белый
const max = (x, y) => (parseInt(x) > parseInt(y)) ? x : y
const getCounts = ({ params: {count, color} }) => count + ' ' + color
const sliceMas = (mas) => mas.slice(mas.search(' ') + 1, mas.length)

const mapWithCounts = _.partialRight(_.map, getCounts)
const maxCount = _.partialRight(_.reduce, max, '')

const result = _.flow([mapWithCounts, maxCount])

export default _.flow([
    result,
    sliceMas
])
