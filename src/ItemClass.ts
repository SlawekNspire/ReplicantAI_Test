/**
 * PRODUCT_TYPE enumeration.  Used to specify product type used in quality calculations.
 */
export enum PRODUCT_TYPE {
    NORMAL = 1,
    ORGANIC,
    AGED,
    INORGANIC,
}

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
    product_type: PRODUCT_TYPE;

    /**
     * Item constructor
     * @param name - name of the product
     * @param sellIn - number of days till the item is sold (cannot be < MIN_SELL_EXPIRATION)
     * @param quality - quality of the product (cannot be > MAX_PRODUCT_QUALITY)
     * @param product_type (optinal) defaulted to PRODUCT_TYPE.NORMAL 
     */
    constructor(name: string, sellIn: number, quality: number, product_type: PRODUCT_TYPE = PRODUCT_TYPE.NORMAL) {
        this.name = name;
        if (sellIn < MIN_SELL_EXPIRATION) {
            throw new Error("sellIn cannot be less than " + MIN_SELL_EXPIRATION)
        }
        this.sellIn = sellIn;
        if ((quality > MAX_PRODUCT_QUALITY) || (quality < 0)) {
            throw new Error("Quality has to between 0 and " + MAX_PRODUCT_QUALITY)
        }
        this.quality = quality;
        this.product_type = product_type;
    }
}
