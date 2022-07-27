// import the modules to be used in the code
import express, { application, response } from 'express';
import pg from "pg";
import expressBasicAuth from 'express-basic-auth';

const pool = new pg.Pool({
    // user: "dbuser",
    // password: "secret",
    database: "petshop"
});

// run express throught the app variable
const app = express();
// create the port
const PORT = 3000;

// use middleware
app.use(express.json());
app.use(expressBasicAuth ({
    users: { 'admin': 'meowmix' },
    unauthorizedResponse: "Unauthorized"
}));


// add a new pet to the db
app.post("/pets", (req, res) => {
    const { name, age, kind } = req.body;
    if (!age || !kind || !name) {
        res.sendStatus(400);
    } else if (typeof(age) !== 'number') {
        res.sendStatus(400);
    } else {
        pool.query("INSERT INTO pets (name, kind, age) VALUES ($1, $2, $3) RETURNING *",
        [name, kind, age]
        ).then((result) => {
            res.status(201).send(result.rows[0]);
        });
    };
});

// get all pets in the db
app.get("/pets", (req, res) => {
    pool.query("SELECT * FROM pets").then((str) => {
        res.send(str.rows);
    }).catch((err) => {
        console.log(err);
    });
});

// get a specific pet
app.get("/pets/:id", (req, res) => {
    const id = req.params.id;
    pool.query("SELECT * FROM pets WHERE id = $1;", [id]).then((str) => {
        const pet = str.rows[0];
        if (pet) res.send(pet);
        else res.sendStatus(404);
    });
});

// remove a pet from the db
app.delete("/pets/:id", (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM pets WHERE id = $1 RETURNING *", [id]).then((str) => {
        if (str.rows.length != 0) res.status(200).send(str.rows[0]);
        else res.sendStatus(204);
    });
});

// change something about an existing pet
app.patch("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, age, kind } = req.body;
    if (Number.isNaN(id)) res.status(400).send("invalid id given");
    pool.query(
        `UPDATE pets 
        SET name = COALESCE($1, name),
            age = COALESCE($2, age),
            kind = COALESCE($3, kind)
        WHERE id = $4 
        RETURNING *`, 
        [name, age, kind, id]
    ).then((result) => {
        if (result.rows.length !== 0) res.send(result.rows[0]);
        else res.sendStatus(404);
    });
});

app.use((err, req, res, next) => {
    res.sendStatus(500);
});

// start the server to accpet request
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});