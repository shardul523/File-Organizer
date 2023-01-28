const fs = require('fs');
const path = require('path');

const treeFunc = dirPath => {
    
    if (!dirPath) {
        dirPath = process.cwd();
    }
    
    if (!fs.existsSync(dirPath)) {
        console.log('Please enter a valid file path');
        return;
    }

    treeTraversal(dirPath);
};

const treeTraversal = (dirPath, indent='') => {

    const isDirectory = fs.lstatSync(dirPath).isDirectory();
    const nodeName = path.basename(dirPath);

    if (!isDirectory) {
        console.log(indent, '|---', nodeName);
        return;
    }

    console.log(indent, '>>>', nodeName);
    
    const childNodes = fs.readdirSync(dirPath);

    for (let child of childNodes) {
        const childPath = path.join(dirPath, child);
        treeTraversal(childPath, indent + '\t');
    }
}


module.exports = treeFunc;