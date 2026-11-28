const start = Date.now();
const time = () => `${Date.now() - start} ms`;

const interval = setInterval(() => console.log('tick at', time()), 200);

setTimeout(() => {
    console.log('heavy work starts at', time());
    const end = Date.now() + 2000;
    while (Date.now() < end) {} // blocks the main thread for 2 s
    console.log('heavy work ends at', time());
}, 500);

setTimeout(() => clearInterval(interval), 3500);