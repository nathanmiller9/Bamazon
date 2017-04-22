# HW - {Bamazon}

## Live Link 
 - https://github.com/nathanmiller9/Bamazon
 
## Video Walkthrough
 - https://www.youtube.com/watch?v=Rv6Rr33r6fQ

## This is a command line application which uses two files to allow customers and managers to read and update an inventory database.

## Requirements
#### Challenge 1 
- Create Inventory Database of about ten items (with 5 columns for each item).
- Create a Node app called bamazonCustomer.js which will display all items for sale upon loading.
  1. Then prompt users with two messages
    - "What would you like to buy?"
    - "How many of this item would you like to buy?"
  2. Once order is placed
    - Check if there is enough inventory for selected item
    - If not, indicate insufficent quantity
    - If yes, fulfill order, update database, and display total cost

#### Challenge 2
- Create a Node app called bamazonManager.js
- Upon load, list a set of menu options for a manager. Attach a function to be performed for each menu option once it is selected.
  1. View Products for Sale -- lists every available item.
  2. View Low Inventory -- lists all products that fewer than five items in their inventory.
  3. Add to Inventory -- displays a prompt which allows the manager to add more of any item currently in the store.  
  4. Add New Product -- allows the manager to add a completely new product to the store.  

## Technologies Used
- Node.js
- MySQL
- npm packages including inquirer

## Code Explaination
- Created database in MySQL and used Node.js along with npm package inquirer to read, update, and display information from the database.  Had to establish connection to the database using require.  Declared functions, calling functions within functions, and dealt with a lot scoping.  Used the ".then" feature to force things to happen in order.  Used most of the CRUD method for MySQL to manipulate, alter, and display data.  
