// Given a number n find its prime factors and add them.
// Repeat this process until you get a prime number.
// Ex: Input 9, 9 = 3 * 3, Add (3 + 3) = 6
// For 6, 6 = 2 * 3, ADd (2 + 3) = 5. Answer is 5

type NumberFunc = (number: number) => number;

const isPrimeNumber = (number: number): boolean => {
    let isPrime: boolean = true;

    for (let index = 2; index < number / 2; index++) {
        if (number % index === 0) {
            isPrime = false;
            break;
        }
    }

    return isPrime;
}

const getPrimeFactors = (number: number): Array<number> => {
    if (isPrimeNumber(number)) {
        return [number];
    }

    let primeFactors: Array<number> = [];

    for (let index = 2; index < number / 2; index++) {
        if (number % index === 0 && isPrimeNumber(index)) {
            primeFactors = [index].concat(getPrimeFactors(number / index));
        }
    }

    return primeFactors;
}

const solution: NumberFunc = (number) => {
    let primeFactors: number[] = getPrimeFactors(number);

    if (primeFactors.length == 1) {
        return primeFactors[0];
    }

    let sum: number = 0;
    for (let index = 0; index < primeFactors.length; index++) {
        sum += primeFactors[index];
    }

    return solution(sum);
}

console.log(solution(9)); // 5
console.log(solution(20)); // 5
console.log(solution(25)); // 7