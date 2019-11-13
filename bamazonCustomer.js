var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "docker",
    database: "bamazon"
});
connection.connect(function(err, res){
    if(err){
        throw err;
    } else {
        //console.log("database connection made")
    }
});
connection.query("SELECT * FROM product", function(err, result){
    if (err){
        throw err;
    } 
    console.log(result)
    inquirer.prompt([
        {
            type:"input",
            message: "What item would you like to buy?",
            name: "item_id"
        },
        {
            type:"input",
            message: "How many would you like to buy?",
            name: "quantity"
        }

    ])
    .then(function (answers) {
        connection.query("SELECT * FROM product WHERE item_id = ?", [answers.item_id], function(err, result){
            if (err){
                throw err;
            }
            var quantity = result[0].stock_quantity;
            var price = result[0].price;
            var product_sales = result[0].product_sales;
            if (answers.quantity > quantity) {
                console.log("Insufficient Quantity!")
            }
            else {
                connection.query("UPDATE product SET ? WHERE item_id = ?", [{stock_quantity: quantity - answers.quantity, 
                    product_sales: product_sales + (price * answers.quantity)}, answers.item_id], function(err, result){
                    if (err){
                        throw err;
                    }
                    console.log(result);
                })
            }
        })
        // console.log("Customer Loaded");
        // console.log(answers);
    });
    }
);
