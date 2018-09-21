const geometry = require('./geometry.js');
const utilities = require('./utilities.js');

console.log(geometry.surfaceAreaOfRectangularPrism(5, 5, 5)) //150
console.log(geometry.surfaceAreaOfRectangularPrism(-5, 0, 5)) //throws
console.log(geometry.surfaceAreaOfRectangularPrism(-5, -5, -5)) //throws
console.log(geometry.surfaceAreaOfRectangularPrism(0, 0, 0)) //0
console.log(geometry.surfaceAreaOfRectangularPrism('s', 's', 's')) //throws

console.log(geometry.surfaceAreaOfSphere(5)) //314
console.log(geometry.surfaceAreaOfSphere(-5)) //throws
console.log(geometry.surfaceAreaOfSphere(0)) //0
console.log(geometry.surfaceAreaOfSphere(10)) //1256
console.log(geometry.surfaceAreaOfSphere('s')) //throws

console.log(geometry.volumeOfRectangularPrism(5, 5, 5)) //125
console.log(geometry.volumeOfRectangularPrism(-5, 0, 5)) //throws
console.log(geometry.volumeOfRectangularPrism(-5, -5, -5)) //throws
console.log(geometry.volumeOfRectangularPrism(0, 0, 0)) //0
console.log(geometry.volumeOfRectangularPrism('s', 's', 's')) //throws

console.log(geometry.volumeOfSphere(5)) //523
console.log(geometry.volumeOfSphere(-5)) //throws
console.log(geometry.volumeOfSphere(0)) //0
console.log(geometry.volumeOfSphere(10)) //4188
console.log(geometry.volumeOfSphere('s')) //throws

console.log(utilities.countOfEachCharacterInString('hello world')) //{ h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }
console.log(utilities.countOfEachCharacterInString('goodbye world')) //{ g: 1, o: 3, d: 2, b: 1, y: 1, e: 1, ' ': 1, w: 1, r: 1, l: 1 }
console.log(utilities.countOfEachCharacterInString(5)) //throws
console.log(utilities.countOfEachCharacterInString('')) //{}
console.log(utilities.countOfEachCharacterInString('hhhhhhhhhhhhhh')) //{ h: 14 }

console.log(utilities.uniqueElements(['h', 'e', 'l', 'l', 'o'])) //5
console.log(utilities.uniqueElements([1, 2, 3, 4, 5])) //5
console.log(utilities.uniqueElements([5, 5, 5, 5, 5])) //5
console.log(utilities.uniqueElements([])) //0
console.log(utilities.uniqueElements(['w', 'o', 'r', 'l', 'd'])) //5

const a = {
    1: 1,
    2: 2,
    3: {
        4: 4
    }
};

const b = {
    1: 1,
    2: 2,
    3: {
        4: 5
    }
};

const c = a;

const d = {
    1: 1
};

const e = {
    1: 'hello world'
}

const f = {
    '1': 'hello world'
}

console.log(utilities.deepEquality(a, b)) //false
console.log(utilities.deepEquality(a, c)) //true
console.log(utilities.deepEquality(d, a)) //false
console.log(utilities.deepEquality(d, e)) //false 
console.log(utilities.deepEquality(e, f)) //true, properties are strings in js, but don't need '' delimiters