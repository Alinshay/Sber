import { ProductItem } from './product-item'

export class Meat extends ProductItem {
    roast () {
        console.log(`${this.title} пожарено`)
    }
    eat () {
        console.log(`${this.title} съедено`)
    }
}
