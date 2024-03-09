import { Stack } from '../../Src/Model/Game/Algorithm/stack';
import { Field } from '../../Src/Model/Game/Utils/field';

describe('Stack', () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('should initialize with size 0', () => {
        expect(stack.size).toBe(0);
    });

    it('should push and pop items correctly', () => {
        const field1 = new Field(1, 1);
        const field2 = new Field(2, 2);

        stack.push(field1);
        expect(stack.size).toBe(1);
        stack.push(field2);
        expect(stack.size).toBe(2);

        expect(stack.pop()).toEqual(field2);
        expect(stack.size).toBe(1);
        expect(stack.pop()).toEqual(field1);
        expect(stack.size).toBe(0);
    });

    it('should throw error when popping from an empty stack', () => {
        expect(() => {
            stack.pop();
        }).toThrow('Stack is empty');
    });
});
