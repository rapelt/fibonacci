import { Fibonacci } from "./fibonacci";
import { Printer } from "./print";
import { Storage } from './storage';
import { Timer } from './timer';

const PAUSE = "halt";
const RESUME = "resume"
const QUIT = "quit"
const FIB = "FIB"

export class Question {
    storage: Storage;
    fibonacci: Fibonacci;
    timer: Timer;

    constructor() {
        this.storage = Storage.getInstance();
        this.fibonacci = Fibonacci.getInstance();
        this.timer = Timer.getInstance();
    }


    private askOneQuestion(question: string): Promise<string> {
        const stdin = process.stdin;
        const stdout = process.stdout;

        stdin.resume();
        stdout.write(question + ": ");

        return new Promise(res => {
            stdin.once('data', function (data) {
                res(data.toString().trim());
            });
        });
    }

    public async askNumberOfSecondsQuestion(question: string): Promise<number> {
        const answer: string = await this.askOneQuestion(question);

        if (!isNaN(Number(answer))) {
            return Number(answer);
        } else {
            return await this.askNumberOfSecondsQuestion("How many seconds?");
        }
    }

    public handleUserFibAnswer(answer: string) {
        switch (true) {
            case answer === PAUSE: {
                this.timer.pauseTimer();
                break;
            }
            case answer === RESUME: {
                this.timer.resumeTimer();
                break;
            }
            case answer === QUIT: {
                this.timer.quitTimer();
                Printer.print(this.storage.toPrint());
                break;
            }
            case !isNaN(Number(answer)): {
                const answerAsNumber = Number(answer);

                if (this.fibonacci.isFibonacciNumber(answerAsNumber)) {
                    Printer.print(FIB)
                    this.storage.addNumber(answerAsNumber);
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    public async askFibNumberQuestion(question: string): Promise<void> {
        let answer = '';

        do {
            answer = await this.askOneQuestion(question);
            question = "Please enter the next number";
            this.handleUserFibAnswer(answer);
        } while (answer !== QUIT);
    }
}

