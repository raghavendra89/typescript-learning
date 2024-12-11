const names: string[] = ['Raj'];

names.push('Raj');

let correctTuple: [number, string, boolean] = [5, '5', false];
let correctTuple2: [number, string | number, boolean] = [5, 5, false];

const graph: [x: number, y: number] = [55.2, 41.3];
// console.log(graph['x']);

type Car = {
    type: string,
    mileage?: number
}
const baleno: Car = {
    type: 'Maruti'
}

type CarPriceType = {
    [index: string]: number
}

let carPrice: CarPriceType;
carPrice = {
    'swift': 100000
}

carPrice.i10 = 210000;

enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted,
    BadRequest
}
// logs 202
console.log(StatusCodes.BadRequest);

enum Directions {
    North = 'North',
    South = 'South',
    East = 'East',
    West = 'West'
}
// logs 202
console.log(Directions.North);

// Type Aliases
type CarYear = number
type CarType = string
type CarModel = string
type MyCar = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear = 2001
const carType = "Toyota"
const carModel = "Corolla"
const car: MyCar = {
  year: carYear,
  type: carType,
  model: carModel
};

// Takes an argument 'string' which is of type string and returns a string
type StringFunc = (string: string) => string;

const lowerCase: StringFunc = (string): string => {
    return string.toLowerCase();
}

/**
 * const lowerCase = (string) => {
 *  return string.toLowerCase();
 * }
*/

// Casting
let x = 4;
console.log(((x as unknown) as string).length);

let y = '9';
console.log((<string>y).length);

// Generics
function createPair<Z, T>(v1: Z, v2: T): [Z, T] {
    return [v1, v2];
}
console.log(createPair<string, number>('hello', 42)); // ['hello', 42]

// Class
class Box<T, T2> {
    contents: T;
    constructor(value: T, x: T2) {
        this.contents = value;
    }
}

const b = new Box<string, number>("hello!", 1);