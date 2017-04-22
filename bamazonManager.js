var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Nm220909@#",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});

// function which prompts the manager to choose which action they'd like to take
var start = function() {
    inquirer.prompt({
        name: "managerMenu",
        type: "rawlist",
        message: "Manager Menu.  Please select an item from the menu below.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.managerMenu.toUpperCase() === "VIEW PRODUCTS FOR SALE") {
            print();
        }
        if (answer.managerMenu.toUpperCase() === "VIEW LOW INVENTORY") {
            viewLow();
        }
        if (answer.managerMenu.toUpperCase() === "ADD TO INVENTORY") {
            addToInventory();
        }
        if (answer.managerMenu.toUpperCase() === "ADD NEW PRODUCT") {
            addNewProduct();
            
        }
    });
};

var print = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}

var viewLow = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
        }
        console.log("-----------------------------------");
    });
}

// function which prompts the manager to choose which action they'd like to take
var addToInventory = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "product",
            type: "input",
            message: "Please enter the ID number of the product for which you would like to add inventory."
        }, {
            name: "addInventory",
            type: "input",
            message: "Please enter the number of units that you would like to add to your current inventory."
        }]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === parseInt(answer.product)) {
                    chosenItem = results[i];
                }
            }
            var totalInventory = chosenItem.stock_quantity + parseInt(answer.addInventory);
            console.log(totalInventory);
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: totalInventory
            }, {
                item_id: chosenItem.item_id
            }], function(err, res) {});
            console.log(answer.addInventory + " units have been added to the " + chosenItem.product_name + " inventory. \nThe new inventory for " + chosenItem.product_name + "s is " + totalInventory);
        });
    });
};

var addNewProduct = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "name",
            type: "input",
            message: "Please enter the name of the new product that you would like to add to the inventory."
        }, {
            name: "department",
            type: "input",
            message: "Please enter the department of the new product."
        }, {
            name: "price",
            type: "input",
            message: "Please input the price of your new product."
        }, {
            name: "quantity",
            type: "input",
            message: "Please enter the amount of total inventory for your new product."
        }]).then(function(answer) {
        	console.log(answer.name + answer.department + answer.price + answer.quantity);
            connection.query("INSERT INTO products SET ?", {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            }, function(err, res) {});
        });
    });
};
start();


