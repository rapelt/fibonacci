import EventEmitter from "node:events";

export const timerEventName = "TIMER";

export class Timer {
    private static timerInstance: Timer;
    timer: NodeJS.Timer | undefined;
    mseconds: number = 0;
    timerOutput: number = 0;
    timerEvent = new EventEmitter();

    constructor(){}

    public pauseTimer(): void {
        console.log("Timer paused");
        clearInterval(this.timer);
    }

    public startTimer(seconds: number): void {
        console.log("Timer started: ", `Set timer for ${seconds}`);
        this.mseconds = seconds;
        this.timer = setInterval(this.setOutput.bind(this), 10, this.mseconds);
    }

    public resumeTimer(): void {
        console.log("Timer resumed");
        this.timer = setInterval(this.setOutput.bind(this), 10, this.mseconds);
    }

    private setOutput(secondsToPrint: number){
        this.timerOutput = this.timerOutput + 10;
    
        if(this.timerOutput === secondsToPrint * 1000){
            this.timerEvent.emit(timerEventName);
            this.timerOutput = 0;
        }
    }


    public static getInstance(): Timer{
        if(!this.timerInstance){
            this.timerInstance = new Timer();
        }

        return this.timerInstance;
    }
} 







