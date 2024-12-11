"use strict";
const names = ['Raj'];
names.push('Raj');
let correctTuple = [5, '5', false];
let correctTuple2 = [5, 5, false];
const graph = [55.2, 41.3];
const baleno = {
    type: 'Maruti'
};
let carPrice;
carPrice = {
    'swift': 100000
};
carPrice.i10 = 210000;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["Accepted"] = 201] = "Accepted";
    StatusCodes[StatusCodes["BadRequest"] = 202] = "BadRequest";
})(StatusCodes || (StatusCodes = {}));
// logs 202
console.log(StatusCodes.BadRequest);
var Directions;
(function (Directions) {
    Directions["North"] = "North";
    Directions["South"] = "South";
    Directions["East"] = "East";
    Directions["West"] = "West";
})(Directions || (Directions = {}));
// logs 202
console.log(Directions.North);
const carYear = 2001;
const carType = "Toyota";
const carModel = "Corolla";
const car = {
    year: carYear,
    type: carType,
    model: carModel
};
const lowerCase = (string) => {
    return string.toLowerCase();
};
/**
 * const lowerCase = (string) => {
 *  return string.toLowerCase();
 * }
*/
// Casting
let x = 4;
console.log(x.length);
let y = '9';
console.log(y.length);
// Generics
function createPair(v1, v2) {
    return [v1, v2];
}
console.log(createPair('hello', 42)); // ['hello', 42]
