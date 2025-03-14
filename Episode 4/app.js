const { name, calculateSum} = require("./sum")
const { calculateSum2, multiply } = require("./calculation")
const package = require("./package.json")
const util = require("node:util")

// import { name, calculateSum } from "./sum.js";

var ans = calculateSum(20,50);

// console.log("Sum is: ", ans);
// console.log(name);

var sum2 = calculateSum(21, 125);
// console.log("Sum 2 is: ", sum2);

var multi = multiply(50, 20);
// console.log("Multi is: ",  multi);

// console.log(package);

// console.log(util);
var txt = 'Congratulate %s on his %dth birthday!';
var result = util.format(txt, 'Linus', 6);

console.log(result);

