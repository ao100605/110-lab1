import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function main() {
    // Create the interface
    const rl = readline.createInterface({ input, output });

    try {
        // Ask the question and wait for the response
        const glassesOfLemonadeInput: string = await rl.question('How many glasses of lemonade do you wish to make? ');
        const glassesOfLemonade: number = parseInt(glassesOfLemonadeInput, 10);
        console.log(`You chose ${glassesOfLemonade} glasses of lemonade`);

        const numOfAdSignsInput: string = await rl.question('How many advertising signs (15 cents each) do you want to make? ');
        const numOfAdSigns: number = parseInt(numOfAdSignsInput, 10);
        console.log(`You chose ${numOfAdSigns} advertising signs`);

        const priceOfLemonadeInput: string = await rl.question('What price (in cents) do you wihs to charge for lemonade? ');
        const priceOfLemonade: number = parseInt(priceOfLemonadeInput, 10);
        console.log(`You chose ${priceOfLemonade} cents per lemonade`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Always close the interface when done to prevent the process from hanging
        rl.close();
    }
}

main();