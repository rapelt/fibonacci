export class Storage {
    private static storageInstance: Storage;
    private fibNumbers: Map<number, number> = new Map();

    private constructor() {}

    public addNumber(number: number){
        const value = this.fibNumbers.get(number) || 0;
        this.fibNumbers.set(number, value + 1);
    }

    public getNumbers(){
        return this.fibNumbers;
    }

    public toPrint(): string {
        let print: string = "";

        this.fibNumbers.forEach((value, key) => {
            if(print === ""){
                print = `${key}:${value}`;
            } else {
                print = `${print}, ${key}:${value}`;
            }
        });

        return print;
    }

    public static getInstance(): Storage{
        if(!this.storageInstance){
            this.storageInstance = new Storage();
        }

        return this.storageInstance;
    }
    
}
