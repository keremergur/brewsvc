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
                        name: `${svc.name}: ${printStatus(svc)}`,
                        value: svc
                    };
                })
            }
        ])
        .then(ans => {
            // Promise.allSettled(ans.map(svc => {
            //     return function(svc) {
            //         let cmd = 'brew services ';
            //         switch(svc.status) {
            //             case 'none': str+=`start ${svc.name}`; break;
            //             case 'started': str+=`stop ${svc.name}`; break;
            //             case 'stopped': str+=`stop ${svc.name}`; break;
            //         }
            //         exec(cmd);
            //     }
            // }))
        });
}

function printStatus(svc) {
    const YELLOW = '\x1b[33m';  const GREEN = '\x1b[32m';
    const RED = '\x1b[31m'; const END = '\x1b[0m';
    let str = '';
    switch(svc.status) {
        case 'none': str+=YELLOW; break;
        case 'started': str+=GREEN; break;
        case 'stopped': str+=RED; break;
    }
    return str + svc.status + END;
}

brewServices();