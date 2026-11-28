const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const average = (numbers) => {
    if(!numbers.length) return 0;
    const sum = numbers.reduce((sum, current) =>{
        return sum + current;
    }, 0)

    return sum / numbers.length;
}

module.exports = {add, subtract, average};

