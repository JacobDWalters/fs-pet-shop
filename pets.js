
//gives acces to the fs commands to access files
import fs from 'fs';

// let read = new Promise((res, rej) => {
//     fs.readFile('./pets.json', 'utf-8', (error, str) => {
//         if(error) process.exit(1);
        
//         const data = JSON.parse(str);
//     })
// })

// gives you the ability to grab the input word 
const subcommand = process.argv[2];

// switch case to determine what to do for each input
switch(subcommand) {
    // if read is input
    case 'read': {
        // allows you to grab what is input as the index to read
        const selector = parseInt(process.argv[3]);
        // go to the pets.json file and present that data
        
        fs.readFile('./pets.json', 'utf-8', (error, str) => {
            if (error) process.exit(1);
            
            const data = JSON.parse(str);

            // log a message if the index is not one of the options
            if (!selector) console.log(data);
            
            if (data[selector] == undefined || selector < 0) {
                console.error('Usage: node pets.js read INDEX');
            } else {
                console.log(data[selector]);
            }
        });
        break;
    }

    // if create is input
    case 'create': {
        fs.readFile('./pets.json', 'utf-8', (error, str) => {
            if (error) process.exit(1);
            
            var data = JSON.parse(str);
    
            // grab the inputs you need to create your pet
            const age = parseInt(process.argv[3]);
            const kind = process.argv[4];
            const name = process.argv[5];

            // create your pet if all the inputs are there
            if(age && kind && name) {
                let newPet = {
                    "age": age,
                    "kind": kind,
                    "name": name
                };

                // display your new pet and add it to your list
                console.log(newPet);
                data.push(newPet);

                // put your pet into json acceptable format
                let dataJSON = JSON.stringify(data);

                // write a file with your new pet 
                fs.writeFile('pets.json', dataJSON, (error) => {
                    if (error) process.exit(1);
                });

            // log a message if all the inputs are not present
            } else {
                console.error('Usage: node pets.js create AGE KIND NAME');
            }
        });
        break;
    }


    // if case is input
    case 'update': {
        fs.readFile('./pets.json', 'utf-8', (error, str) => {
            if (error) process.exit(1);
            var data = JSON.parse(str);
    
            // grab the inputs you need to update
            const index = process.argv[3]
            const age = parseInt(process.argv[4]);
            const kind = process.argv[5];
            const name = process.argv[6];

            // update your pet if all the inputs are there
            if(index && age && kind && name) {
                let updatePet = data[index]
                updatePet.age = age;
                updatePet.kind = kind;
                updatePet.name = name;

                console.log(updatePet);

                // put your pet into json acceptable format
                let dataJSON = JSON.stringify(data);

                // write a file with your new pet 
                fs.writeFile('pets.json', dataJSON, (error) => {
                    if (error) process.exit(1);
                });
            // log a message if all the inputs are not present
            } else {
                console.error('Usage: node pets.js update INDEX AGE KIND NAME');
            }
        });
        break;
    }

    // if destroy is input
    case 'destroy': {
        fs.readFile('./pets.json', 'utf-8', (error, str) => {
            if (error) process.exit(1);
            var data = JSON.parse(str);
    
            // grab the input you want to remove
            const index = process.argv[3]

            // update your pet if all the inputs are there
            if(index) {
                // show the pet that you are removing
                console.log(data[index]);
                
                // remove the pet from the list
                data.splice(index);
                
                // put your list back into JSON format
                let dataJSON = JSON.stringify(data);

                // write a file without your pet
                fs.writeFile('pets.json', dataJSON, (error) => {
                    if (error) process.exit(1);
                });
            // log a message if all the inputs are not present
            } else {
                console.error('Usage: node pets.js destroy INDEX');
            }
        });
        break;
    }

    // if the input is not one of the options or nothing at all 
    default: {
        console.error('Usage: node pets.js [read | create | update | destroy]')
    }
}
