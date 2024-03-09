import { Field } from "../Utils/field";

class Node {
    public m_data: Field;
    public m_next: Node | null;

    constructor(data: Field, next: Node | null = null) {
        this.m_data = data;
        this.m_next = next;
    }
}

class Queue {
    private m_rear: Node;
    private m_front: Node;
    private m_size: number = 0;

    constructor() {
        this.m_rear = new Node(new Field(-1, -1));
        this.m_front = new Node(new Field(-1, -1), this.m_rear);
    }

    public get size():  number {
        return this.m_size;
    }

    private incrementSize(): void {
        this.m_size++;
    }

    private decrementSize(): void {
        if (this.size == 0)
            return;

        this.m_size--;
    }

    public isEmpty(): boolean {
        return this.size == 0 ? true: false;
    }

    public enqueue(data: Field): void {
        let newNode: Node = new Node(data, null);
    
        if (this.isEmpty()) {
            this.m_front.m_next = newNode;
            this.m_rear = newNode;
        } else {
            this.m_rear.m_next = newNode;
            this.m_rear = newNode;
        }
    
        this.incrementSize();
    }

    public dequeue(): Field | null {
        if (this.isEmpty()) {
            return null;
        }
    
        const removedNode = this.m_front.m_next;
        this.m_front.m_next = removedNode!.m_next;
        this.decrementSize();
    
        if (removedNode === this.m_rear) {
            this.m_rear = this.m_front;
        }
    
        return removedNode!.m_data;
    }
}

export { Queue };