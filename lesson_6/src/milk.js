import { ProductItem } from './product-item'

export class Milk extends ProductItem {
    pour () {
        console.log(`${this.title} налито`)
    }
    drink () {
        console.log(`${this.title} выпито`)
    }
}
