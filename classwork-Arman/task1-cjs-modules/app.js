const { printReport } = require("./report")
const {add, subtract, average, log, getCount} = require("./utils");
const config = require("./config.json");

log(`${config.appName} ${config.version}`);
log(`add(2, 3) = ${add(2, 3)}`);
log(`subtract(10, 4) = ${subtract(10, 4)}`);
log(`average([80, 90, 100]) = ${average([80, 90, 100])}`);

printReport([80, 90, 100]);

log(`some count for logger ${getCount() === 5}`);
console.log(`total log calls = ${getCount()}`);
