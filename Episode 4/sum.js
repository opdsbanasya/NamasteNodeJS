console.log("executed");

function calculateSum(a, b){
    return a+b;
}

var name = "Lenovo";

// When you have a single function or variable
// module.exports = calculateSum; 

//* When you have multiple functions and variables
module.exports = {
    name: name,
    calculateSum: calculateSum
};