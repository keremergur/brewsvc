import { exec } from 'child_process';
import util from 'util';
import inquirer from 'inquirer';

const asexec = util.promisify(exec);

const { stdout } = await asexec('brew services list --json');
const svcs = await JSON.parse(stdout);

inquirer
    .prompt([
        {
            name: 'servicepicker',
            message: 'Please select service to enable/disable',
            type: 'checkbox',
            choices: svcs.map(svc => {
                return `${svc.name}: ${svc.status}`;
            })
        }
    ])
    .then()