const bluebird = require('bluebird');
const Promise = bluebird.Promise;
const fs = Promise.promisifyAll(require('fs'));

const _checkPathValidity = path => {
    if(!path)
        Throw('Need a valid file path');
};

const getFileAsString = async (path) => {
    _checkPathValidity(path);
    await fs.readFileAsync(path, (err, data) => {
        if(err)
            Throw(err);
        else
            return data;
    });
};

const getFileAsJSON = async (path) => {
    _checkPathValidity(path);
    try{
        return JSON.parse(await getFileAsString(path));
    }
    catch(e) {
        Throw('File is not valid JSON');
    }
};

const saveStringToFile = async (path, text) => {
    _checkPathValidity(path);
    await fs.writeFileAsync(path, text, (err, data) => {
        if(err)
            Throw(err);
        else
            return data;
    });
};

const saveJSONToFile = async (path, obj) => {
    _checkPathValidity(path);
    return await saveStringToFile(JSON.stringify(obj));
};