DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial,
    name TEXT,
    kind TEXT, 
    age INTEGER
);

INSERT INTO pets (name, kind, age) VALUES ('Fido', 'rainbow trout', 7);
INSERT INTO pets (name, kind, age) VALUES ('Teagan', 'goldy', 3);
INSERT INTO pets (name, kind, age) VALUES ('Zoey', 'goldy', 1);
INSERT INTO pets (name, kind, age) VALUES ('Cornflake', 'parakeet', 3);
INSERT INTO pets (name, kind, age) VALUES ('Buttons', 'snake', 5);


