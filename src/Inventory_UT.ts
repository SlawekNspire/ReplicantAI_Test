/**
 * Unit tests for Inventory and ItemClass.  Tested using chai and sinon-chai packages.
 */

// Imports
import { AgedItem } from "./AgedItemClass";
import { InorganicItem } from "./InorganicItemClass";
import { Item } from "./ItemClass";
import { OrganicItem } from "./OrganicItemClass";
import { StoreInventory } from "./StoreInventoryClass";


let chai = require('chai')
let sinonChai = require('sinon-chai')
let expect = chai.expect

chai.should()
chai.use(sinonChai)

console.log('Tests started');

try {

    let testItmes = [
        new OrganicItem("test_organic",   10, 10),
        new InorganicItem("test_inorganic", 10, 10),
        new AgedItem("test_cheese",    10, 10),
        new Item("test_normal",    10, 10),
        new Item("test_old",        0,  0),
    ];
    let testInventory = new StoreInventory(testItmes);

    // Check for exception when entering wrong quality
    chai.expect(function () { new Item("test_too_good", 10, -1) }).to.throw('Quality has to between 0 and');
    chai.expect(function () { new Item("test_too_old", -6, 10) }).to.throw('sellIn cannot be less than');

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