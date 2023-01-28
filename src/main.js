#!/usr/bin/env node
'use strict';

const treeFunc = require('../commands/tree');
const organizeFunc = require('../commands/organize');
const helpFunc = require('../commands/help');


//////////////////////////////////////////////////////
let inputs = process.argv.slice(2);


let command = inputs[0];

switch (command) {
    case "tree":
        treeFunc(inputs[1]);
        break;
    case "organize":
        organizeFunc(inputs[1]);
        break;
    case 'help':
        helpFunc(inputs[1]);
        break;
    default:
        console.log('Please 🙏input valid command');
}

