import fs from "fs/promises"
import { resolve } from "path"

const readPetsFile = new Promise((resolve, reject) => {
    resolve (fs.readFile("pets.json", "utf-8", (data) => {
        const petsData = JSON.parse(data);
    }));
    reject ('error');
})

export { readPetsFile }