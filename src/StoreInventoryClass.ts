import { Item } from "./ItemClass";

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
     */
    updateQuality() {
        // Keep track of items to remove
        let itemsToRemove = [];

        // Loop through store inventory
        for (let i = 0; i < this.items.length; i++) {
            // Update sellIn date and quality based on product type
            this.items[i].updateInventory();

            // Create list of items to remove as they are too old
            if ( this.items[i].isTooOld ) {
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
