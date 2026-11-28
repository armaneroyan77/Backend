import {add, subtract, average, count, log} from "./utils/index.js";
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import { json } from "node:stream/consumers";

const configPath = path.join(import.meta.dirname, 'config.json');
const configData = await readFile(configPath, 'utf8');
const config = JSON.parse(configData);

log(`${config.appName} ${config.version} started`)
log(`add(2, 3) = ${add(2, 3)}`);
log(`subtract(10, 4) = ${subtract(10, 4)}`);
log(`average([80, 90, 100]) = ${average([80, 90, 100])}`);
console.log(`count (live binding): ${count}`);

const language = process.argv[2] || 'en';
const supportedLanguages = ['en', 'hy'];
if(!supportedLanguages.includes(language)){
     console.log(`No translation for "${language}". Supported: en, hy`);    
}
else{
    const data = await import(`./i18n/${language}.js`);
    console.log(data.default.welcome);
}