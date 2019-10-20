import _ from 'lodash'

// Посчитать массу корзины
const summary = (memo, sum) => memo + sum
const getTotalWeight = ({ params: { weight, count } }) => weight * count

const mapWithWeight = _.partialRight(_.map, getTotalWeight)
const totalSum = _.partialRight(_.reduce, summary, 0)

export default _.flow([
    mapWithWeight,
    totalSum
])
