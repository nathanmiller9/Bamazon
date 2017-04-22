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

var print = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
    });
    selectItemToBuy();
}

var selectItemToBuy = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer.prompt([{
            name: "choice",
            type: "input",
            message: "Please enter the ID number of the item you would like to purchase."
        }, {
            name: "quantity",
            type: "input",
            message: "Please enter the number of items you would like to purchase."
        }]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === parseInt(answer.choice)) {
                    chosenItem = results[i];
                }
            }
            if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
                var totalCost = chosenItem.price * parseInt(answer.quantity);
                var newQuantity = chosenItem.stock_quantity - parseInt(answer.quantity);
                console.log(newQuantity);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    item_id: chosenItem.item_id
                }], function(err, res) {});
                console.log("Good news, you can purchase " + answer.quantity + " " + chosenItem.product_name + "s for $" + chosenItem.price.toFixed(2) + " each. Your total cost will be $" + totalCost.toFixed(2) + ".");
            } else if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                console.log("Sorry, we only have " + chosenItem.stock_quantity + " in stock.  Please replace your order.")
            }
        });
    });
};



print();
