export let count = 0;
export const log = function(message){
    ++count;
    console.log(`log #${count} ${message}`); 
}
