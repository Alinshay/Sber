export class ProductItem {
    constructor (item) {
        ProductItem.TOTAL_ITEMS += 1

        this.id = item.id
        this.params = item.params
        this.title = item.title
        this.costs = item.costs
        this.inTrash = false

        // На самом деле это обычно реализует через getter
        this.costsPerItem = this.costs / this.params.count
    }

    sendToTrash () {
        this.inTrash = true
    }

    getFromTrash () {
        this.inTrash = false
    }
}

ProductItem.TOTAL_ITEMS = 0
