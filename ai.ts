import * as readline from 'readline';
import * as brain from 'brain.js';

const net = new brain.recurrent.LSTM();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const trainingData = [
    {
        input: 'Jak się masz?',
        output: 'Dobrze, a ty?'
    },
    {
        input: 'Jakie jest twoje imię?',
        output: 'Mam na imię AI.'
    },
    {
        input: 'Jaki jest cel życia?',
        output: 'To zależy od osoby, ale uważam, że dobrym celem jest dążenie do szczęścia i spełnianie swoich marzeń.'
    }
];

net.train(trainingData, {
    iterations: 200,
    errorThresh: 0.005,
    log: true,
    logPeriod: 100
});

rl.setPrompt('> ');
rl.prompt();
rl.on('line', (line) => {
    const output = net.run(line.trim());
    console.log(`AI: ${output}`);
    rl.prompt();
}).on('close', () => {
    console.log('Żegnam!');
});
