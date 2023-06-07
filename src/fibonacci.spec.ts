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

        it("should have the number 987", () => {
            expect(fibonacci.isFibonacciNumber(987)).toBeTruthy();
        });

        it("should NOT have the number 7", () => {
            expect(fibonacci.isFibonacciNumber(7)).toBeFalsy();
        });

        it("should NOT have the number 2111485077978052 fib number", () => {
            const notAFibNumber = 2111485077978052;
            expect(fibonacci.isFibonacciNumber(notAFibNumber)).toBeFalsy();
        });
    });
});
