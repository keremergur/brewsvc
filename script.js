import { exec } from 'child_process';
import util from 'util';
import inquirer from 'inquirer';

const asexec = util.promisify(exec);

const { stdout } = await asexec('brew services list --json');
const svcs = await JSON.parse(stdout);

// await exec('brew services list --json', (_1,out,_2) => {
//     svcs = JSON.parse(out);
// });

inquirer
    .prompt([
        {
            name: 'servicepicker',
            message: 'Please select service to enable/disable',
            type: 'list',
            choices: svcs.map(svc => {
                return `${svc.name}: ${svc.status}`;
            })
        }
    ])
    .then()