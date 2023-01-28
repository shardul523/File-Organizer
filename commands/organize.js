const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const types = require('../src/types');



const organizeFunc = dirPath => {
    //console.log('Organize function implemented');
    //1. Check if the dirPath has been passed or not
    if (!dirPath) {
        dirPath = process.cwd();
    }

    //2. Check if the given dirPath exists or not
    
    if (!fs.existsSync(dirPath)) {
        console.log('Please enter a valid file path');
        return;
    }

    const destPath = path.join(dirPath, "Organized_Files");

    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);

    organizeHelper(dirPath, destPath);
};


const organizeHelper = async (src, dest) => {

    //4. Identify the categories of all the files in the src directory
    try {
        const children = await fsPromises.readdir(src);

        for (let child of children) {
            const childAddress = path.join(src, child);
            const childStat = await fsPromises.lstat(childAddress);

            if (childStat.isDirectory()) continue;
            
            sendFile(childAddress, dest, getCategory(child));
        }
    } catch (err) {
        console.error(err);
    }

};


const getCategory = fileName => {
    
    const ext = path.extname(fileName).slice(1);

    for (let category of Object.keys(types)) {
        if (types[category].includes(ext)) 
            return category;
    }

    return 'Others';
};


const sendFile = (srcFilePath, destPath, category) => {

    const categoryFilePath = path.join(destPath, category);

    if (!fs.existsSync(categoryFilePath)) fs.mkdirSync(categoryFilePath);

    const destFilePath = path.join(categoryFilePath, path.basename(srcFilePath));

    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
};



module.exports = organizeFunc;