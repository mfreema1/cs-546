const checkPalindrome = async (params) => {
    let str = params['text-to-test'];

    if(!str) throw "You must provide some valid text for your string";

    str = _cleanInput(str);
    return str === str.split('').reverse().join('');
};

const _cleanInput = (str) => {
    return str.replace(/\W/g, '').toLowerCase();
};

module.exports = {
    checkPalindrome: checkPalindrome
};