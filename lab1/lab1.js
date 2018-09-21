const questionOne = function questionOne(arr) {

    const squaresReducer = (accumulator, currentVal) => {
        return accumulator + currentVal * currentVal;
    }
    return arr.reduce(squaresReducer, 0);
}

const questionTwo = function questionTwo(num) {
    fibs = {
        1: 1 //throw that one in there
    }
    if(num in fibs)
        return fibs[num] //memoize that jawnsky
    else if(num < 1)
        return 0
    else
        return questionTwo(num - 1) + questionTwo(num - 2);
}

const questionThree = function questionThree(text) {
    const vowels = 'aeiou';
    return text.split('').filter(letter => vowels.includes(letter)).length;
}

const questionFour = function questionFour(num) {
    facts = {
        0:1
    }
    if(num in facts)
        return facts[num];
    if(num < 0)
        return NaN
    else
        return num * questionFour(num - 1);
}

module.exports = {
    firstName: "Mark", 
    lastName: "Freeman", 
    studentId: "10416298",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};