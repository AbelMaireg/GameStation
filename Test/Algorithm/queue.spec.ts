import { Queue } from '../../Src/Model/Game/Algorithm/queue';
import { Field } from '../../Src/Model/Game/Utils/field';

describe("Queue", () => {
    let queue: Queue;

    beforeEach(() => {
        queue = new Queue();
    });

    it("enqueue method adds elements to the queue", () => {
        const field1 = new Field(1, 1);
        const field2 = new Field(2, 2);

        queue.enqueue(field1);
        expect(queue.size).toBe(1);

        queue.enqueue(field2);
        expect(queue.size).toBe(2);

        expect(queue.dequeue()).toBe(field1);
        expect(queue.size).toBe(1);
    });
});
