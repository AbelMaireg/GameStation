import { Field } from "../Utils/field";

class Node {
    public data: Field;
    public prev: Node | null;

    constructor(data: Field, prev: Node | null = null) {
        this.data = data;
        this.prev = prev;
    }
}

class Stack {
    private _top: Node | null;
    private _size: number;

    constructor() {
        this._top = null;
        this._size = 0;
    }

    public get size(): number {
        return this._size;
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

    public push(data: Field): void {
        const newNode = new Node(data, this._top);
        this._top = newNode;
        this._size++;
    }

    public pop(): Field {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        
        const poppedNode = this._top!;
        this._top = poppedNode.prev;
        this._size--;

        return poppedNode.data;
    }
}

export { Stack };
