import { ProductItem } from './product-item'

export class Bread extends ProductItem {
    slice () {
        console.log('Хлеб нарезан')
    }
    eat () {
        console.log(`${this.title} съеден`)
    }
}
