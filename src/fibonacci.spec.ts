import { describe, expect, it } from "@jest/globals";
import { Fibonacci } from "./fibonacci";

describe("Fibonacci", () => {
    let fibonacci: Fibonacci;
    beforeEach(() => {
        return import('./fibonacci').then(module => {
            fibonacci = module.Fibonacci.getInstance();
            jest.resetModules();
        });
    });

    describe("isFibonacciNumber", () => {
        it("should have the number 0", () => {
            expect(fibonacci.isFibonacciNumber(0)).toBeTruthy();
        });

        it("should have the number 13", () => {
            expect(fibonacci.isFibonacciNumber(13)).toBeTruthy();
        });

        it("should have the number 12586269025", () => {
            expect(fibonacci.isFibonacciNumber(12586269025)).toBeTruthy();
        });

        it("should have the 1000 fib number", () => {
            const fibNumber75 = 2111485077978050;
            console.log('HERE', fibNumber75);
            expect(fibonacci.isFibonacciNumber(fibNumber75)).toBeTruthy();
        });

        it("should NOT have the number 7", () => {
            expect(fibonacci.isFibonacciNumber(7)).toBeFalsy();
        });

        it("should NOT have the number 1001 fib number", () => {
            const notAFibNumber = 2111485077978052;
            expect(fibonacci.isFibonacciNumber(notAFibNumber)).toBeFalsy();
        });
    });
});