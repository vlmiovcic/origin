const { exec } = require('child_process');
const process = require('process');

console.log(process.traceDeprecation);
exec('ps aux | grep node | grep react-scripts | awk \'{ print $2 }\' ', (error, stdout, stderror) => {
    if (error) {
        console.error(error)
    } else {
        const linesClient = stdout.split(require('os').EOL);
        if (linesClient[linesClient.length - 1] === '') {
            linesClient.pop();
        }

        for (let i = 0; i < linesClient.length-1; i++) {
            exec(`kill ${linesClient[i]}`, (error, stdout, stderror) => {
                if (error) {
                    console.error('as we tried to kill the process the errors are happened: ', error)
                } else {
                    console.log(`kill processes stdout: ${stdout}`);
                    console.log(`kill processes stderr: ${stderror}`);
                }
            });
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderror}`);
    }
});
