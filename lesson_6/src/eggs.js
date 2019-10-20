import { ProductItem } from './product-item'

export class Eggs extends ProductItem {
    roast () {
        console.log(`${this.title} пожарены`)
    }

    eat () {
        console.log(`${this.title} съедены`)
    }
}
