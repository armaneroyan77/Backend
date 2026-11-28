async function task() {
    console.log('A');
    await null;
    console.log('B');
}

console.log('C');
task();
console.log('D');