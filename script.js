import { exec } from 'child_process';
import util from 'util';
import inquirer from 'inquirer';

const asexec = util.promisify(exec);

async function brewServices() {
    const { stdout } = await asexec('brew services list --json');
    const svcs = await JSON.parse(stdout);

    inquirer
        .prompt([
            {
                name: 'servicepicker',
                message: 'Please select service to enable/disable',
                type: 'checkbox',
                choices: svcs.map(svc => {
                    return {
                        name: `${svc.name}: ${svc.status}`,
                        value: svc
                    };
                })
            }
        ])
        .then(ans => {
            console.log(ans);
        });
}

// function printStatus(svc) {
//     const yellow = '\x1b[33m';
//     const green = '\x1b[33m';
//     const red = '\x1b[33m';
//     const end = '\x1b[0m';
//     switch(svc.status) {
//         case 'none': return ''
//     }
// }

brewServices();