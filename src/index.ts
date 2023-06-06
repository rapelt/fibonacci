
import { Timer, TIMER_EVENT_NAME } from './timer';
import { Printer } from './print';
import { Fibonacci } from './fibonacci';
import { Storage } from './storage';
import { Question } from './question';

const storage = Storage.getInstance();
const fibonacci = Fibonacci.getInstance();
const timer = Timer.getInstance();

const question = new Question();

question.askNumberOfSecondsQuestion("Please input the amount of time in seconds between emitting numbers and their frequency").then((answer: number) => {
    if (answer) {
        timer.startTimer(Number(answer));
        timer.timerEvent.on(TIMER_EVENT_NAME, () => {
            Printer.print(storage.toPrint());
        });
    }

    question.askFibNumberQuestion('Please enter the first number').then(() => {
        timer.pauseTimer();
    });
})
