import { Item, PRODUCT_TYPE } from "./ItemClass";

export class StoreInventory {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        // Keep track of items to remove
        let itemsToRemove = [];

        // Loop through store inventory
        for (let i = 0; i < this.items.length; i++) {
            // Update sellIn date and quality based on product type
            switch (this.items[i].product_type) {
                case PRODUCT_TYPE.AGED:
                    this.items[i].sellIn--;
                    // AGED products (like cheese) are the only ones that increase in quality
                    if ( this.items[i].quality < 25 )  {
                        this.items[i].quality++;
                    }
                    break;
                case PRODUCT_TYPE.ORGANIC:
                    this.items[i].sellIn--;
                    this.items[i].quality -= 2;
                    if ( this.items[i].sellIn < 0 ) {
                        this.items[i].quality -= 2;
                    }
                    break;
                case PRODUCT_TYPE.INORGANIC:
                    // does not have to sold and does not decrease in quality
                    break;
                case PRODUCT_TYPE.NORMAL:
                    this.items[i].sellIn--;
                    this.items[i].quality--;
                    if ( this.items[i].sellIn < 0 ) {
                        this.items[i].quality--;
                    }
                    break;
                default:
                    throw new Error("Invalid product type")
            }

            // Prevent from quality to go below 0
            if ( this.items[i].quality < 0 ) {
                this.items[i].quality = 0;
            }

            // Create list of items to remove as they are too old
            if ( this.items[i].sellIn < -5 ) {
                itemsToRemove.push(i)
            }
        }

        // Remove old items
        for (let i = 0; i < itemsToRemove.length; i++) {
            this.items.splice(itemsToRemove[i] - i, 1)
        }

        return this.items;
    }
}
