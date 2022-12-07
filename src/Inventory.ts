/**
 * Main application used to run inventory calculations
 */

// Imports
import { Item, PRODUCT_TYPE } from "./ItemClass";
import { StoreInventory } from "./StoreInventoryClass";

/**  
 * Implementation
 */

// Items in the inventory
let items = [
    new Item("Apple", 10, 10),
    new Item("Banana", 7, 9),
    new Item("Strawberry", 6, 11),
    new Item("Cheddar Cheese", 10, 16, PRODUCT_TYPE.AGED),
    new Item("Instant Ramen", 0, 5, PRODUCT_TYPE.INORGANIC),
    new Item("Organic Avocado", 5, 16, PRODUCT_TYPE.ORGANIC),
];

// Initialize the store inventory
let storeInventory = new StoreInventory(items);

let days: number = 20;

// See how the inventory changes over the days
for (let i = 0; i < days; i++) {
    console.log("Day " + (i + 1) + "  ---------------------------------------");
    console.log("                  name      sellIn quality type");
    let data = items.map(element => {
        return [element.name, element.sellIn, element.quality, PRODUCT_TYPE[element.product_type]];

    });
    console.table(data)

    console.log();
    storeInventory.updateQuality();
}