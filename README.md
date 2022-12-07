# ReplicantAI_Test

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
    - "Organic" items degrade in Quality twice as fast as normal items
    - Once ANY item is 5 days past its sellIn date we can no longer sell it and it should be removed from our system
   
  **VS Code Tasks**

    - "doc" - creates API documentation using TypeDoc
    - "start" - runs the Inventory script showing the changes in products over a period of time
    - "test" - runs the Inventory_UT unit test script asserting on various behaviours
    - "build" - transcompiles code from src into JS in out directory

