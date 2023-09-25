import { exec } from 'child_process';

exec('brew services list --json', (_1,out,_2) => {
    console.log(out);
});