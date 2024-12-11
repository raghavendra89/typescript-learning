// Sort the months in the proper order

let input: string[] = [
    'Mar',
    'Jun',
    'Sep',
    'Feb',
    'Dec',
    'Jul',
    'Oct',
    'Jan',
    'Apr',
    'Nov',
    'May',
    'Aug'
];

type CompareFunc = (month1: string, month2: string) => number;

const compareMonths: CompareFunc = (month1, month2): number => {
    let month1Number: number = new Date(Date.parse(month1 +" 1, 2025")).getMonth()+1;
    let month2Number: number = new Date(Date.parse(month2 +" 1, 2025")).getMonth()+1;

    if (month1Number < month2Number) {
        return -1;
    }

    return 1;
}

// notice string[] and Array<string>
function sortMonths(months: string[]): Array<string> {
    months.sort((a, b) => compareMonths(a, b));

    return months;
}

console.log(sortMonths(input));