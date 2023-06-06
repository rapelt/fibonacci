export class Question {
    public static askOnce(question: string): Promise<any>{
        const stdin = process.stdin;
        const stdout = process.stdout;
      
        stdin.resume();
        stdout.write(question + ": ");
      
        return new Promise(res => {
          stdin.once('data', function(data) {
            res(data.toString().trim());
          });
        });
      }
}