/**

  ======================================================
  Replicant Grocery Inventory Requirements Specification
  ======================================================

  Hi and welcome to team Replicant. As you know, we have extended our platform functionality to include 
  grocery inventory management. We also buy and sell only the finest goods. Unfortunately, our goods 
  are constantly degrading in quality as they approach their sell by date. We have a system in place 
  that updates our inventory for us. It was developed by a no-nonsense type named Iain, who has working 
  on self-service work. Your task is to add the new feature to our system so that we can begin selling 
  a new category of items. First an introduction to our system:

    - All items have a SellIn value which denotes the number of days we have to sell the item
    - All items have a Quality value which denotes how valuable the item is
    - At the end of each day our system lowers both values for every item

  Pretty simple, right? Well this is where it gets interesting:

    - Once the sellIn date has passed, Quality degrades twice as fast
    - The Quality of an item is never negative
    - The Quality of an item is never more than 25
    - "Cheddar Cheese" actually increases in Quality the older it gets
    - "Instant Ramen", never has to be sold or decreases in Quality

  We have recently signed a supplier of organic items. This requires an update to our system:

    - "Organic" items degrade in Quality twice as fast as normal items
    - Once ANY item is 5 days past its sellIn date we can no longer sell it and it should be removed from our system
  
  Your objectives for this challenge: 

    - We are looking to see how your technical approach considers these two themes:
      - Adding functionality that aligns with the spec posted above 
      - Improving old/ugly code to be be more readable, maintainable and testable
    - Unit testing is important to us so we have included Chai for test writing (https://www.chaijs.com/api/bdd/)
    - You don't have to know everything! Feel free to use Google. 
    - We're not interested in how fast you can code. Take as much time as you need to ensure your submission 
      reflects your best work.
    - If you find you're out of time, please note anything you wanted to do and how you would have done it.
      Please be as descriptive as possible.
    
*/

/**  
 * Classes
 */

enum PRODUCT_TYPE {
    NORMAL = 1,
    ORGANIC,
    AGED,
    INORGANIC,
}
class Item {
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

class StoreInventory {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        // Keep track of items to remove
        let itemsToRemove = [];

        // Loop through store inventory
        for (let i = 0; i < this.items.length; i++) {
            // Update sellIn date and quality based on product type
            switch (this.items[i].product_type) {
                case PRODUCT_TYPE.AGED:
                    this.items[i].sellIn--;
                    this.items[i].quality++;
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
            if ( this.items[i].sellIn < -5 ) {
                itemsToRemove.push(i)
            }
        }

        // Remove old items
        for (let i = 0; i < itemsToRemove.length; i++) {
            items.splice(itemsToRemove[i] - i, 1)
        }

        return this.items;
    }
}


/**  
 * Implementation
 */

let items = [
    new Item("Apple", 10, 10),
    new Item("Banana", 7, 9),
    new Item("Strawberry", 6, 11),
    new Item("Cheddar Cheese", 10, 16, PRODUCT_TYPE.AGED),
    new Item("Instant Ramen", 0, 5, PRODUCT_TYPE.INORGANIC),
    new Item("Organic Avocado", 5, 16, PRODUCT_TYPE.ORGANIC)
];


let storeInventory = new StoreInventory(items);

let days: number = 20;

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


/**  
 * Unit Tests 
 */

let chai = require('chai')
let sinon = require('sinon')
let sinonChai = require('sinon-chai')
let expect = chai.expect

chai.should()
chai.use(sinonChai)

try {

    let testItmes = [
        new Item("test_organic", 10, 10, PRODUCT_TYPE.ORGANIC),
        new Item("test_inorganic", 10, 10, PRODUCT_TYPE.INORGANIC),
        new Item("test_cheese", 10, 10, PRODUCT_TYPE.AGED),
        new Item("test_normal", 10, 10),
        new Item("test_old", 0, 0),
    ];
    let testInventory = new StoreInventory(testItmes);

    // Check for exception when entering wrong quality
    chai.expect(function () { new Item("test_wrong", 10, -1) }).to.throw('Quality has to between 0 and 25');

    // Decreases quality
    testInventory.updateQuality();

    // Check for sell in update
    expect(testItmes[1].sellIn).to.equal(10);
    expect(testItmes[3].sellIn).to.equal(9);

    // Check for quality update
    expect(testItmes[0].quality).to.equal(8);
    expect(testItmes[1].quality).to.equal(10);
    expect(testItmes[2].quality).to.equal(11);
    expect(testItmes[3].quality).to.equal(9);

    // Check for negative values
    expect(testItmes[4].quality).to.equal(0);

    console.log(`✅ Tests passed!`);

} catch (e) {
    console.warn(`❌ Tests failed`);
    console.error(e);
}