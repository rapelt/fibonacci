
import { Timer, timerEventName } from './timer';
import { Printer } from './print';
import { Fibonacci } from './fibonacci';
import { Storage } from './storage';
import { Question } from './question';

const storage = Storage.getInstance();
const fibonacci = Fibonacci.getInstance();
const timer = Timer.getInstance();

async function ask(question: string): Promise<void> {
    let answer: any = 0;

    do {
        answer = await Question.askOnce(question);
        question = "Please enter the next number";

        switch (true) {
            case answer === 'pause': {
                timer.pauseTimer();
                break;
            }
            case answer === 'resume': {
                timer.resumeTimer();
                break;
            }
            case !isNaN(Number(answer)): {
                const answerAsNumber = Number(answer);

                if (fibonacci.isFibonacciNumber(answerAsNumber)) {
                    storage.addNumber(answerAsNumber);
                }
                break;
            }
            default: {
                break;
            }
        }

    } while (answer !== 'quit');

}

async function seconds(question: string): Promise<number> {
    let answer;

    answer = await Question.askOnce(question);

    if (!isNaN(Number(answer))) {
        return Number(answer);
    } else {
        return seconds("How many seconds?");
    }
}

seconds("Please input the amount of time in seconds between emitting numbers and their frequency").then((answer: number) => {
    if (answer) {
        timer.startTimer(Number(answer));
        timer.timerEvent.on(timerEventName, () => {
            Printer.print(storage.toPrint());
        });
    }

    ask('Please enter the first number').then(() => {
        timer.pauseTimer();
    });
})
