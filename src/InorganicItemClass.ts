import { Item } from "./ItemClass";

/**
 * InorganicItem sellIn and quality does not change (infinite shelf life)
 */
export class InorganicItem extends Item {
    updateSellIn() {
    }

    updateQuality() {
    }
}
