/**
 * Main application used to run inventory calculations
 */

// Imports
import { Item } from "./ItemClass";
import { AgedItem } from "./AgedItemClass";
import { InorganicItem } from "./InorganicItemClass";
import { OrganicItem } from "./OrganicItemClass";
import { StoreInventory } from "./StoreInventoryClass";

/**  
 * Implementation
 */

// Items in the inventory
let items = [
    new Item("Apple", 10, 10),
    new Item("Banana", 7, 9),
    new Item("Strawberry", 6, 11),
    new AgedItem("Cheddar Cheese", 10, 16),
    new InorganicItem("Instant Ramen", 0, 5),
    new OrganicItem("Organic Avocado", 5, 20),
];

// Initialize the store inventory
let storeInventory = new StoreInventory(items);

let days: number = 20;

// See how the inventory changes over the days
for (let i = 0; i < days; i++) {
    console.log("Day " + (i + 1) + "  ----------------------------------");
    console.log("                  name      sellIn quality");
    let data = items.map(element => {
        return [element.name, element.sellIn, element.quality];

    });
    console.table(data)

    console.log();
    storeInventory.updateQuality();
}