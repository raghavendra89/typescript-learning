interface StackInterface<T> {
    data: T[];
    push(item: T): void;
    pop(): T | null | undefined;
}

class Stack<T> implements StackInterface<T> {
    data: T[];

    constructor(initialData: T[]) {
        this.data = initialData;
    }

    push(item: T) {
        this.data.push(item);
    }

    pop() {
        if (this.data.length) {
            return this.data.pop();
        }

        return null;
    }
}

let stack1 = new Stack<number>([]);
stack1.push(3);
stack1.push(4);
console.log(stack1.pop()); // 4
stack1.push(5);
stack1.push(7);
console.log(stack1.pop()); // 7

// If you wanted the stack to have mixed type of content you can do this:
// let stack1 = new Stack<any>([]);