import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

interface LemonadeStand {
    numOfDay: number,
    weather: string,
    costOfLemonade: number,
    numOfLemonadeSold: number,
    cashBalance: number;
    numOfLemonadeMade: number;
    numOfAdSigns: number;
    priceOfLemonade: number;
}

let stand: LemonadeStand = {
    numOfDay: 0,
    weather: "sunny",
    costOfLemonade: 0,
    cashBalance: 200,
    numOfLemonadeSold: 0,
    numOfLemonadeMade: 0,
    numOfAdSigns: 0,
    priceOfLemonade: 0,
}

async function main() {
    while(stand.numOfDay < 3) {

        // Show day details (number of day, weather, cost of lemonade)
        daySetup();

        // Create the interface
        const rl = readline.createInterface({ input, output });

        try {
            // Ask the question and wait for the response
            const glassesOfLemonadeInput: string = await rl.question('How many glasses of lemonade do you wish to make? ');
            stand.numOfLemonadeMade = parseInt(glassesOfLemonadeInput, 10);

            const numOfAdSignsInput: string = await rl.question('How many advertising signs (15 cents each) do you want to make? ');
            stand.numOfAdSigns = parseInt(numOfAdSignsInput, 10);

            const priceOfLemonadeInput: string = await rl.question('What price (in cents) do you wish to charge for lemonade? ');
            stand.priceOfLemonade = parseInt(priceOfLemonadeInput, 10);
            
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            // Always close the interface when done to prevent the process from hanging
            rl.close();
        }

        calculateSold();
        showReport();

    }     

    console.log('========== FINAL CASH BALANCE ==========');
    console.log(`Your final cash balance is ${stand.cashBalance} cents!`);
}

main();


function daySetup() {
    stand.numOfDay += 1;
    stand.costOfLemonade += 2;
    const weathers = ['sunny', 'hot', 'cloudy', 'chilly'];
    stand.weather = weathers[Math.floor(Math.random() * weathers.length)];
    console.log(`========== START DAY ${stand.numOfDay} ==========`);
    console.log(`On day ${stand.numOfDay}, the weather is ${stand.weather} and the cost of lemonade is ${stand.costOfLemonade}!`);
}

function calculateSold() {
    // random number sold to begin with
    stand.numOfLemonadeSold = getRandomInt(0, stand.numOfLemonadeMade);
    // +1 for each sign
    stand.numOfLemonadeSold += stand.numOfAdSigns;
    // +2 if weather is hot
    if(stand.weather == 'sunny' || stand.weather == 'hot') {
        stand.numOfLemonadeSold += 2;
    }
    // max sold per day is the total amount made
    if(stand.numOfLemonadeSold > stand.numOfLemonadeMade) {
        stand.numOfLemonadeSold = stand.numOfLemonadeMade;
    }
}

function showReport() {
    let income: number = stand.numOfLemonadeSold * stand.priceOfLemonade;
    let expenses: number = (stand.numOfLemonadeMade * stand.costOfLemonade) + (stand.numOfAdSigns * 15);
    stand.cashBalance = stand.cashBalance + income - expenses;

    console.log(`========== END DAY ${stand.numOfDay} ==========`);
    console.log(`Report for day ${stand.numOfDay}: `);
    console.log(`${stand.numOfLemonadeSold} glasses sold, ${stand.priceOfLemonade} cents per glass -> income ${income} cents`);
    console.log(`${stand.numOfLemonadeMade} glasses made, ${stand.numOfAdSigns} signs made -> expenses ${expenses} cents`);
}

function getRandomInt(min: number, max: number) {
  // Calculates the range size, scales it, and shifts it by the minimum value
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}