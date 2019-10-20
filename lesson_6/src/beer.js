import { ProductItem } from './product-item'
export class Beer extends ProductItem {
    pour () {
        console.log(`${this.title} налито`)
    }
    drink () {
        console.log(`${this.title} выпито`)
    }
}
