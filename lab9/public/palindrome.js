const checkPalindrome = async (str) => {
    if(!str) throw "You need to enter some text";

    str = _cleanInput(str);

    if(!str) throw "Invalid entry, please try something else";
    
    return str === str.split('').reverse().join('');
};

const _cleanInput = (str) => {
    return str.replace(/\W/g, '').toLowerCase();
};