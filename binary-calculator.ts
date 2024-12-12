
type BinaryFunc = (a:number | string, b:number | string) => number;

const _n: (string: string) => number = (number) => {
    return parseInt(number || '0');
}

const _r: (number: number | string) => string = (number) => {
    return number.toString().split('').reverse().join('');
}

const binaryAdd: BinaryFunc = (a, b): number => {
    a = _r(a);
    b = _r(b);

    let addedNumber: string = '';
    let carry: number = 0;

    let index = 0;
    while (index < Math.max(a.length, b.length)) {
        let sum = _n(a[index]) + _n(b[index]) + carry;
        if (sum > 1) {
            carry = Math.floor(sum / 2);
            sum = sum % 2;
        }

        addedNumber = sum.toString() + addedNumber;
        index++;
    }

    addedNumber = (carry == 1) ? carry + addedNumber : addedNumber;

    return _n(addedNumber);
}

const binarySubtract: BinaryFunc = (a, b): number => {
    let bigNum = a > b ? a : b;
    let smallNum = a > b ? b : a;
    let sign: number = a > b ? 1 : -1;

    bigNum = _r(bigNum);
    smallNum = _r(smallNum);

    let subTractedNumber: string = '';
    let borrow: number = 0;

    let index = 0;
    while (index < Math.max(bigNum.length, smallNum.length)) {
        let diff = _n(bigNum[index]) - _n(smallNum[index]) + borrow;
        if (diff < 0) {
            borrow = 1;
            diff = 1;
        }

        if (diff == 2) {
            borrow = diff = 0;
        }

        subTractedNumber = diff.toString() + subTractedNumber;
        index++;
    }

    return _n(subTractedNumber) * sign;
}

console.log(binaryAdd(10, 11)); // 101
console.log(binaryAdd(101, 11)); // 1000
console.log(binaryAdd(111, 111)); // 1110
console.log(binarySubtract(101, 11)); // 10
console.log(binarySubtract(11, 110)); // -11
console.log(binarySubtract(1000, 111)); // 1
console.log(binarySubtract(111, 1010)); // -11