
type BinaryFunc = (a:number | string, b:number | string) => number;

const _n: (string: string) => number = (number) => {
    return parseInt(number || '0');
}

const binaryAdd: BinaryFunc = (a, b): number => {
    a = a.toString().split('').reverse().join('');
    b = b.toString().split('').reverse().join('');

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
    return -1;
}

console.log(binaryAdd(10, 11)); // 101
console.log(binaryAdd(101, 11)); // 1000
console.log(binaryAdd(111, 111)); // 1110
console.log(binarySubtract(101, 11)); // 10
console.log(binarySubtract(11, 110)); // -11