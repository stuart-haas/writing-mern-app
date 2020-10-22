const { exec } = require('child_process')
const cliSelect = require('cli-select')
const chalk = require('chalk')

const options = {
    values: ['dev', 'prod'],
    selected: '[x]',
    unselected: '[ ]',
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.green(value);
        }
        return value;
    }
}

console.log(chalk.bold('Choose Docker Config:'))
cliSelect(options).then((response) => {
    const cmd = exec(`yarn docker:${response.value}`)
    cmd.stdout.on('data', (data) => {
        console.log(data)
    })
    cmd.stderr.on('data', (data) => {
        console.error(data)
    })
}).catch(() => {
    console.log('Bye!')
})