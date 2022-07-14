import http from "http";
import fs from "fs"

const petRegExp = /^\/pets\/(.*)$/;


const server = http.createServer((req, res) => {
    const matches = req.url.match(petRegExp); 
    
    if (req.url === "/pets" && req.method === "GET") {
        fs.readFile('pets.json', 'utf-8', (err, str) => {
            if (err) console.log("error");

            let data = JSON.parse(str);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
        });

    } else if (matches && req.method === "GET") {
        const id = matches[1];
        fs.readFile('pets.json', 'utf-8', (err, str) => {
            let data = JSON.parse(str);

            if (data[id]) {
                res.end(JSON.stringify(data[id]));
            } else {
                res.writeHead(404);
                res.end();
            }
        });

    } else if (req.url === "/pets" && req.method === "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const newPet = JSON.parse(body);
            fs.readFile("pets.json", "utf-8", (err, str) => {
                if (err) console.log("error");
                
                const existingPets = JSON.parse(str);
                existingPets.push(newPet);
                fs.writeFile("pets.json", JSON.stringify(existingPets), (error) => {
                    if (error) process.exit(1);

                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(newPet));
                });
            });
        });

    } else {
        res.writeHead(404);
        res.end();
    }
});



server.listen(3000, () => {
    console.log("server started on port 3000");
});
