import { Item, PRODUCT_TYPE, MIN_SELL_EXPIRATION, MAX_PRODUCT_QUALITY } from "./ItemClass";

/**
 * StoryInventory class.
 * Responsible for keeping track of items, their selling date, and quality
 */
export class StoreInventory {
    items: Array<Item>;

    /**
     * Default constructor
     * @param items - array of Item
     */
    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /**
     * Updates the selling date (sellin) and quality of a product
     * based on the product type
     */
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
                    if ( this.items[i].quality < MAX_PRODUCT_QUALITY )  {
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
            if ( this.items[i].sellIn < MIN_SELL_EXPIRATION ) {
                itemsToRemove.push(i)
            }
        }

        // Remove old items
        for (let i = 0; i < itemsToRemove.length; i++) {
            this.items.splice(itemsToRemove[i] - i, 1)
        }
    }

    /**
     * Returns the current inventory of the store
     * @returns Array of Item - the inventory of the store
     */
    getInventory() {
        return this.items;
    }
}
