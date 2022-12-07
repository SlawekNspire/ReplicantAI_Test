/** Constant.  Product quality cannot exceed 25 */
export const MAX_PRODUCT_QUALITY : number = 25;

/** Constant.  Product selling date cannot go below -5 (5 days overdue) */
export const MIN_SELL_EXPIRATION : number = -5; 
/**
 * Item class.  Stores information about one item to be sold
 */
export class Item {
    name: string;
    sellIn: number;
    quality: number;
    isTooOld: boolean = false;

    /**
     * Item constructor
     * @param name - name of the product
     * @param sellIn - number of days till the item is sold (cannot be < MIN_SELL_EXPIRATION)
     * @param quality - quality of the product (cannot be > MAX_PRODUCT_QUALITY)
     * @param product_type (optional) defaulted to PRODUCT_TYPE.NORMAL 
     */
    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        if (sellIn < MIN_SELL_EXPIRATION) {
            throw new Error("sellIn cannot be less than " + MIN_SELL_EXPIRATION)
        }
        this.sellIn = sellIn;
        if ((quality > MAX_PRODUCT_QUALITY) || (quality < 0)) {
            throw new Error("Quality has to between 0 and " + MAX_PRODUCT_QUALITY)
        }
        this.quality = quality;
    }

    /**
     * Helper method to update sellIn and quality
     */
    updateInventory() {
        this.updateSellIn();
        this.updateQuality();
    }

    /**
     * Updates sellIn date and indicates if the item is past max expiration date
     */
    updateSellIn() {
        this.sellIn--;
        if ( this.sellIn < MIN_SELL_EXPIRATION ) {
            this.sellIn = MIN_SELL_EXPIRATION;
            this.isTooOld = true;
        }
    }

    /**
     * Updates quality.  Quality decreases twice as fast if it's past due
     */
    updateQuality() {
        this.quality--;
        if ( this.sellIn < 0 ) {
            this.quality--;
        }
        if ( this.quality < 0 ) {
            this.quality = 0;
        }
    }
}
