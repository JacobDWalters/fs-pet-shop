//gives acces to the fs commands to access files
import fs from 'fs';

// gives you the ability to grab the input word 
const subcommand = process.argv[2];

// switch case to determine what to do for each input
switch(subcommand) {
    // if read is input
    case 'read': {
        // allows you to grab what is input as the index to read
        const selector = process.argv[3];
        // go to the pets.json file and present that data
        fs.readFile('./pets.json', 'utf-8', (error, str) => {
            if (error) console.error('error');

            // log a message if the index is not one of the options
            if (selector > 1 || selector < 0) {
                console.error('Usage: node pets.js read INDEX')
            } else {
                const data = JSON.parse(str);
                console.log(data[selector], 'data');
            }
        });
    }

    // if create is input
    case 'create': {
        // grab the inputs you need to create your pet
        const age = parseInt(process.argv[3]);
        const kind = process.argv[4];
        const name = process.argv[5];

        // create your pet if all the inputs are there
        if(age && kind && name) {
            let input = [{
                "age": age,
                "kind": kind,
                "name": name
            }]

            // put your pet into json acceptable format
            let inputJSON = JSON.stringify(input);

            // write a file with your new pet 
            fs.writeFile('pets.json', inputJSON, (error) => {
                if (error) console.error('error');
                
                // as a callback function read your new file
                fs.readFile('pets.json', 'utf-8', (error, str) => {
                    if (error) console.error('error');
                    
                    const data = JSON.parse(str);
                    console.log(data);
                })
            })
        // log a message if all the inputs are not present
        } else {
            console.error('Usage: node pets.js create AGE KIND NAME');
        }
    }

    // if case is input
    case 'update':

    // if destroy is input
    case 'destroy':

    // if the input is not one of the options or nothing at all 
    default: {
        console.error('Usage: node pets.js [read | create | update | destroy]')
    }
}
