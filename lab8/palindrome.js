const checkPalindrome = async (params) => {
    let str = params['text-to-test'];

    if(!str) throw "Text not found in request body";

    str = _cleanInput(str);

    if(!str) throw "Invalid text supplied in request body";
    
    return str === str.split('').reverse().join('');
};

const _cleanInput = (str) => {
    return str.replace(/\W/g, '').toLowerCase();
};

module.exports = {
    checkPalindrome: checkPalindrome
};