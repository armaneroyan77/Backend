console.log("logger.js loaded")

let count = 0;
exports.log = function(message){
    ++count;
    console.log(`log #${count} ${message}`); 
}

exports.getCount = function(){
    return count;
}