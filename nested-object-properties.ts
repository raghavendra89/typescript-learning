// Write a function that takes an object as argument. In some cases the object
// contains other objects with some deeply nested properties. Return the 
// property 'b' of object 'a' inside the original object if it exists.
// If not, return undefined

function getNestedProperty(obj: {[key: string]: any}, ...keys: string[]): any {
    let objCopy = {...obj};

    for (let index = 0; index < keys.length; index++) {
        if (objCopy.hasOwnProperty(keys[index])) {
            objCopy = objCopy[keys[index]];
        } else {
            return undefined;
        }
    }

    return objCopy;
}

console.log(getNestedProperty({a: {b: 1}}, 'a', 'b'));