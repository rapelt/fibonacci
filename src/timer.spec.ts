import { describe, expect, it } from "@jest/globals";
import { Timer, TIMER_EVENT_NAME } from "./timer";

describe("Timer", () => {
    let timer: Timer;
    beforeEach(() => {
        return import('./timer').then(module => {
            jest.clearAllTimers()
            timer = module.Timer.getInstance();
            jest.resetModules();

            jest.useFakeTimers({ timerLimit: 5100 });
            jest.spyOn(global, 'setInterval');
            jest.spyOn(global, 'clearInterval');
        });
    });

    afterEach(() => {
        timer.timer?.unref();
    });

    describe("Start Timer", () => {
        it("should start the timer", () => {
            timer.startTimer(5);

            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10, 5);
        });

        it("should emit a timer event after x amount of time", () => {
            jest.spyOn(timer.timerEvent, 'emit');
            timer.startTimer(5);
            expect(setInterval).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(5000);
            expect(timer.timerEvent.emit).toHaveBeenCalled();
            expect(timer.timerEvent.emit).toHaveBeenCalledWith(TIMER_EVENT_NAME);


        });
    });

    describe("Resume Timer", () => {
        it("should start the timer", () => {
            timer.mseconds = 5;
            timer.resumeTimer();

            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 10, 5);
        });
    });

    describe("Pause Timer", () => {
        it("should pause the timer", () => {
            timer.mseconds = 5;
            timer.pauseTimer();

            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenLastCalledWith(timer.timer);
        });
    });
});
