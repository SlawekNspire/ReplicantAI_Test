import { Item } from "./ItemClass";

export class OrganicItem extends Item {
    /**
     * For OrganicItem, quality decreases twice as fast
     */
    updateQuality() {
        this.quality -= 2;
        if ( this.sellIn < 0 ) {
            this.quality -= 2;
        }
        if  ( this.quality < 0 ) {
            this.quality = 0;
        }
    }
}
