import EventEmitter from "node:events";
import { Printer } from './print';

export const TIMER_EVENT_NAME = "TIMER";

export class Timer {
    private static timerInstance: Timer;
    timer: NodeJS.Timer | undefined;
    seconds = 0;
    timerOutput = 0;
    timerEvent = new EventEmitter();
    isPaused = true;

    public pauseTimer(): void {
        Printer.print("Timer paused");
        clearInterval(this.timer);
        this.isPaused = true;
    }

    public quitTimer(): void {
        clearInterval(this.timer);
        this.isPaused = true;
    }

    public startTimer(userSeconds: number): void {
        Printer.print(`Set timer for ${userSeconds}`);
        this.seconds = userSeconds;
        this.timer = setInterval(this.setOutput.bind(this), 10, this.seconds);
        this.isPaused = false;
    }

    public resumeTimer(): void {
        if(this.isPaused){
            Printer.print("Timer resumed");
            this.timer = setInterval(this.setOutput.bind(this), 10, this.seconds);
            this.isPaused = false;
        }
    }

    private setOutput(secondsToPrint: number) {
        this.timerOutput = this.timerOutput + 10;

        if (this.timerOutput === secondsToPrint * 1000) {
            this.timerEvent.emit(TIMER_EVENT_NAME);
            this.timerOutput = 0;
        }
    }

    public static getInstance(): Timer {
        if (!this.timerInstance) {
            this.timerInstance = new Timer();
        }

        return this.timerInstance;
    }
}







