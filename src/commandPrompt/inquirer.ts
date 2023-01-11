const inquirer = require('inquirer');
const fs = require('fs');

/* Inquirer is used to prompt question in CLI for connecting with DB */ 
inquirer
    .prompt([
        {
            type: 'list',
            name: 'configType',
            message: 'Where you want to connect the DB?',
            choices: ['Docker', 'Local'],
        },
        {
            type: 'list',
            name: 'database',
            message: 'Which database you want to connect?',
            choices: ['PostgreSQL', 'MongoDB'],
        },
    ])
    .then((answers) => {
        if (answers && answers.configType && answers.configType === 'Docker') {
            if (answers && answers.database && answers.database === 'PostgreSQL') {
                console.info('Connected to postgres: Docker', answers.database);
            } else if (
                answers &&
                answers.database &&
                answers.database === 'MongoDB'
            ) {
                console.info('Connected to mongoDB: Docker', answers.database);
            }
        } else if (
            answers &&
            answers.configType &&
            answers.configType === 'Local'
        ) {
            if (answers && answers.database && answers.database === 'PostgreSQL') {
                console.info('Connected to postgres: Local', answers.database);
            } else if (
                answers &&
                answers.database &&
                answers.database === 'MongoDB'
            ) {
                console.info('Connected to mongoDB: Local', answers.database);
            }
        }
    });
