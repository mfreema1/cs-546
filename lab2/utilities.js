const _equalArrs = (arr1, arr2) => {
    if(arr1.length !== arr2.length)
        return false
    arr1.forEach((element, index) => {
        if(element !== arr2[index])
            return false
    });
    return true
}

const _checkValidArray = arr => {
    if(!Array.isArray(arr))
        throw "Valid array needed to get unique elements"
}

const _checkValidString = str => {
    if(typeof str !== 'string')
        throw "String to count characters of must be valid"
}

//I hate retrieving things from recursion
const deepEquality = (obj1, obj2) => {
    //check the keys are the same
    if(!_equalArrs(Object.keys(obj1), Object.keys(obj2)))
        return false;

    //check the values of the keys are the same
    let flag = true;
    Object.keys(obj1).forEach(x => {
        if(typeof obj1[x] === 'object') {
            if(!deepEquality(obj1[x], obj2[x])) {
                flag = false;
            }
        }
        else {
            if(obj1[x] !== obj2[x]) {
                flag = false;
            }
        }
    });
    return flag;
}

const uniqueElements = arr => {
    _checkValidArray(arr);

    let otherArr = [];
    arr.forEach(x => {
        if(!(x in otherArr))
            otherArr.push(x);
    });
    return otherArr.length;
}

const countOfEachCharacterInString = str => {
    _checkValidString(str);

    let counts = {};
    str.split("").forEach(x => {
        if(counts[x])
            counts[x] += 1;
        else  
            counts[x] = 1;
    });
    return counts
}

module.exports = {
    deepEquality: deepEquality,
    countOfEachCharacterInString: countOfEachCharacterInString,
    uniqueElements: uniqueElements
}