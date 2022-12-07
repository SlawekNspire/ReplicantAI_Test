import { Item } from "./ItemClass";

/**
 * AgedItem (like cheese) increase in quality over time
 */
export class AgedItem extends Item {
    updateQuality() {
        if ( this.quality < 25 ) {
            this.quality++;
        }
    }
}
