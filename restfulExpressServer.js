// import the modules to be used in the code
import express, { application } from 'express';
import fs from 'fs/promises';


// run express throught the app variable
const app = express();
// create the port
const PORT = 3000;

// use middleware
app.use(express.json());

app.post("/pets", (req, res) => {
    fs.readFile("pets.json", "utf-8").then((str) => {
        let data = JSON.parse(str);
        let newPet = req.body;

        if (!newPet.age || !newPet.kind || !newPet.name) {
            res.status(400).set('content-Type', 'text/plain').send("Bad Request");
        } else if (typeof(newPet.age) !== 'number') {
            res.status(400).set('content-Type', 'text/plain').send();
        } else {
            data.push(newPet);
            return fs.writeFile("./pets.json", JSON.stringify(data)).then(() => {
                res.type("application/json").status(201).send(req.body);
            });
        };
    });
});

app.get("/pets", (req, res) => {
    fs.readFile("./pets.json", "utf-8").then((str) => {
        const data = JSON.parse(str);
        res.send(data);
    });  
});

app.get("/pets/:index", (req, res) => {
    fs.readFile("./pets.json", "utf-8").then((str) => {
        const data = JSON.parse(str);
        const index = req.params.index;

        if(data[index]) res.send(data[index]);
        else {
            res.status(404).set('Content-Type', 'text-plain').send();
        }
    });
});

app.delete("/pets/:index", (req, res) => {
    fs.readFile("./pets.json", "utf-8").then((str) => {
        const index = req.params.index; 
        const data = JSON.parse(str);
        
        if (index > data.length - 1 || index < 1) {
            res.status(404).set('content-Type', 'text/plain').send();
            return;
        };

        let deletedPet = data[index];
        data.splice(index);
        fs.writeFile("./pets.json", JSON.stringify(data)).then(() => {
            res.type('application/json').status(200).send(deletedPet);
        });
    });
});

app.patch("/pets/:index", (req, res) => {
    fs.readFile("pets.json", "utf-8").then((str) => {
        let data = JSON.parse(str);
        let newPetInfo = req.body;
        let index = req.params.index;
        let key = Object.keys(newPetInfo)[0];

        if (index > data.length - 1 || index < 1) {
            res.status(404).set('content-Type', 'text/plain').send();
            return;
        };

        data[index][key] = newPetInfo[key];
        let updatedPet = data[index];

        fs.writeFile("./pets.json", JSON.stringify(data)).then(() => {
            res.type('application/json').status(200).send(updatedPet);
        });
    });
});

// start the server to accpet request
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});