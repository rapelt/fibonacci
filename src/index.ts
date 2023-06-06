
import { Timer, TIMER_EVENT_NAME } from './timer';
import { Printer } from './print';
import { Storage } from './storage';
import { Question } from './question';

const SECONDS_QUESTION_TEXT = "Please input the amount of time in seconds between emitting numbers and their frequency";
const FIRST_FIB_QUESTION_TEXT = "Please enter the first number";

const storage = Storage.getInstance();
const timer = Timer.getInstance();

const question = new Question();

function startTimer(numberOfTimerSeconds: number): void {
    timer.startTimer(Number(numberOfTimerSeconds));
    timer.timerEvent.on(TIMER_EVENT_NAME, () => {
        Printer.print(storage.toPrint());
    });
}

async function startProgram(){
    let numberOfTimerSeconds: number = await question.askNumberOfSecondsQuestion(SECONDS_QUESTION_TEXT);

    if (numberOfTimerSeconds) {
        startTimer(numberOfTimerSeconds);
    }

    await question.askFibNumberQuestion(FIRST_FIB_QUESTION_TEXT);

    timer.pauseTimer();
}

startProgram();
