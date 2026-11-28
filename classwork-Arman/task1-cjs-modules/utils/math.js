const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const average = (numbers) => {
    const sum = numbers.reduce((sum, current) =>{
        return sum + current;
    }, 0)

    return sum / numbers.length;
}

console.log(average([1, 3, 5]));