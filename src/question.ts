import { Fibonacci } from "./fibonacci";
import { Storage } from './storage';
import { Timer } from './timer';

export class Question {
    storage: Storage;
    fibonacci: Fibonacci;
    timer: Timer;

    constructor(){
        this.storage = Storage.getInstance();
        this.fibonacci = Fibonacci.getInstance();
        this.timer = Timer.getInstance();
    }


    public askOneQuestion(question: string): Promise<any> {
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
        let answer = await this.askOneQuestion(question);
    
        if (!isNaN(Number(answer))) {
            return Number(answer);
        } else {
            return await this.askNumberOfSecondsQuestion("How many seconds?");
        }
    }

    public async askFibNumberQuestion(question: string): Promise<void> {
        let answer: any = 0;
    
        do {
            answer = await this.askOneQuestion(question);
            question = "Please enter the next number";
    
            switch (true) {
                case answer === 'pause': {
                    this.timer.pauseTimer();
                    break;
                }
                case answer === 'resume': {
                    this.timer.resumeTimer();
                    break;
                }
                case !isNaN(Number(answer)): {
                    const answerAsNumber = Number(answer);
    
                    if (this.fibonacci.isFibonacciNumber(answerAsNumber)) {
                        this.storage.addNumber(answerAsNumber);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
    
        } while (answer !== 'quit');
    
    }
}

