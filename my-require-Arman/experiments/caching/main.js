const c1 = require("./counter.js");
const c2 = require("./counter.js");

console.log(c1.increment());
console.log(c1.increment());
console.log(c2.increment());
console.log(c1 === c2);

delete require.cache[require.resolve('./counter')];
const c3 = require('./counter.js');
console.log(c3.increment());
