import express, { application } from 'express';
import fs from 'fs/promises';
import morgan from 'morgan';
import bodyParser from 'body-parser';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan());
app.use(bodyParser());

// Get request to handle the whole list
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

// create function responding to a post request
app.post("/pets", (req, res) => {
    fs.readFile("./pets.json", "utf-8").then((str) => {
        const data = JSON.parse(str);
        const newPet = req.body;

        if (!newPet.age || !newPet.kind || !newPet.name) {
            res.status(400).set('content-Type', 'text/plain').send();
        } else if (typeof(newPet.age) !== 'number') {
            res.status(400).set('content-Type', 'text/plain').send();
        } else {
            data.push(newPet);
            return fs.writeFile("./pets.json", JSON.stringify(data)).then(() => {
                res.send(newPet);
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


