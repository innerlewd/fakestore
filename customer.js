var inquirer = require("inquirer")
var mysql = require("mysql")
inquirer
    .prompt([
        {
            type:"input",
            message: "first question",
            name: "first"
        },
        {
            type:"input",
            message: "second question",
            name: "second"
        }

    ])
    .then(function (answers) {
        console.log("Customer Loaded");
        console.log(answers);
    });