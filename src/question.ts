export class Question {
    public static askOnce(question: string): Promise<any>{
        var stdin = process.stdin, stdout = process.stdout;
      
        stdin.resume();
        stdout.write(question + ": ");
      
        return new Promise(res => {
          stdin.once('data', function(data) {
            res(data.toString().trim());
          });
        });
      }
}