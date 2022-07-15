import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;
const petRegExp = /^\/pets\/(.*)$/;

const filter = function (req, res, next) {
    const match = req.url.match(petRegExp);

    if(match) next();
    else res.send("invalid input");
    
}

app.use(filter);
// app.use(express.json);

// Get request to handle the whole list
app.get((req, res) => {
    fs.readFile("./pets.json", "utf-8", (err, str) => {
        if (err) process.exit(1);
        
        const index = match[1];
        const petsList = JSON.parse(str);
        const pet = petsList[index];
        res.send(pet);
    });
});


// // create function responding to a post request
// app.post("/pets/:age/:type:/name", (req, res) => {
//     fs.readFile("pets.json", "utf-8", (err, str) => {
//         if (error) process.exit(1);

//         const petsList = JSON.parse(str);
//         const newPet = req.params;
//         newPet.age = parseInt(newPet.age);
//         petsList.push(newPet);
//         res.send(newPet);
//         fs.writeFile("pets.json", JSON.stringify(petsList), (err) => {
//             console.log("success"); 
//         });
//     });
// });


// Return 200
// Content-Type is application/json
// Return all pets as JSON





app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


