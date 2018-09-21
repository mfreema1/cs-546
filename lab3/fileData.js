const createMetrics = require('./textMetrics.js');
const bluebird = require('bluebird');
const Promise = bluebird.Promise;
const fs = Promise.promisifyAll(require('fs'));

const _checkPathValidity = path => {
    if(!path || typeof path != 'string')
        throw('Need a valid file path');
};

const getFileAsString = async (path) => {
    _checkPathValidity(path);
    return await fs.readFileAsync(path, 'utf-8');
};

const getFileAsJSON = async (path) => {
    _checkPathValidity(path);
    return createMetrics(await getFileAsString(path));
};

const saveStringToFile = async (path, text) => {
    _checkPathValidity(path);
    await fs.writeFileAsync(path, Buffer.from(text));
};

const saveJSONToFile = async (path, obj) => {
    _checkPathValidity(path);
    await saveStringToFile(path, JSON.stringify(obj));
};

module.exports = {
    getFileAsString: getFileAsString,
    getFileAsJSON: getFileAsJSON,
    saveStringToFile: saveStringToFile,
    saveJSONToFile: saveJSONToFile
};