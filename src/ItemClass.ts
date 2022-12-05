export enum PRODUCT_TYPE {
    NORMAL = 1,
    ORGANIC,
    AGED,
    INORGANIC,
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;
    // size?: boolean; // SJ: removed property as it is never used
    product_type: PRODUCT_TYPE;

    constructor(name: string, sellIn: number, quality: number, product_type: PRODUCT_TYPE = PRODUCT_TYPE.NORMAL) {
        this.name = name;
        this.sellIn = sellIn;
        if ((quality > 25) || (quality < 0)) {
            throw new Error("Quality has to between 0 and 25")
        }
        this.quality = quality;
        this.product_type = product_type;
    }
}
