var a = 514541;
var b = 872148;

setTimeout(()=>{
    console.log("Call me as soon as possible");
}, 0);

setTimeout(()=>{
    console.log("Call me after 3 seconds");
}, 3000);

function multiply(x, y){
    return x * y;
}

const ans = multiply(a, b);
console.log(ans);