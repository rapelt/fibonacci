export class Fibonacci {
    private static fibonacciInstance: Fibonacci;
    maxFibNumber = 1000;
    private fibNumbers: Set<bigint> = new Set();

    constructor() {
        let n1: bigint = BigInt(0);
        let n2: bigint = BigInt(1);
        let nextTerm: bigint;

        for (let i = 0; i <= this.maxFibNumber; i = i + 1) {
            this.fibNumbers.add(n1);
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        }
    }

    public isFibonacciNumber(numbertoCheck: number): boolean {
        return this.fibNumbers.has(BigInt(numbertoCheck));
    }

    public static getInstance(): Fibonacci {
        if (!this.fibonacciInstance) {
            this.fibonacciInstance = new Fibonacci();
        }

        return this.fibonacciInstance;
    }
}