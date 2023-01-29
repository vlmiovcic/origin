const { exec } = require('child_process');
exec('ps aux | grep node | grep -v "grep node" | awk \'{ print $2 }\' ', (err, stdout, stderr) => {
    if (err) {
        console.error(err)
    } else {
        const lines = stdout.split(require('os').EOL);
        if (lines[lines.length - 1] === '') {
            lines.pop();
        }
        for (let i = 0; i < lines.length; i++) {
            exec(`kill ${lines[i]}`, (error, stdout, stderror) => {
                if (error) {
                    console.error('as we tried to kill the process the errors are happend: ', error)
                } else {
                    console.log(`kill processes stdout: ${stdout}`);
                    console.log(`kill processes stderror: ${stderror}`);
                }
            });
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});
