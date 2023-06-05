export class Fibonacci {
    private static fibonacciInstance: Fibonacci;
    maxFibNumber = 75;
    private fibNumbers: Set<number> = new Set();

    constructor(){
        let n1: number = 0;
        let n2: number = 1;
        let nextTerm: number;

        for (let i = 0; i <= this.maxFibNumber; i++) {
            this.fibNumbers.add(n1);
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        }
    }

    public isFibonacciNumber(numbertoCheck: number): boolean{
        return this.fibNumbers.has(numbertoCheck);
    }

    public static getInstance(): Fibonacci{
        if(!this.fibonacciInstance){
            this.fibonacciInstance = new Fibonacci();
        }

        return this.fibonacciInstance;
    }
}