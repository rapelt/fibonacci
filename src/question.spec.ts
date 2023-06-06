import { describe, expect, it } from "@jest/globals";
import { Storage } from "./storage";
import { Fibonacci } from "./fibonacci";
import { Timer } from "./timer";
import { Question } from "./question";
import { ReadStream } from "fs";

describe("Question", () => {
    let question: Question;

    beforeEach(() => {
        question = new Question();
        jest.spyOn(process.stdout, 'write');
    });

    afterEach(() => {
        Fibonacci['fibonacciInstance'] = new Fibonacci();
        Storage['storageInstance'] = new Storage();
        question.timer.timer?.unref();
    })

    describe("askFibNumberQuestion", () => {
        it("should call write function", () => {
            question.askFibNumberQuestion("This is a question");
            expect(process.stdout.write).toBeCalled();
        });
    });

    describe("askNumberOfSecondsQuestion", () => {
        it("should call write function", () => {
            question.askNumberOfSecondsQuestion("This is a question");
            expect(process.stdout.write).toBeCalled();
        });
    });

    describe("handleUserFibAnswer", () => {
        it("should pause", () => {
            jest.spyOn(question.timer, 'pauseTimer');
            question.handleUserFibAnswer("halt");
            expect(question.timer.pauseTimer).toBeCalled();
        });

        it("should quit", () => {
            jest.spyOn(question.timer, 'quitTimer');
            question.handleUserFibAnswer("quit");
            expect(question.timer.quitTimer).toBeCalled();
        });

        it("should resume", () => {
            jest.spyOn(question.timer, 'resumeTimer');
            question.handleUserFibAnswer("resume");
            expect(question.timer.resumeTimer).toBeCalled();
        });

        it("should handle fib number input", () => {
            jest.spyOn(question.fibonacci, 'isFibonacciNumber');
            jest.spyOn(question.storage, 'addNumber');

            question.handleUserFibAnswer("1");
            expect(question.fibonacci.isFibonacciNumber).toBeCalled();
            expect(question.storage.addNumber).toBeCalled();
            expect(question.storage.addNumber).toBeCalledWith(1);
        });

        it("should handle non fib number input", () => {
            jest.spyOn(question.fibonacci, 'isFibonacciNumber');
            jest.spyOn(question.storage, 'addNumber');

            question.handleUserFibAnswer("4");
            expect(question.fibonacci.isFibonacciNumber).toHaveBeenCalledTimes(1);
            expect(question.storage.addNumber).toHaveBeenCalledTimes(0);
        });
    });
});
