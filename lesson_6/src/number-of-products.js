import _ from 'lodash'

// Количество продуктов в корзине
const summary = (memo, sum) => memo + sum
const getTotalCount = ({ params: { count } }) => count
const mapWithCount = _.partialRight(_.map, getTotalCount)
const totalCount = _.partialRight(_.reduce, summary, 0)

export default _.flow([
    mapWithCount,
    totalCount
])
