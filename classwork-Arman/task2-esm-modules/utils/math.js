export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const average = (numbers) => {
    if(!numbers.length) return 0;
    const sum = numbers.reduce((sum, current) =>{
        return sum + current;
    }, 0)

    return sum / numbers.length;
}

